import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

const GREETINGS = {
  fr: 'Bonjour ! Je suis Kimy, l\'assistante virtuelle de Kim. Posez-moi vos questions !',
  en: 'Hi! I\'m Kimy, Kim\'s virtual assistant. Ask me anything!',
}

export default function Chatbot() {
  const { lang } = useLanguage()
  const { pathname } = useLocation()

  if (pathname === '/resume') return null
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Show greeting when first opened, or reset when language changes
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: GREETINGS[lang] || GREETINGS.fr }])
    }
  }, [isOpen])

  // Reset conversation when site language changes
  useEffect(() => {
    setMessages([])
    setIsOpen(false)
  }, [lang])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated.filter(m => m.role !== 'assistant' || updated.indexOf(m) > 0).map(({ role, content }) => ({ role, content })), lang }),
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: lang === 'fr' ? 'Désolée, je rencontre un problème. Réessayez plus tard !' : 'Sorry, I\'m having trouble. Try again later!' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Bokeh backdrop when chat is open */}
      {isOpen && <div className="chatbot-backdrop" onClick={handleClose} />}

      {/* Chat window — positioned beside the avatar */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <img src="/Kimy Avatar.png" alt="Kimy" className="chatbot-header-avatar" />
            <span className="chatbot-header-name">Kimy</span>
            <button className="chatbot-close" onClick={handleClose} aria-label="Close chat">
              &times;
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg-${msg.role}`}>
                {msg.role === 'assistant' && (
                  <img src="/Kimy Avatar.png" alt="Kimy" className="chatbot-msg-avatar" />
                )}
                <div className={`chatbot-msg-bubble chatbot-msg-bubble-${msg.role}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-msg chatbot-msg-assistant">
                <img src="/Kimy Avatar.png" alt="Kimy" className="chatbot-msg-avatar" />
                <div className="chatbot-msg-bubble chatbot-msg-bubble-assistant chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'fr' ? 'Écrivez votre message...' : 'Type your message...'}
              className="chatbot-input"
              disabled={isLoading}
            />
            <button className="chatbot-send" onClick={handleSend} disabled={isLoading || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating avatar + speech bubble (always visible when chat is closed) */}
      <div className="chatbot-fab-container">
        {!isOpen && (
          <div className="chatbot-speech-bubble" onClick={handleOpen}>
            {lang === 'fr' ? 'Besoin d\'aide ? Discutons !' : 'Need help? Let\'s chat!'}
          </div>
        )}
        <button className="chatbot-fab" onClick={isOpen ? handleClose : handleOpen} aria-label="Chat with Kimy">
          <img src="/Kimy Avatar.png" alt="Kimy" className="chatbot-fab-img" />
        </button>
      </div>
    </>
  )
}
