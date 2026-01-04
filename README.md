# 🎮 UNSUB ME - I'M THE DOM NOW

**Build a custom Gmail unsubscribe tool in under an hour with AI coding assistants.**

So let's keep this short and sweet and get to the point.

I woke up today, spam emails destroying my inbox (who uses email anymore?), I said I hate this sh*t, and now with tools like Cursor or Claude I can build a bespoke solution to my problems in an hour.

**And now you're going to do it too.**

---

## What You'll Build

A retro Windows 95-style app that:
- 🔍 Scans your Gmail for spam subscriptions
- 📊 Shows you the top spammers
- 🗑️ One-click unsubscribe from all of them
- 🎨 Looks sick with that nostalgic aesthetic

![Windows 95 Style UI](https://img.shields.io/badge/Style-Windows%2095-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

---

## The 5-Step Process

### Step 1: Get Claude or Cursor

Pick your AI coding assistant:
- **Claude Code**: [https://claude.ai/](https://claude.ai/)
- **Cursor**: [https://cursor.com/](https://cursor.com/)

### Step 2: Set Up GitHub

Create a GitHub account if you don't have one:
- [https://github.com/](https://github.com/)

Clone this repo:
```bash
git clone https://github.com/tut9492/Gmail-Unsubscribe.git
cd Gmail-Unsubscribe
```

### Step 3: Get Your Google API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Gmail API**
4. Create **OAuth 2.0 credentials** (Web application)
5. Add these authorized URLs:
   - **JavaScript origins**: `http://localhost:5173`
   - **Redirect URIs**: `http://localhost:3001/auth/callback`
6. Copy your **Client ID** and **Client Secret**

### Step 4: Configure and Run

**Set up backend:**
```bash
cd backend
cp .env.example .env
# Edit .env and paste your Google credentials
npm install
npm start
```

**Set up frontend (new terminal):**
```bash
cd frontend
npm install
npm run dev
```

**Add yourself as a test user:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **OAuth consent screen**
3. Scroll to **Test users** and add your Gmail address

**Open the app:**
- Go to `http://localhost:5173`
- Click "CONNECT GMAIL"
- Start unsubscribing from spam! 🎉

### Step 5: Make It Yours - Add New Features

Now here's where the fun begins. Use Claude or Cursor to add your own features:

**Easy customizations:**
- Change the title (currently "UNSUB ME")
- Add your X/Twitter link to the footer
- Change the color scheme
- Add your own loading image

**Harder features to try:**
- Add bulk unsubscribe (one click to unsubscribe from all)
- Add email categorization (newsletters vs promotions)
- Add a "safe list" for emails you want to keep
- Export spam senders to CSV
- Add Windows 95 sound effects

**Example prompts to try:**
```
"Add my Twitter handle @yourname to the footer with a link"
"Change the title from UNSUB ME to [YOUR TITLE]"
"Add a button that unsubscribes from all emails at once"
"Add a chart showing spam by category"
```

---

## 🎨 Features

- **Windows 95/98 Retro UI** - Nostalgic error dialog design
- **OAuth 2.0 Authentication** - Secure Gmail API access
- **Smart Email Scanning** - Finds emails with unsubscribe links
- **Top Spammers Dashboard** - See who's spamming you the most
- **One-Click Unsubscribe** - Opens unsubscribe links automatically
- **No Data Collection** - Everything runs locally on your machine

---

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- Gmail API
- OAuth 2.0

**Frontend:**
- React + Vite
- Retro Windows 95 CSS
- VT323 pixel font

---

## 📁 Project Structure

```
Gmail-Unsubscribe/
├── backend/
│   ├── server.js          # Express server with Gmail API
│   ├── .env.example       # Template for your credentials
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Component styles
│   │   └── index.css     # Windows 95 global styles
│   └── package.json      # Frontend dependencies
└── README.md             # You are here
```

---

## 🔒 Privacy & Security

- **OAuth 2.0** - Industry standard authentication
- **Local only** - Tokens stored on your machine
- **Read-only access** - Only reads emails, never sends
- **No tracking** - Zero data collection
- **Open source** - Review all the code yourself

---

## 🐛 Troubleshooting

**"Not authenticated" error:**
- Make sure you added your email as a test user in Google Cloud Console
- Check that redirect URIs match exactly

**"No emails found":**
- The tool only finds emails with List-Unsubscribe headers
- Try checking Promotions or Updates folders

**Port already in use:**
```bash
# Kill processes on ports 3001 and 5173
killall -9 node
# Then restart the servers
```

---

## 🚀 What's Next?

This is YOUR project now. Fork it, break it, make it better.

Some ideas:
- Add dark mode
- Build a Chrome extension
- Add email analytics
- Connect to other email providers
- Build a mobile app version

**Share what you build!** Tag me with your improvements.

---

## 📝 License

MIT License - do whatever you want with this!

---

## 🙏 Credits

Built with:
- AI coding tools (Claude/Cursor)
- Caffeine and spite for spam emails
- The spirit of Windows 95

**Made with ❤️ and frustration with spam**

---

## 🎯 The Point

You just built a custom app in under an hour to solve a real problem. No CS degree needed. No months of tutorials.

**This is the future of coding.**

Now go build something else that pisses you off. 🚀
