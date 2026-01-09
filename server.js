// Spark AI Scheduler - Backend API Proxy
// 用于安全地代理 Claude API 请求

const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 初始化 Claude API 客户端
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Spark API server is running' });
});

// Claude AI 时间分析端点
app.post('/api/analyze-task', async (req, res) => {
  try {
    const { task, duration, priority, roles, timezone } = req.body;

    if (!task || !duration || !roles) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const roleNames = roles.map(r => r.name).join(', ');
    const now = new Date();

    const prompt = `You are a smart scheduling assistant for "Spark", an app that helps people schedule tasks based on their different life roles.

Task Details:
- Task: ${task}
- Duration: ${duration} hours
- Priority: ${priority}
- Roles: ${roleNames}
- Current time: ${now.toISOString()}
- Timezone: ${timezone || Intl.DateTimeFormat().resolvedOptions().timeZone}

Please analyze this task and suggest 3 optimal time slots for completing it. Consider:
1. The nature of the task and which roles it relates to
2. Typical productivity patterns (morning energy, afternoon slumps, etc.)
3. The priority level
4. The duration needed

For each time slot, provide:
- Exact date and time (in ISO format)
- A brief reason why this time is good (max 15 words)
- A match score (0-100) based on how well it fits the task and roles

Return your response as a JSON array with this structure:
[
  {
    "time": "2024-01-10T09:00:00Z",
    "reason": "Morning energy peak, ideal for focused work",
    "score": 95,
    "roleMatch": true
  },
  ...
]

Important: Provide only the JSON array, no additional text.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // 解析 Claude 的响应
    let suggestions;
    try {
      const responseText = message.content[0].text;
      suggestions = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', parseError);
      // 如果解析失败，返回默认建议
      suggestions = generateDefaultSuggestions(now, duration);
    }

    res.json({ suggestions });

  } catch (error) {
    console.error('Error calling Claude API:', error);
    res.status(500).json({
      error: 'Failed to analyze task',
      fallback: true,
      suggestions: generateDefaultSuggestions(new Date(), req.body.duration)
    });
  }
});

// 生成默认建议（当 AI 不可用时）
function generateDefaultSuggestions(now, duration) {
  const suggestions = [];

  // 明天上午 9 点
  const tomorrow9am = new Date(now);
  tomorrow9am.setDate(tomorrow9am.getDate() + 1);
  tomorrow9am.setHours(9, 0, 0, 0);

  suggestions.push({
    time: tomorrow9am.toISOString(),
    reason: 'Morning energy peak, ideal for focused work',
    score: 95,
    roleMatch: true
  });

  // 今天下午 2 点（如果还没到）
  const today2pm = new Date(now);
  today2pm.setHours(14, 0, 0, 0);
  if (today2pm > now) {
    suggestions.push({
      time: today2pm.toISOString(),
      reason: 'Available today, good productivity window',
      score: 85,
      roleMatch: true
    });
  }

  // 后天上午 10 点
  const dayAfter10am = new Date(now);
  dayAfter10am.setDate(dayAfter10am.getDate() + 2);
  dayAfter10am.setHours(10, 0, 0, 0);

  suggestions.push({
    time: dayAfter10am.toISOString(),
    reason: 'Extra time to prepare, flexible schedule',
    score: 80,
    roleMatch: false
  });

  return suggestions.slice(0, 3);
}

// 月末分析报告端点
app.post('/api/monthly-report', async (req, res) => {
  try {
    const { tasks, month, year } = req.body;

    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ error: 'No tasks provided' });
    }

    // 分析任务数据
    const roleStats = {};
    const keywords = {};

    tasks.forEach(task => {
      const roles = task.roles || [task.role];
      roles.forEach(role => {
        if (!roleStats[role.name]) {
          roleStats[role.name] = {
            count: 0,
            totalDuration: 0,
            emoji: role.emoji
          };
        }
        roleStats[role.name].count++;
        roleStats[role.name].totalDuration += parseFloat(task.duration || 0);
      });

      // 提取关键词（简单分词）
      const words = task.task.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (word.length > 3) {
          keywords[word] = (keywords[word] || 0) + 1;
        }
      });
    });

    // 获取前10个关键词
    const topKeywords = Object.entries(keywords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    const prompt = `Analyze this monthly task data and provide insights:

Role Statistics:
${JSON.stringify(roleStats, null, 2)}

Top Keywords:
${JSON.stringify(topKeywords, null, 2)}

Total Tasks: ${tasks.length}
Month: ${month}/${year}

Please provide:
1. A brief summary of how the user balanced their different roles (2-3 sentences)
2. Insights about what they focused on most
3. One actionable recommendation for the next month

Format as JSON:
{
  "summary": "...",
  "insights": ["...", "..."],
  "recommendation": "..."
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    const report = JSON.parse(message.content[0].text);

    res.json({
      roleStats,
      topKeywords,
      ...report,
      totalTasks: tasks.length,
      totalHours: tasks.reduce((sum, t) => sum + parseFloat(t.duration || 0), 0)
    });

  } catch (error) {
    console.error('Error generating monthly report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Spark API server running on port ${PORT}`);
  console.log(`💡 Make sure to set CLAUDE_API_KEY in your .env file`);
});
