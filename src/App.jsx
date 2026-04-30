import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  Server, 
  AlertTriangle,
  Zap,
  MessageSquare,
  X,
  Send,
  Home,
  Map,
  Bell,
  Settings,
  Bot
} from 'lucide-react';

const App = () => {
  const [threatsResolved, setThreatsResolved] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', content: 'Hello Admin! I am your AI Automated Security Assistant. I can monitor unauthorized access, detect anomalies, and fix ANY issue with our Magic Fix system. How can I help you today?' }
  ]);
  const chatEndRef = useRef(null);

  const initialAlerts = [
    { id: 1, type: 'high', title: 'Unauthorized DB Access Attempt', desc: 'Multiple failed logins from IP 192.168.1.105', time: 'Just now' },
    { id: 2, type: 'medium', title: 'Unusual Data Transfer', desc: 'Large payload sent to unknown external server', time: '5m ago' },
    { id: 3, type: 'low', title: 'Firewall Rule Modified', desc: 'Port 22 opened by user admin_02', time: '12m ago' }
  ];

  const [alerts, setAlerts] = useState(initialAlerts);
  
  const initialNodes = [
    { id: 1, x: 20, y: 30, breached: false },
    { id: 2, x: 50, y: 50, breached: true },
    { id: 3, x: 80, y: 20, breached: false },
    { id: 4, x: 30, y: 70, breached: false },
    { id: 5, x: 70, y: 80, breached: true },
  ];
  
  const [nodes, setNodes] = useState(initialNodes);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isAiModalOpen]);

  const handleMagicFix = () => {
    setThreatsResolved(true);
    setAlerts([]);
    setNodes(nodes.map(n => ({ ...n, breached: false })));
    
    // Add success message to AI chat
    setChatHistory(prev => [
      ...prev,
      { role: 'bot', content: '✨ Magic Fix Applied! All unauthorized access points have been blocked, breached nodes have been secured, and the firewall has been reinforced.' }
    ]);
  };

  const sendChatMessage = (e) => {
    e?.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatMessage('');
    
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);

    // AI Response logic
    setTimeout(() => {
      let botResponse = "I've analyzed the request.";
      const lowerMsg = userMsg.toLowerCase();
      
      if (lowerMsg.includes('fix') || lowerMsg.includes('resolve') || lowerMsg.includes('hack')) {
        handleMagicFix();
        botResponse = "I have initiated the automated fixing protocols. All systems are now secure and vulnerabilities have been patched.";
      } else if (lowerMsg.includes('status') || lowerMsg.includes('report')) {
        botResponse = `Current System Status: ${threatsResolved ? '100% SECURE. All nodes operational.' : 'WARNING. Breaches detected in Sector 2 and 5.'}`;
      } else {
        botResponse = "I am processing that information. As an AI-Automated system, I continuously monitor all incoming and outgoing data for unauthorized access. Would you like me to run a full diagnostic or execute a Magic Fix?";
      }
      
      setChatHistory(prev => [...prev, { role: 'bot', content: botResponse }]);
    }, 1000);
  };

  return (
    <div className="app-container">
      {/* Desktop Navigation */}
      <nav className="desktop-nav glass-panel">
        <div className="logo">
          <ShieldCheck size={28} color="#0ea5e9" />
          <span>AuraSec AI</span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link" style={{ color: '#0284c7', fontWeight: '700' }}>Dashboard</a>
          <a href="#" className="nav-link">Network Map</a>
          <a href="#" className="nav-link">Threat Logs</a>
          <a href="#" className="nav-link">Settings</a>
        </div>
        <div>
          <button className="glass-button" onClick={() => setIsAiModalOpen(true)}>
            <Bot size={18} />
            Ask AI
          </button>
        </div>
      </nav>

      <main className="dashboard-grid">
        {/* Top Stats */}
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <motion.div className="glass-panel status-card" whileHover={{ y: -5 }}>
            <div className="status-header">
              <span className="status-title">System Status</span>
              {threatsResolved ? <ShieldCheck color="#10b981" /> : <ShieldAlert color="#ef4444" />}
            </div>
            <div className="status-value" style={{ color: threatsResolved ? '#10b981' : '#ef4444' }}>
              {threatsResolved ? 'Secure' : 'Breached'}
            </div>
            <div className={`status-change ${threatsResolved ? 'positive' : 'negative'}`}>
              {threatsResolved ? '0 active threats' : '2 active threats'}
            </div>
          </motion.div>

          <motion.div className="glass-panel status-card" whileHover={{ y: -5 }}>
            <div className="status-header">
              <span className="status-title">Active Connections</span>
              <Activity color="#0ea5e9" />
            </div>
            <div className="status-value">1,492</div>
            <div className="status-change positive">
              Normal load
            </div>
          </motion.div>

          <motion.div className="glass-panel status-card" whileHover={{ y: -5 }}>
            <div className="status-header">
              <span className="status-title">AI Automation</span>
              <Bot color="#8b5cf6" />
            </div>
            <div className="status-value">Active</div>
            <div className="status-change positive">
              Monitoring 24/7
            </div>
          </motion.div>
        </div>

        {/* Threat Map */}
        <div className="glass-panel threat-map-container">
          <h2>Live Network Topology</h2>
          <div className="map-visualization">
            {!threatsResolved && <div className="scanner-line"></div>}
            <div className="nodes-container">
              {nodes.map((node) => (
                <div 
                  key={node.id}
                  className={`node ${node.breached ? 'breached' : ''}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {node.breached && <div className="pulse-ring" style={{ top: '-24px', left: '-24px' }}></div>}
                </div>
              ))}
              
              {/* Drawing simple lines between some nodes */}
              <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
                <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="30%" y2="70%" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="2" />
                <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Recent Alerts & Magic Fix */}
        <div className="glass-panel recent-alerts-container">
          <h2>
            Active Alerts
            <span style={{ fontSize: '0.8rem', background: 'rgba(239,68,68,0.2)', color: '#ef4444', padding: '4px 8px', borderRadius: '12px' }}>
              {alerts.length} New
            </span>
          </h2>
          
          <div className="alerts-list">
            <AnimatePresence>
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <motion.div 
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="alert-item"
                  >
                    <div className={`alert-icon ${alert.type}`}>
                      <AlertTriangle size={20} />
                    </div>
                    <div className="alert-content">
                      <h4>{alert.title}</h4>
                      <p>{alert.desc}</p>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}
                >
                  <ShieldCheck size={48} color="#10b981" style={{ marginBottom: '16px' }} />
                  <p>All threats resolved.</p>
                  <p style={{ fontSize: '0.875rem' }}>Network is secure.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <button 
              className="magic-fix-button"
              onClick={handleMagicFix}
              disabled={threatsResolved}
              style={{ opacity: threatsResolved ? 0.5 : 1, cursor: threatsResolved ? 'not-allowed' : 'pointer' }}
            >
              <Zap size={24} fill={threatsResolved ? "none" : "white"} />
              {threatsResolved ? 'System Secured' : 'AI Magic Fix All'}
            </button>
          </div>
        </div>
      </main>

      {/* Floating AI Bubble */}
      <motion.div 
        className="ai-chat-bubble"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAiModalOpen(true)}
      >
        <Bot size={28} />
      </motion.div>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {isAiModalOpen && (
          <motion.div 
            className="ai-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target.classList.contains('ai-modal-overlay')) setIsAiModalOpen(false);
            }}
          >
            <motion.div 
              className="glass-panel ai-modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="ai-modal-header">
                <h3><Bot size={24} color="#0ea5e9" /> AuraSec AI Assistant</h3>
                <button className="close-button" onClick={() => setIsAiModalOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="ai-chat-messages">
                {chatHistory.map((msg, idx) => (
                  <motion.div 
                    key={idx} 
                    className={`message ${msg.role}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {msg.content}
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              <form className="ai-chat-input-area" onSubmit={sendChatMessage}>
                <input 
                  type="text" 
                  className="ai-chat-input"
                  placeholder="Ask the AI to analyze, report, or fix issues..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <button type="submit" className="ai-send-button">
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        <a href="#" className="nav-item active">
          <Home size={24} />
          Home
        </a>
        <a href="#" className="nav-item">
          <Map size={24} />
          Map
        </a>
        <a href="#" className="nav-item">
          <Bell size={24} />
          Alerts
        </a>
        <a href="#" className="nav-item">
          <Settings size={24} />
          Settings
        </a>
      </nav>
    </div>
  );
};

export default App;
