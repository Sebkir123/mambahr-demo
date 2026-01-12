'use client';

/**
 * DemoChat - AI chat interface for YC demo
 *
 * Uses MambaHR design system with simulated AI responses.
 * Fixed scroll behavior and improved UX.
 */

import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { matchDemoResponse, suggestedPrompts, type DemoAIResponse, type CanvasType } from '../lib/demo-ai';
import { MambaLogo } from '@/components/ui/mamba-logo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  canvas?: CanvasType;
  canvasData?: Record<string, unknown>;
  toolCalls?: string[];
  suggestedFollowups?: string[];
  timestamp: Date;
}

interface DemoChatProps {
  onCanvasChange: (canvas: CanvasType, data?: Record<string, unknown>) => void;
}

export interface DemoChatRef {
  sendMessage: (message: string) => void;
}

export const DemoChat = forwardRef<DemoChatRef, DemoChatProps>(function DemoChat({ onCanvasChange }, ref) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentToolCall, setCurrentToolCall] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Expose sendMessage to parent
  useImperativeHandle(ref, () => ({
    sendMessage: (message: string) => {
      handleSuggestedPrompt(message);
    },
  }));

  // Improved auto-scroll that ensures the latest message is visible
  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, []);

  // Scroll when messages change or typing state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Simulate typing effect for AI response
  const simulateResponse = async (response: DemoAIResponse) => {
    setIsTyping(true);
    scrollToBottom();

    // Simulate tool calls
    if (response.toolCalls && response.toolCalls.length > 0) {
      for (const tool of response.toolCalls) {
        setCurrentToolCall(tool);
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
        scrollToBottom();
      }
      setCurrentToolCall(null);
    }

    // Small delay before showing response
    await new Promise((r) => setTimeout(r, 300));

    // Add assistant message
    const assistantMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: response.message,
      canvas: response.canvas,
      canvasData: response.canvasData,
      suggestedFollowups: response.suggestedFollowups,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);

    // Update canvas if needed
    if (response.canvas && response.canvas !== 'none') {
      onCanvasChange(response.canvas, response.canvasData);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Scroll immediately after adding user message
    setTimeout(scrollToBottom, 50);

    // Get AI response
    const response = matchDemoResponse(input.trim());
    await simulateResponse(response);
  };

  const handleSuggestedPrompt = async (prompt: string) => {
    if (isTyping) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Scroll immediately after adding user message
    setTimeout(scrollToBottom, 50);

    const response = matchDemoResponse(prompt);
    await simulateResponse(response);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages container with proper overflow handling */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{ minHeight: 0 }}
      >
        <div className="p-4 space-y-4 pb-4">
          {messages.length === 0 ? (
            <WelcomeState onPromptSelect={handleSuggestedPrompt} />
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onFollowupSelect={handleSuggestedPrompt}
                />
              ))}
            </>
          )}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{ background: 'var(--accent-subtle)' }}
                >
                  <MambaLogo size={20} variant="forDark" />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl max-w-[80%]"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  {currentToolCall ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)' }} />
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Running {currentToolCall.replace(/_/g, ' ')}...
                      </span>
                    </div>
                  ) : (
                    <TypingDots />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll anchor */}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>

      {/* Fixed input bar at bottom */}
      <div
        className="flex-shrink-0 p-4 border-t"
        style={{
          borderColor: 'var(--border)',
          background: 'var(--background)',
        }}
      >
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div
            className="flex-1 relative"
            style={{
              background: 'var(--bg-muted)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Mamba anything..."
              className="w-full h-12 px-4 bg-transparent text-sm outline-none"
              style={{
                color: 'var(--text-primary)',
              }}
              disabled={isTyping}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
            style={{
              background: input.trim() ? 'var(--accent-primary)' : 'var(--bg-muted)',
              color: 'white',
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
});

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

function WelcomeState({ onPromptSelect }: { onPromptSelect: (prompt: string) => void }) {
  const user = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('demo_user') || '{"name":"there"}')
    : { name: 'there' };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'var(--accent-subtle)' }}
        >
          <MambaLogo size={48} variant="forDark" />
        </div>
        <h2
          className="text-2xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Hi {user.name}, I'm Mamba
        </h2>
        <p
          className="text-sm mb-8 max-w-md"
          style={{ color: 'var(--text-secondary)' }}
        >
          Your AI-powered People OS assistant. I can help you with employee insights,
          recruiting, approvals, and more.
        </p>
      </motion.div>

      {/* Suggested prompts */}
      <div className="w-full max-w-lg space-y-6">
        {suggestedPrompts.map((category, i) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{category.icon}</span>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
                {category.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onPromptSelect(prompt)}
                  className="px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
                  style={{
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  onFollowupSelect,
}: {
  message: Message;
  onFollowupSelect: (prompt: string) => void;
}) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{
          background: isUser ? 'var(--accent-primary)' : 'var(--accent-subtle)',
        }}
      >
        {isUser ? (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ) : (
          <MambaLogo size={20} variant="forDark" />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-2 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className="px-4 py-3 rounded-2xl"
          style={{
            background: isUser ? 'var(--accent-primary)' : 'var(--bg-card)',
            border: isUser ? 'none' : '1px solid var(--border)',
            color: isUser ? 'white' : 'var(--text-primary)',
          }}
        >
          <div
            className="text-sm whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br />')
                .replace(/\|/g, ' | ')
            }}
          />
        </div>

        {/* Suggested followups */}
        {!isUser && message.suggestedFollowups && message.suggestedFollowups.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.suggestedFollowups.map((followup) => (
              <button
                key={followup}
                onClick={() => onFollowupSelect(followup)}
                className="px-3 py-1.5 rounded-xl text-xs transition-all hover:scale-105"
                style={{
                  background: 'var(--accent-subtle)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--accent-border)',
                }}
              >
                {followup}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--accent-primary)' }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export default DemoChat;
