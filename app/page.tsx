'use client';

/**
 * Demo V2 Dashboard - Full Featured
 * 
 * Interactive demo with:
 * - Chat with AI responses
 * - Canvas visualizations that appear based on queries
 * - Your Day panel
 * - All fake data, fully working
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MambaLogo } from '@/components/ui/mamba-logo';
import { matchDemoResponse, proactiveInsights } from './demo/lib/demo-ai';
import { DemoCanvas, type CanvasType } from './demo/components/demo-canvas';
import { DemoToast, type Toast } from './demo/components/demo-toast';
import { DemoTour } from './demo/components/demo-tour';
import DemoV2Layout, { useDemoContext } from './components/demo-layout';
import { 
  Plus, Slash, Mic, AtSign, ArrowUp, Users, Mail, ChevronRight, X, 
  Plug, Sparkles, Calendar, AlertTriangle, Clock, Zap, TrendingUp
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  canvasType?: CanvasType;
  toolCalls?: string[];
  suggestedFollowups?: string[];
}

// ============================================================================
// YOUR DAY PANEL
// ============================================================================

function YourDayPanel({ userName, onClose, onAskExample }: { 
  userName: string; 
  onClose: () => void;
  onAskExample: (query: string) => void;
}) {
  const firstName = userName.split(' ')[0];

  const tasks = [
    { id: 1, label: 'Review 3 PTO requests', action: 'Show pending PTO requests', icon: Calendar, urgent: true },
    { id: 2, label: '2 employees at flight risk', action: 'Who is at flight risk?', icon: AlertTriangle, urgent: true },
    { id: 3, label: 'Complete Q4 review prep', action: 'Show me key metrics', icon: Clock, urgent: false },
  ];

  return (
    <div className="w-80 h-full overflow-y-auto p-4" style={{ background: 'var(--bg-card)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Your Day</span>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Good morning, {firstName}
        </h3>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          You have 3 items that need attention today.
        </p>
      </div>

      {/* Tasks */}
      <div className="mb-4">
        <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Today's Tasks</div>
        {tasks.map((task, i) => (
          <motion.button
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onAskExample(task.action)}
            className="w-full flex items-center gap-3 p-3 rounded-xl mb-2 hover:bg-[var(--bg-muted)] transition-colors text-left"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}
              style={{ background: task.urgent ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-muted)' }}>
              <task.icon className="w-4 h-4" style={{ color: task.urgent ? '#EF4444' : 'var(--text-tertiary)' }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{task.label}</div>
            </div>
            {task.urgent && (
              <div className="w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />
            )}
          </motion.button>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-4">
        <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Quick Actions</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAskExample('Show me org health')}
            className="p-3 rounded-xl text-left hover:bg-[var(--bg-muted)] transition-colors"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Org Health</div>
            <div className="text-lg font-bold" style={{ color: '#10B981' }}>87</div>
          </button>
          <button
            onClick={() => onAskExample('Show me key metrics')}
            className="p-3 rounded-xl text-left hover:bg-[var(--bg-muted)] transition-colors"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Employees</div>
            <div className="text-lg font-bold" style={{ color: 'var(--accent-primary)' }}>52</div>
          </button>
        </div>
      </div>

      {/* AI Prompt */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <MambaLogo size={18} variant="forDark" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
              Ask me anything
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              I can help with PTO, finding people, goals, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoV2PageContent() {
  const { registerQueryHandler } = useDemoContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentToolCall, setCurrentToolCall] = useState<string | null>(null);
  const [showYourDay, setShowYourDay] = useState(true);
  const [canvasType, setCanvasType] = useState<CanvasType>('none');

  const [userName, setUserName] = useState('YCombinator');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showTour, setShowTour] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleCloseTour = () => {
    setShowTour(false);
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // FORCE canvas update based on last user message
  useEffect(() => {
    if (messages.length === 0) return;
    
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;
    
    const query = lastUserMessage.content.toLowerCase();
    
    let newCanvas: CanvasType = 'none';
    
    if (query.includes('flight risk') || query.includes('at risk') || query.includes('retention')) {
      newCanvas = 'flight-risk';
    } else if (query.includes('emily')) {
      newCanvas = 'impact';
    } else if (query.includes('directory') || query.includes('employee list')) {
      newCanvas = 'directory';
    } else if (query.includes('org overview') || query.includes('headcount') || query.includes('organization')) {
      newCanvas = 'org-overview';
    } else if (query.includes('team health') || query.includes('engagement') || query.includes('morale')) {
      newCanvas = 'team-health';
    } else if (query.includes('metric') || query.includes('kpi')) {
      newCanvas = 'metrics';
    } else if (query.includes('org chart') || query.includes('hierarchy')) {
      newCanvas = 'org-chart';
    } else if (query.includes('pto') || query.includes('time off') || query.includes('vacation')) {
      newCanvas = 'pto-requests';
    } else if (query.includes('analytic') || query.includes('report')) {
      newCanvas = 'analytics';
    }
    
    if (newCanvas !== 'none') {
      setCanvasType(newCanvas);
      setShowYourDay(false);
    }
  }, [messages]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K to focus input
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Esc to close canvas
      if (e.key === 'Escape' && canvasType !== 'none') {
        setCanvasType('none');
        setShowYourDay(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canvasType]);

  // Toast helper
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Handle message submission with tool call simulation
  const handleSubmit = useCallback(async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowYourDay(false);

    // Get response
    const response = matchDemoResponse(messageText);
    
    // Determine canvas type - check for specific queries directly
    let targetCanvas: CanvasType = 'none';
    const lowerQuery = messageText.toLowerCase();
    
    // Direct keyword matching as fallback
    if (lowerQuery.includes('flight risk') || lowerQuery.includes('at risk') || lowerQuery.includes('retention')) {
      targetCanvas = 'flight-risk';
    } else if (lowerQuery.includes('emily')) {
      targetCanvas = 'impact';
    } else if (lowerQuery.includes('directory') || lowerQuery.includes('employee list')) {
      targetCanvas = 'directory';
    } else if (lowerQuery.includes('org overview') || lowerQuery.includes('headcount')) {
      targetCanvas = 'org-overview';
    } else if (lowerQuery.includes('team health') || lowerQuery.includes('engagement')) {
      targetCanvas = 'team-health';
    } else if (lowerQuery.includes('metric') || lowerQuery.includes('kpi')) {
      targetCanvas = 'metrics';
    } else if (response.canvas) {
      targetCanvas = response.canvas;
    }
    
    // Set canvas IMMEDIATELY before any async operations
    setCanvasType(targetCanvas);
    
    // Simulate tool calls
    if (response.toolCalls && response.toolCalls.length > 0) {
      for (const tool of response.toolCalls) {
        setCurrentToolCall(tool.replace(/_/g, ' '));
        await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
      }
      setCurrentToolCall(null);
    }
    
    // Small delay before showing response
    await new Promise(r => setTimeout(r, 300));
      
    const assistantMessage: Message = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: response.message,
      timestamp: new Date(),
      canvasType: targetCanvas,
      suggestedFollowups: response.suggestedFollowups,
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  }, [input]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleCloseCanvas = () => {
    setCanvasType('none');
    setShowYourDay(true);
  };

  // Register handler so sidebar can send queries
  useEffect(() => {
    registerQueryHandler(handleSubmit);
  }, [registerQueryHandler, handleSubmit]);

  // Suggestion chips
  const suggestions = [
    { icon: '📊', label: 'Org Overview', query: 'Show me the organization overview' },
    { icon: '📈', label: 'Key Metrics', query: 'Show me key HR metrics' },
    { icon: '👥', label: 'Team Health', query: 'How is team health?' },
    { icon: '⚠️', label: 'Flight Risk', query: 'Who is at flight risk?' },
    { icon: '🏖️', label: 'PTO Requests', query: 'Show pending PTO requests' },
    { icon: '📉', label: 'Trends', query: 'Show me workforce trends' },
  ];

  const firstName = userName.split(' ')[0] || 'there';
  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 flex h-full min-h-0">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            /* Welcome View */
            <div className="h-full flex flex-col items-center justify-center px-6">
              {/* Greeting badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{ background: 'var(--accent-subtle)' }}
              >
                <MambaLogo size={20} variant="forDark" />
                <span className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>
                  Hi {firstName}!
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold mb-8 text-center"
                style={{ color: 'var(--text-primary)' }}
              >
                Your organization at a glance
              </motion.h1>

              {/* Chat input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-2xl mb-6"
              >
                <form onSubmit={handleFormSubmit}>
                  <div
                    id="tour-search"
                    className="rounded-2xl px-4 py-3"
                    style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask Mamba anything..."
                      className="w-full bg-transparent text-base outline-none mb-3"
                      style={{ color: 'var(--text-primary)' }}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button type="button" className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors">
                          <Plus className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                        </button>
                        <button type="button" className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[var(--bg-card)] transition-colors">
                          <Slash className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
                          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tools</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors">
                          <Mic className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                        </button>
                        <button type="button" className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors">
                          <AtSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                        </button>
                        <button
                          type="submit"
                          disabled={!input.trim()}
                          className="p-2 rounded-lg transition-colors disabled:opacity-30"
                          style={{ background: 'var(--accent-primary)' }}
                        >
                          <ArrowUp className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 mb-4"
              >
                <button
                  onClick={() => handleSubmit('Show me the organization overview')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors hover:bg-[var(--bg-muted)]"
                  style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
                >
                  <Users className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>52 employees</span>
                </button>
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                  style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
                >
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Health:</span>
                  <span className="text-sm font-semibold" style={{ color: '#10B981' }}>87</span>
                </div>
              </motion.div>

              {/* Proactive AI Insights - Magic Moments */}
              <motion.div
                id="tour-insights"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-2xl mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                    Mamba noticed
                  </span>
                </div>
                <div className="space-y-2">
                  {proactiveInsights.map((insight, i) => (
                    <motion.button
                      key={insight.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      onClick={() => handleSubmit(insight.query)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all hover:scale-[1.01]"
                      style={{ 
                        background: insight.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 
                                   insight.type === 'warning' ? 'rgba(239, 68, 68, 0.08)' : 
                                   'rgba(139, 92, 246, 0.08)',
                        border: `1px solid ${insight.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 
                                             insight.type === 'warning' ? 'rgba(239, 68, 68, 0.2)' : 
                                             'rgba(139, 92, 246, 0.2)'}`,
                      }}
                    >
                      <span className="text-xl">{insight.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium mb-0.5" style={{ color: 'var(--text-primary)' }}>
                          {insight.title}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {insight.description}
                        </div>
                      </div>
                      <span 
                        className="text-xs font-medium px-3 py-1.5 rounded-lg flex-shrink-0"
                        style={{ 
                          background: insight.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 
                                     insight.type === 'warning' ? 'rgba(239, 68, 68, 0.15)' : 
                                     'var(--accent-subtle)',
                          color: insight.type === 'success' ? '#10B981' : 
                                insight.type === 'warning' ? '#EF4444' : 
                                'var(--accent-primary)'
                        }}
                      >
                        {insight.action}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Suggestion chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 max-w-2xl"
              >
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSubmit(s.query)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors hover:bg-[var(--bg-muted)]"
                    style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </motion.div>
            </div>
          ) : (
            /* Messages View */
            <div className="max-w-3xl mx-auto px-6 py-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ background: 'var(--bg-muted)' }}>
                      <MambaLogo size={18} variant="forDark" />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        message.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                      }`}
                      style={{
                        background: message.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-muted)',
                        color: message.role === 'user' ? 'white' : 'var(--text-primary)',
                      }}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {/* Suggested followups */}
                    {message.role === 'assistant' && message.suggestedFollowups && (
                      <div className="flex flex-wrap gap-2 ml-0">
                        {message.suggestedFollowups.slice(0, 2).map((followup) => (
                          <button
                            key={followup}
                            onClick={() => handleSubmit(followup)}
                            className="px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-[var(--bg-muted)]"
                            style={{ border: '1px solid var(--border)', color: 'var(--accent-primary)' }}
                          >
                            {followup}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ background: 'var(--bg-muted)' }}>
                      <MambaLogo size={18} variant="forDark" />
                    </div>
                    <div className="rounded-2xl rounded-bl-md px-4 py-3" style={{ background: 'var(--bg-muted)' }}>
                      {currentToolCall ? (
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="w-2 h-2 rounded-full"
                            style={{ background: 'var(--accent-primary)' }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {currentToolCall}...
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-2 h-2 rounded-full"
                              style={{ background: 'var(--text-tertiary)' }}
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom input (when messages exist) */}
        {hasMessages && (
          <div className="flex-shrink-0 px-6 pb-6">
            <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto">
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Mamba anything..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--text-primary)' }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2 rounded-xl transition-colors disabled:opacity-50"
                  style={{ background: 'var(--accent-primary)' }}
                >
                  <ArrowUp className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Right panels */}
      {(() => {
        // Explicit switch to ensure canvas shows
        if (canvasType === 'flight-risk') {
          return <DemoCanvas type="flight-risk" onClose={handleCloseCanvas} />;
        }
        if (canvasType === 'impact') {
          return <DemoCanvas type="impact" onClose={handleCloseCanvas} />;
        }
        if (canvasType === 'directory') {
          return <DemoCanvas type="directory" onClose={handleCloseCanvas} />;
        }
        if (canvasType === 'org-overview') {
          return <DemoCanvas type="org-overview" onClose={handleCloseCanvas} />;
        }
        if (canvasType === 'team-health') {
          return <DemoCanvas type="team-health" onClose={handleCloseCanvas} />;
        }
        if (canvasType === 'metrics') {
          return <DemoCanvas type="metrics" onClose={handleCloseCanvas} />;
        }
        if (canvasType === 'org-chart') {
          return <DemoCanvas type="org-chart" onClose={handleCloseCanvas} />;
        }
        if (canvasType === 'pto-requests') {
          return <DemoCanvas type="pto-requests" onClose={handleCloseCanvas} />;
        }
        if (canvasType === 'analytics') {
          return <DemoCanvas type="analytics" onClose={handleCloseCanvas} />;
        }
        if (canvasType !== 'none') {
          return <DemoCanvas type={canvasType} onClose={handleCloseCanvas} />;
        }
        // Default: show Your Day panel
        if (showYourDay) {
          return (
            <motion.div
              key="yourday"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              className="flex-shrink-0 border-l overflow-hidden"
              style={{ borderColor: 'var(--border)' }}
            >
              <div id="tour-your-day" className="h-full">
                <YourDayPanel 
                  userName={userName} 
                  onClose={() => setShowYourDay(false)}
                  onAskExample={(q) => handleSubmit(q)}
                />
              </div>
            </motion.div>
          );
        }
        return null;
      })()}
      {/* Toast notifications */}
      <DemoToast toasts={toasts} onRemove={removeToast} />
      
      {/* Guided Tour */}
      <AnimatePresence>
        {showTour && (
          <DemoTour 
            onClose={handleCloseTour} 
            onStepChange={(step) => {
              if (step >= 1 && step <= 5) {
                setCanvasType('impact');
                setShowYourDay(false);
              } else if (step === 0 || step === 6) {
                setCanvasType('none');
                setShowYourDay(true);
              } else if (step === 7) {
                setCanvasType('none');
                setShowYourDay(true); 
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DemoPage() {
  return (
    <DemoV2Layout>
      <DemoV2PageContent />
    </DemoV2Layout>
  );
}
