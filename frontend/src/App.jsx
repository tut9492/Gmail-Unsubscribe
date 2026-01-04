import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import domImage from './assets/dom.png'

const API_URL = 'http://localhost:3001'

function ErrorDialog({ email, onDelete, onDismiss }) {
  const handleUnsubscribe = () => {
    if (email.unsubscribeUrl) {
      window.open(email.unsubscribeUrl, '_blank')
    } else if (email.unsubscribeEmail) {
      window.location.href = `mailto:${email.unsubscribeEmail}?subject=Unsubscribe`
    }
    onDelete(email.id)
  }

  return (
    <div className="win95-window email-card">
      <div className="win95-title-bar">
        <div className="win95-title-text">
          <span>⚠️</span>
          <span>SPAM SUBSCRIPTION ERROR</span>
        </div>
        <div className="win95-close-btn" onClick={() => onDismiss(email.id)}>
          ✕
        </div>
      </div>
      <div className="win95-content">
        <div className="email-error-dialog">
          <div className="error-icon"></div>
          <div className="email-details">
            <div className="email-from">FROM: {email.from}</div>
            <div className="email-subject">SUBJECT: {email.subject}</div>
            <div className="email-date">DATE: {new Date(email.date).toLocaleDateString()}</div>
            <div className="button-group">
              <button className="win95-button" onClick={handleUnsubscribe}>
                DELETE
              </button>
              <button className="win95-button" onClick={() => onDismiss(email.id)}>
                IGNORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [emails, setEmails] = useState([])
  const [loadingEmails, setLoadingEmails] = useState(false)

  useEffect(() => {
    checkAuthStatus()

    // Check for auth callback
    const params = new URLSearchParams(window.location.search)
    if (params.get('auth') === 'success') {
      window.history.replaceState({}, '', '/')
      checkAuthStatus()
    }
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/status`)
      setAuthenticated(response.data.authenticated)
      if (response.data.authenticated) {
        fetchEmails()
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/url`)
      window.location.href = response.data.url
    } catch (error) {
      console.error('Error getting auth URL:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`)
      setAuthenticated(false)
      setEmails([])
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const fetchEmails = async () => {
    setLoadingEmails(true)
    try {
      const response = await axios.get(`${API_URL}/emails/unsubscribe`)
      setEmails(response.data.emails)
    } catch (error) {
      console.error('Error fetching emails:', error)
    } finally {
      setLoadingEmails(false)
    }
  }

  const handleDeleteEmail = async (emailId) => {
    try {
      await axios.post(`${API_URL}/emails/${emailId}/mark-read`)
      setEmails(emails.filter(email => email.id !== emailId))
    } catch (error) {
      console.error('Error marking email as read:', error)
    }
  }

  const handleDismissEmail = (emailId) => {
    setEmails(emails.filter(email => email.id !== emailId))
  }

  // Calculate top spammers
  const getTopSpammers = () => {
    const senderCounts = {}
    emails.forEach(email => {
      // Extract email domain or sender name
      const fromMatch = email.from.match(/<(.+?)>/) || email.from.match(/([^\s<>]+@[^\s<>]+)/)
      const sender = fromMatch ? fromMatch[1] : email.from
      senderCounts[sender] = (senderCounts[sender] || 0) + 1
    })

    return Object.entries(senderCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([sender, count]) => ({ sender, count }))
  }

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="win95-window">
            <div className="win95-title-bar">
              <div className="win95-title-text">Loading...</div>
            </div>
            <div className="win95-content">
              <div className="loading-content">
                <div className="loading-spinner"></div>
                <p>INITIALIZING SYSTEM...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="app-container">
        <div className="header">
          <h1>UNSUB ME</h1>
          <p>I'M THE DOM NOW</p>
        </div>
        <div className="login-container">
          <div className="win95-window">
            <div className="win95-title-bar">
              <div className="win95-title-text">
                <span>🔐</span>
                <span>AUTHENTICATION REQUIRED</span>
              </div>
            </div>
            <div className="win95-content">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p style={{ marginBottom: '20px', fontSize: '20px' }}>
                  CONNECT TO GMAIL API TO SCAN FOR SPAM SUBSCRIPTIONS
                </p>
                <button className="win95-button" onClick={handleLogin}>
                  CONNECT GMAIL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loadingEmails) {
    return (
      <div className="app-container">
        <div className="header">
          <h1>UNSUB ME</h1>
          <p>I'M THE DOM NOW</p>
        </div>
        <div className="loading-container">
          <div className="win95-window">
            <div className="win95-title-bar">
              <div className="win95-title-text">Scanning...</div>
            </div>
            <div className="win95-content">
              <div className="loading-content">
                <img src={domImage} alt="Loading" className="halftone-image" />
                <div className="loading-spinner"></div>
                <p>SCANNING INBOX FOR SPAM SUBSCRIPTIONS...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>UNSUB ME</h1>
        <p>I'M THE DOM NOW</p>
      </div>

      <div className="stats-container">
        <div className="win95-window stats-window">
          <div className="win95-title-bar">
            <div className="win95-title-text">
              <span>📊</span>
              <span>SYSTEM STATUS</span>
            </div>
          </div>
          <div className="win95-content">
            <div className="stats-content">
              <div className="stat-item">
                <span className="stat-label">SPAM DETECTED:</span>
                <span className="stat-value">{emails.length}</span>
              </div>
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="win95-button" onClick={fetchEmails}>
                  REFRESH
                </button>
                <button className="win95-button" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {emails.length > 0 && (
        <div className="stats-container">
          <div className="win95-window stats-window" style={{ maxWidth: '600px' }}>
            <div className="win95-title-bar">
              <div className="win95-title-text">
                <span>🔥</span>
                <span>TOP SPAMMERS</span>
              </div>
            </div>
            <div className="win95-content">
              <div className="stats-content">
                {getTopSpammers().map((spammer, index) => (
                  <div key={spammer.sender} className="stat-item spammer-item">
                    <span className="spammer-rank">#{index + 1}</span>
                    <span className="spammer-email">{spammer.sender}</span>
                    <span className="spammer-count">{spammer.count} emails</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {emails.length === 0 ? (
        <div className="no-emails">
          <div className="win95-window">
            <div className="win95-title-bar">
              <div className="win95-title-text">
                <span>✓</span>
                <span>SYSTEM MESSAGE</span>
              </div>
            </div>
            <div className="win95-content">
              <div style={{ textAlign: 'center', padding: '20px', fontSize: '20px' }}>
                NO SPAM SUBSCRIPTIONS DETECTED
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="email-list scrollable-content">
          {emails.map(email => (
            <ErrorDialog
              key={email.id}
              email={email}
              onDelete={handleDeleteEmail}
              onDismiss={handleDismissEmail}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
