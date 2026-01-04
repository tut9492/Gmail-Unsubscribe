# Quick Setup Guide

## 1. Get Google OAuth Credentials

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Gmail API
4. Create OAuth 2.0 credentials (Web application)
5. Add redirect URI: `http://localhost:3001/auth/callback`
6. Add JavaScript origin: `http://localhost:5173`
7. Copy your Client ID and Client Secret

## 2. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and paste your credentials:
```
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here
REDIRECT_URI=http://localhost:3001/auth/callback
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## 3. Install Dependencies

From the project root:
```bash
npm run install:all
```

Or manually:
```bash
cd backend && npm install
cd ../frontend && npm install
```

## 4. Run the Application

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## 5. Open Browser

Navigate to: `http://localhost:5173`

Click "CONNECT GMAIL" and authorize the app!

## That's it! 🎉

You should now see your spam subscriptions displayed as retro Windows 95 error dialogs.
