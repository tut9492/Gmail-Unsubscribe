# 📧 Gmail Unsubscribe Tool - Windows 95 Edition

A retro-styled Gmail unsubscribe tool that helps you find and unsubscribe from spam emails with a nostalgic Windows 95/98 error dialog interface.

![Windows 95 Style UI](https://img.shields.io/badge/Style-Windows%2095-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## ✨ Features

- 🔐 **OAuth 2.0 Authentication** - Secure Gmail API access
- 📨 **Smart Email Scanning** - Finds emails with unsubscribe links via List-Unsubscribe header
- 🎨 **Retro Windows 95/98 UI** - Nostalgic error dialog design with:
  - Blue gradient title bars
  - Gray beveled window frames
  - 3D buttons
  - Red error icons
  - VT323 pixel font
- 🗑️ **One-Click Unsubscribe** - Opens unsubscribe links or email clients
- ⚡ **Real-time Updates** - Mark emails as read automatically

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- A Google Cloud Project with Gmail API enabled
- Google OAuth 2.0 credentials

### Step 1: Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:3001/auth/callback`
   - Add authorized JavaScript origin: `http://localhost:5173`
   - Save your Client ID and Client Secret

### Step 2: Configure Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your Google credentials:
   ```env
   CLIENT_ID=your_google_client_id_here
   CLIENT_SECRET=your_google_client_secret_here
   REDIRECT_URI=http://localhost:3001/auth/callback
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

4. Install dependencies (if not already done):
   ```bash
   npm install
   ```

### Step 3: Configure Frontend

The frontend is already configured to connect to the backend at `http://localhost:3001`. No additional configuration needed!

### Step 4: Run the Application

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Use the Application

1. Open your browser and go to `http://localhost:5173`
2. Click "CONNECT GMAIL" to authenticate
3. Authorize the application to access your Gmail
4. Watch as spam subscriptions appear as Windows 95-style error dialogs!
5. Click "DELETE" to open the unsubscribe link
6. Click "IGNORE" to dismiss without unsubscribing

## 🎮 How It Works

### Backend (Node.js + Express)

- **OAuth 2.0 Flow**: Handles Google authentication securely
- **Gmail API Integration**: Fetches emails from promotional/updates categories
- **Header Parsing**: Extracts List-Unsubscribe headers containing unsubscribe URLs
- **Email Management**: Marks emails as read after unsubscribe action

### Frontend (React + Vite)

- **Retro UI Components**: Windows 95/98 styled components with CSS
- **Error Dialog Pattern**: Each spam subscription displayed as an error message
- **Real-time State Management**: React hooks for authentication and email management
- **Responsive Design**: Works on desktop and mobile (with retro styling!)

## 📁 Project Structure

```
Gmail-Unsubscribe/
├── backend/
│   ├── server.js              # Express server with Gmail API
│   ├── package.json           # Backend dependencies
│   ├── .env.example          # Environment template
│   └── .gitignore            # Git ignore for secrets
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css           # App-specific styles
│   │   └── index.css         # Windows 95 global styles
│   ├── package.json          # Frontend dependencies
│   └── index.html            # HTML entry point
└── README.md                 # This file
```

## 🔒 Security & Privacy

- **OAuth 2.0**: Industry-standard authentication
- **Local Token Storage**: Tokens stored only on your machine
- **Read-Only Access**: Only reads emails, never sends or deletes
- **No Data Collection**: Your email data stays on your machine
- **Open Source**: Full transparency - review the code yourself

## 🛠️ API Endpoints

### Authentication
- `GET /auth/url` - Get OAuth authorization URL
- `GET /auth/callback` - OAuth callback handler
- `GET /auth/status` - Check authentication status
- `POST /auth/logout` - Logout and clear tokens

### Email Management
- `GET /emails/unsubscribe` - Fetch emails with unsubscribe links
- `POST /emails/:id/mark-read` - Mark email as read

## 🎨 Customization

### Change the UI Style

Edit `frontend/src/index.css` to customize:
- Window colors (change `#c0c0c0` for different gray tones)
- Title bar gradient (modify `linear-gradient` in `.win95-title-bar`)
- Font (replace `VT323` with other retro fonts like `Press Start 2P`)
- Button styles (adjust bevels and shadows)

### Add More Email Filters

Edit `backend/server.js` line 104 to change the search query:
```javascript
q: 'category:promotions OR category:updates'
// Change to: q: 'from:specific-sender'
// Or: q: 'subject:newsletter'
```

## 🐛 Troubleshooting

**Issue: "Not authenticated" error**
- Make sure you've set up Google OAuth credentials correctly
- Check that redirect URI matches exactly: `http://localhost:3001/auth/callback`
- Verify your .env file has the correct CLIENT_ID and CLIENT_SECRET

**Issue: No emails found**
- The tool only finds emails with List-Unsubscribe headers
- Try checking "Promotions" or "Updates" folders in Gmail
- Some senders don't include unsubscribe headers

**Issue: CORS errors**
- Make sure backend is running on port 3001
- Make sure frontend is running on port 5173
- Check FRONTEND_URL in .env matches your frontend port

**Issue: Font not loading**
- Check your internet connection (VT323 loads from Google Fonts)
- Or download the font locally and update the CSS

## 📝 License

MIT License - feel free to use this project however you'd like!

## 🙏 Acknowledgments

- Inspired by the nostalgic Windows 95/98 era
- Built with React, Express, and the Gmail API
- VT323 font by Peter Hull

## 🚧 Future Enhancements

- [ ] Bulk unsubscribe with one click
- [ ] Statistics dashboard (total unsubscribes, spam saved, etc.)
- [ ] Export unsubscribe list
- [ ] Filter by sender domain
- [ ] Dark mode (retro green terminal theme?)
- [ ] Sound effects (Windows 95 error sounds!)

---

**Made with ❤️ and nostalgia for the Windows 95 era**
