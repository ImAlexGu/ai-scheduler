# ⚡ Spark - From Thought to Action in 10 Seconds

Built an AI Task Scheduler that helps you manage tasks across different life roles - therapist, parent, creator, professional, and personal life.

**Type your task → AI finds the best time → One-click add to Google Calendar**

🌐 **Try it:** https://imalexgu.github.io/ai-scheduler/
📱 **Works on mobile too!**

---

## ✨ Features

### V3.0 - Latest Updates (2026)

✅ **Multi-Role Support** - Tag tasks with multiple roles (Mom + Therapist + Creator)
✅ **Short Time Blocks** - Added 5-minute and 10-minute options
✅ **Real Google Calendar Integration** - OAuth login + direct event creation
✅ **Claude AI Analysis** - Smart time suggestions based on task context
✅ **Spark Vault** - Save ideas you're not ready to commit to yet
✅ **"Do It Now" Mode** - Instantly block time on your calendar
✅ **Cloud Sync Ready** - Firebase integration for cross-device access

### Previous Versions

**V2:**
- Role-based task organization
- Spark Vault for saving ideas
- "Do it now" priority option

**V1:**
- Basic AI time suggestions
- Calendar link generation

---

## 🚀 Quick Start

### Option 1: Demo Mode (No Setup Required)

Just open `index.html` in your browser. You'll get:
- Basic functionality
- Demo AI suggestions
- Calendar link generation (manual copy-paste)

### Option 2: Full Setup (Recommended)

Get the complete experience with real AI and Google Calendar integration.

#### Prerequisites

- Node.js 18+ installed
- Google Calendar API credentials
- Claude API key (optional but recommended)

#### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ImAlexGu/ai-scheduler.git
cd ai-scheduler
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env and add your API keys
```

4. **Configure Google Calendar**
- Follow instructions in `CONFIG.md`
- Update `GOOGLE_CLIENT_ID` in `index.html` (line 94)

5. **Start the backend server**
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

6. **Open the app**
```bash
# In another terminal
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## 📖 Documentation

- **[CONFIG.md](CONFIG.md)** - Complete setup guide for all APIs
- **[server.js](server.js)** - Backend API documentation

---

## 🔧 Configuration

### Required for Full Features

1. **Google Calendar API** - For OAuth login and direct event creation
   - Get Client ID from Google Cloud Console
   - See CONFIG.md for detailed steps

2. **Claude API** (Optional) - For AI-powered time suggestions
   - Get API key from https://console.anthropic.com/
   - Add to `.env` file

3. **Firebase** (Coming Soon) - For cloud sync
   - Will enable cross-device data sync
   - Three-day reminder notifications
   - Monthly analytics reports

---

## 🎯 How It Works

1. **Select Your Role(s)** - Choose which part of your life this task relates to
2. **Describe Your Task** - Quick natural language input
3. **Set Duration & Priority** - From 5 minutes to 3 hours
4. **Get AI Suggestions** - Claude analyzes and suggests optimal times
5. **Add to Calendar** - One click to create the event

### Special Features

**Spark Vault** 💎
- Save tasks you're considering but not ready to schedule
- Review later when you're ready
- (Coming: 3-day reminder notifications)

**Multi-Role Tagging** 🎭
- See which roles you're balancing
- (Coming: Monthly insights on role distribution)

**"Do It Now" Mode** ⚡
- Immediately blocks time on your calendar
- Perfect for urgent or time-sensitive tasks

---

## 🛠 Tech Stack

- **Frontend:** React (via CDN), Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Claude 3.5 Sonnet (Anthropic API)
- **Calendar:** Google Calendar API v3
- **Database:** localStorage (Firebase coming soon)

---

## 📊 Roadmap

### In Progress 🚧

- [ ] Firebase cloud sync
- [ ] Cross-device data synchronization
- [ ] Vault reminder notifications (every 3 days)
- [ ] Monthly analytics reports

### Planned 📝

- [ ] Zoom/Meet link integration
- [ ] Recurring task support
- [ ] Calendar conflict detection
- [ ] Custom role creation
- [ ] Dark mode
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Feedback and contributions are welcome!

- **Twitter:** [@ImAlexGu](https://twitter.com/ImAlexGu)
- **Issues:** [GitHub Issues](https://github.com/ImAlexGu/ai-scheduler/issues)

---

## 📝 License

MIT License - Feel free to use this for your own productivity!

---

## 💡 Why I Built This

As a therapist juggling client sessions, content creation, and family life, I found myself constantly context-switching between different roles. Spark helps me remember **all the "me"s** - the therapist, the creator, the parent - and ensures no part of my life gets neglected.

Every role matters. Every thought deserves action. ⚡

---

**Made with 💜 by [Xin Gu](https://twitter.com/ImAlexGu)**


