# Spark AI Scheduler - 配置指南

## 快速开始

本应用需要配置Google Calendar API和Claude API才能使用完整功能。

## 1. Google Calendar API 配置

### 步骤 1: 创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 在左侧菜单中，选择 "API和服务" > "库"
4. 搜索 "Google Calendar API" 并启用

### 步骤 2: 创建 OAuth 2.0 凭据

1. 在 "API和服务" > "凭据" 页面
2. 点击 "创建凭据" > "OAuth 客户端 ID"
3. 应用类型选择 "Web 应用"
4. 添加授权的 JavaScript 来源：
   - `http://localhost:8000` (本地测试)
   - `https://imalexgu.github.io` (生产环境)
5. 添加授权的重定向 URI：
   - `http://localhost:8000`
   - `https://imalexgu.github.io/ai-scheduler/`
6. 点击"创建"并复制 **客户端 ID**

### 步骤 3: 配置应用

在 `index.html` 文件中，找到第 94 行：

```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
```

将 `YOUR_GOOGLE_CLIENT_ID` 替换为您的实际客户端 ID。

## 2. Claude API 配置 (即将实现)

### 获取 API Key

1. 访问 [Anthropic Console](https://console.anthropic.com/)
2. 创建账号并验证
3. 在 API Keys 页面创建新的 API key
4. 复制 API key (以 `sk-ant-` 开头)

### 配置方式

由于安全考虑，Claude API key 不应直接暴露在前端代码中。推荐的方式：

#### 方案 A: 使用后端代理 (推荐)

创建一个简单的后端服务来代理 Claude API 请求：

```javascript
// 示例 Node.js Express 服务器
app.post('/api/analyze-task', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });
  res.json(await response.json());
});
```

#### 方案 B: 使用环境变量 (仅开发)

在本地开发时，可以使用环境变量：

```bash
export CLAUDE_API_KEY=sk-ant-your-api-key
```

## 3. Firebase 配置 (云端同步)

### 步骤 1: 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 创建新项目
3. 添加 Web 应用

### 步骤 2: 启用服务

在 Firebase 项目中启用以下服务：
- **Firestore Database**: 存储任务和 Vault 数据
- **Authentication**: 用户认证 (Google 登录)
- **Cloud Functions**: 定时提醒功能

### 步骤 3: 获取配置

在 Firebase 项目设置中，复制 Web 应用配置：

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

将此配置添加到 `index.html` 中。

## 4. 本地测试

### 启动本地服务器

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

然后访问 `http://localhost:8000`

## 5. 部署到 GitHub Pages

1. 确保所有配置已正确填写
2. 提交代码到 GitHub
3. 在仓库设置中启用 GitHub Pages
4. 选择 `main` 分支和 `/` (root) 目录
5. 访问 `https://[你的用户名].github.io/ai-scheduler/`

## 安全注意事项

⚠️ **重要提醒：**

1. **永远不要**将 API keys 直接提交到公开的 GitHub 仓库
2. 使用 `.env` 文件存储敏感信息（添加到 `.gitignore`）
3. 对于生产环境，务必使用后端代理来保护 API keys
4. 定期轮换 API keys
5. 为 OAuth 应用设置正确的重定向 URI 白名单

## 功能说明

### 已实现功能 ✅

- ✅ 10分钟短时长选项
- ✅ 自定义角色命名和记忆
- ✅ Google Calendar OAuth 真实登录
- ✅ 直接创建 Calendar 事件（无需手动复制）
- ✅ Google Calendar 数据读取和冲突检测
- ✅ 任务历史记录追踪
- ✅ 月度统计数据面板
- ✅ Claude API 智能关键词提取和用户画像
- ✅ API 配置设置面板

### 待实现功能 🚧

- 🚧 Firebase 云端同步
- 🚧 跨设备数据同步
- 🚧 Vault 三天提醒通知
- 🚧 后端服务器部署

## 问题排查

### Google Calendar 登录失败

- 检查 Client ID 是否正确
- 确认授权域名已添加到 Google Cloud Console
- 清除浏览器缓存和 cookies 后重试

### API 请求失败

- 检查浏览器控制台的错误信息
- 确认 API keys 格式正确
- 检查 API 配额是否用尽

## 联系方式

如有问题，请联系：
- Twitter: [@ImAlexGu](https://twitter.com/ImAlexGu)
- GitHub Issues: [提交问题](https://github.com/ImAlexGu/ai-scheduler/issues)
