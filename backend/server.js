import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Token storage path
const TOKEN_PATH = path.join(__dirname, 'token.json');

// Check if we have a stored token
function hasToken() {
  return fs.existsSync(TOKEN_PATH);
}

// Load saved token
function loadToken() {
  if (hasToken()) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oauth2Client.setCredentials(token);
    return token;
  }
  return null;
}

// Save token
function saveToken(token) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  oauth2Client.setCredentials(token);
}

// Generate auth URL
app.get('/auth/url', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify'
    ],
    prompt: 'consent'
  });
  res.json({ url: authUrl });
});

// OAuth callback
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    saveToken(tokens);
    res.redirect(`${process.env.FRONTEND_URL}?auth=success`);
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.redirect(`${process.env.FRONTEND_URL}?auth=error`);
  }
});

// Check auth status
app.get('/auth/status', (req, res) => {
  const authenticated = hasToken();
  if (authenticated) {
    loadToken();
  }
  res.json({ authenticated });
});

// Logout
app.post('/auth/logout', (req, res) => {
  if (hasToken()) {
    fs.unlinkSync(TOKEN_PATH);
  }
  res.json({ success: true });
});

// Get emails with unsubscribe links
app.get('/emails/unsubscribe', async (req, res) => {
  try {
    if (!hasToken()) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    loadToken();
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Search for emails (get recent promotional emails)
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 100,
      q: 'category:promotions OR category:updates'
    });

    const messages = response.data.messages || [];
    const emailsWithUnsubscribe = [];

    // Fetch full details for each message
    for (const message of messages) {
      try {
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        });

        const headers = fullMessage.data.payload.headers;
        const listUnsubscribe = headers.find(h => h.name.toLowerCase() === 'list-unsubscribe');

        if (listUnsubscribe) {
          const fromHeader = headers.find(h => h.name.toLowerCase() === 'from');
          const subjectHeader = headers.find(h => h.name.toLowerCase() === 'subject');
          const dateHeader = headers.find(h => h.name.toLowerCase() === 'date');

          // Parse unsubscribe links
          const unsubscribeValue = listUnsubscribe.value;
          const urlMatch = unsubscribeValue.match(/<(https?:\/\/[^>]+)>/);
          const emailMatch = unsubscribeValue.match(/<mailto:([^>]+)>/);

          emailsWithUnsubscribe.push({
            id: message.id,
            from: fromHeader?.value || 'Unknown',
            subject: subjectHeader?.value || 'No Subject',
            date: dateHeader?.value || '',
            unsubscribeUrl: urlMatch ? urlMatch[1] : null,
            unsubscribeEmail: emailMatch ? emailMatch[1] : null,
            rawUnsubscribe: unsubscribeValue
          });
        }
      } catch (err) {
        console.error(`Error fetching message ${message.id}:`, err.message);
      }
    }

    res.json({ emails: emailsWithUnsubscribe });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark email as read or delete
app.post('/emails/:id/mark-read', async (req, res) => {
  try {
    if (!hasToken()) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    loadToken();
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const { id } = req.params;

    await gmail.users.messages.modify({
      userId: 'me',
      id: id,
      requestBody: {
        removeLabelIds: ['UNREAD']
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking email as read:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Gmail Unsubscribe API ready`);
});
