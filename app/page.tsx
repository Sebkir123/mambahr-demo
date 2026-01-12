'use client';

/**
 * VIDEO DEMO PAGE - Production-matching design
 * 
 * Standalone page for YC video recording.
 * Matches the v2 layout exactly but with working state.
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MambaLogo } from '@/components/ui/mamba-logo';
import { 
  ArrowUp, X, AlertTriangle, TrendingUp, Plus, Slash, Mic, AtSign,
  Home, Search, Heart, Zap, Settings, Users, ChevronDown, Bell,
  Building, BarChart3, Menu, MessageSquare, Sparkles, Calendar, Clock
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

type CanvasType = 'none' | 'flight-risk' | 'impact';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ============================================================================
// SIDEBAR - Matches Production Exactly
// ============================================================================

function Sidebar({ userName, onQuery }: { userName: string; onQuery: (q: string) => void }) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['people', 'operations', 'insights']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-64 h-full flex flex-col" style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border)' }}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MambaLogo size={24} variant="forDark" />
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>MambaHR</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
            <Search className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
            <Menu className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {/* Home - Active */}
        <button
          onClick={() => onQuery('Show me my organization')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors bg-[var(--bg-muted)]"
        >
          <Home className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Home</span>
        </button>

        {/* FOR YOU */}
        <div className="mt-5 mb-2">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            For You
          </span>
        </div>
        
        <button onClick={() => onQuery('Show me org health')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 hover:bg-[var(--bg-muted)] transition-colors">
          <Heart className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Org Health</span>
        </button>
        
        <button onClick={() => onQuery('Tell me about Emily')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 hover:bg-[var(--bg-muted)] transition-colors">
          <Zap className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Impact</span>
        </button>
        
        <button onClick={() => onQuery('Show settings')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 hover:bg-[var(--bg-muted)] transition-colors">
          <Settings className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Settings</span>
        </button>

        {/* PEOPLE */}
        <div className="mt-4">
          <button onClick={() => toggleSection('people')} className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>People</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.includes('people') ? '' : '-rotate-90'}`} style={{ color: 'var(--text-tertiary)' }} />
          </button>
          <AnimatePresence>
            {expandedSections.includes('people') && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <button onClick={() => onQuery('Show directory')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Directory</button>
                <button onClick={() => onQuery('Show org chart')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Org Chart</button>
                <button onClick={() => onQuery('Show teams')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Teams</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* OPERATIONS */}
        <div className="mt-2">
          <button onClick={() => toggleSection('operations')} className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Operations</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.includes('operations') ? '' : '-rotate-90'}`} style={{ color: 'var(--text-tertiary)' }} />
          </button>
          <AnimatePresence>
            {expandedSections.includes('operations') && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <button onClick={() => onQuery('Show PTO requests')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>PTO</button>
                <button onClick={() => onQuery('Show expenses')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Expenses</button>
                <button onClick={() => onQuery('Show equipment')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Equipment</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INSIGHTS */}
        <div className="mt-2">
          <button onClick={() => toggleSection('insights')} className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Insights</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections.includes('insights') ? '' : '-rotate-90'}`} style={{ color: 'var(--text-tertiary)' }} />
          </button>
          <AnimatePresence>
            {expandedSections.includes('insights') && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <button onClick={() => onQuery('Show analytics')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Analytics</button>
                <button onClick={() => onQuery('Show reports')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Reports</button>
                <button onClick={() => onQuery('Show trends')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Trends</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RECENT */}
        <div className="mt-5 mb-2">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Recent</span>
        </div>
        {[
          'Plan a 10% reduction in En...',
          'Show impact overview',
        ].map((text, i) => (
          <button key={i} className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--bg-muted)] transition-colors truncate" style={{ color: 'var(--text-tertiary)' }}>
            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{text}</span>
          </button>
        ))}
      </div>

      {/* User */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: 'var(--accent-primary)', color: 'white' }}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{userName}</div>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Owner · ADMIN</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ============================================================================
// YOUR DAY PANEL - Matches Production
// ============================================================================

function YourDayPanel({ userName, onQuery }: { userName: string; onQuery: (q: string) => void }) {
  const firstName = userName.split(' ')[0];

  return (
    <div className="w-80 h-full overflow-y-auto p-4" style={{ background: 'var(--bg-card)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Your Day</span>
        </div>
        <button className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Good morning, {firstName}</h3>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>You have 3 items that need attention today.</p>
      </div>

      <div className="mb-4">
        <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Today's Tasks</div>
        {[
          { label: 'Review 3 PTO requests', query: 'Show PTO requests', icon: Calendar, urgent: true },
          { label: '2 employees at flight risk', query: 'Who is at flight risk?', icon: AlertTriangle, urgent: true },
          { label: 'Complete Q4 review prep', query: 'Show key metrics', icon: Clock, urgent: false },
        ].map((task, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onQuery(task.query)}
            className="w-full flex items-center gap-3 p-3 rounded-xl mb-2 hover:bg-[var(--bg-muted)] transition-colors text-left"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                 style={{ background: task.urgent ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-muted)' }}>
              <task.icon className="w-4 h-4" style={{ color: task.urgent ? '#EF4444' : 'var(--text-tertiary)' }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{task.label}</div>
            </div>
            {task.urgent && <div className="w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />}
          </motion.button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Quick Actions</div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onQuery('Show org health')} className="p-3 rounded-xl text-left hover:bg-[var(--bg-muted)] transition-colors" style={{ border: '1px solid var(--border)' }}>
            <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Org Health</div>
            <div className="text-lg font-bold" style={{ color: '#10B981' }}>87</div>
          </button>
          <button onClick={() => onQuery('Show directory')} className="p-3 rounded-xl text-left hover:bg-[var(--bg-muted)] transition-colors" style={{ border: '1px solid var(--border)' }}>
            <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Employees</div>
            <div className="text-lg font-bold" style={{ color: 'var(--accent-primary)' }}>52</div>
          </button>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <MambaLogo size={18} variant="forDark" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Ask me anything</h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>I can help with PTO, finding people, goals, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// FLIGHT RISK CANVAS
// ============================================================================

function FlightRiskCanvas({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 380, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className="h-full border-l overflow-hidden flex flex-col flex-shrink-0"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
    >
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Retention Intelligence</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)]">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>
      
      <div className="p-4 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(245, 158, 11, 0.05)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>2 employees need attention</span>
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>Proactive action</span>
        </div>
        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>162 signals tracked across 40 integrations</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Emily Kim */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Emily Kim</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Senior Software Engineer</div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold" style={{ color: '#F59E0B' }}>42%</span>
              <TrendingUp className="w-3 h-3" style={{ color: '#EF4444' }} />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3 p-2 rounded-lg" style={{ background: 'var(--bg-card)' }}>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Impact:</span>
            <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>$842K</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 rounded-md text-xs" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>Slack response +45%</span>
            <span className="px-2 py-1 rounded-md text-xs" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>Commits down 30%</span>
            <span className="px-2 py-1 rounded-md text-xs" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>Calendar fragmentation ↑</span>
          </div>
        </div>

        {/* David Park */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-medium" style={{ color: 'var(--text-primary)' }}>David Park</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sales Director</div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold" style={{ color: '#EF4444' }}>62%</span>
              <TrendingUp className="w-3 h-3" style={{ color: '#EF4444' }} />
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'var(--bg-card)' }}>
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Impact:</span>
            <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>$2.1M</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// IMPACT CANVAS
// ============================================================================

function ImpactCanvas({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 550, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className="h-full border-l overflow-hidden flex flex-col flex-shrink-0"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
    >
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium" style={{ background: 'var(--accent-primary)', color: 'white' }}>E</div>
          <div>
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Emily Kim</h2>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Senior Software Engineer · Engineering</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)]">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>
      
      <div className="p-6 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(167, 139, 250, 0.05)' }}>
        <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Total Annual Impact</div>
        <div className="text-4xl font-bold" style={{ color: 'var(--accent-primary)' }}>$842,000</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Impact Breakdown</div>
          <div className="space-y-3">
            <div className="p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Direct Revenue</span>
                <span className="font-semibold" style={{ color: '#10B981' }}>$285,000</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Revenue from features she shipped</div>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Revenue Influence</span>
                <span className="font-semibold" style={{ color: '#10B981' }}>$420,000</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Impact on deals through technical support</div>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Cost Savings</span>
                <span className="font-semibold" style={{ color: '#10B981' }}>$137,000</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Infrastructure optimization (40% reduction)</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" style={{ color: '#F59E0B' }} />
            <span className="font-medium" style={{ color: '#F59E0B' }}>Flight Risk: 42%</span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Signals: Slack response time +45%, GitHub commits -30%, 3 cancelled 1:1s
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function VideoDemoPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [canvas, setCanvas] = useState<CanvasType>('none');
  const [showYourDay, setShowYourDay] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userName = 'YCombinator';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuery = async (text: string) => {
    if (!text.trim()) return;

    const query = text.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);
    setShowYourDay(false);

    await new Promise(r => setTimeout(r, 800));

    let responseText = "I can help with that!";
    let newCanvas: CanvasType = 'none';
    
    if (query.includes('flight risk') || query.includes('at risk') || query.includes('retention')) {
      responseText = "I've identified 2 employees with elevated flight risk. Emily Kim is your highest-impact person at risk — $842,000 in annual value.";
      newCanvas = 'flight-risk';
    } else if (query.includes('emily')) {
      responseText = "Here's Emily Kim's full impact profile. She generates $842,000 in value annually: $285K direct revenue, $420K revenue influence, and $137K in cost savings.";
      newCanvas = 'impact';
    }

    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    setIsTyping(false);
    setCanvas(newCanvas);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    handleQuery(input);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="h-screen w-screen flex overflow-hidden" style={{ background: 'var(--background)' }}>
      <Sidebar userName={userName} onQuery={handleQuery} />
      
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden">
        {/* Navbar */}
        <nav className="h-14 flex items-center justify-between px-4" style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
          <div />
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
              <Bell className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: 'var(--accent-primary)', color: 'white' }}>T</div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 min-h-0 overflow-hidden flex">
          {/* Chat */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              {!hasMessages ? (
                <div className="h-full flex flex-col items-center justify-center px-6">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'var(--accent-subtle)' }}>
                    <MambaLogo size={20} variant="forDark" />
                    <span className="text-sm font-medium" style={{ color: 'var(--accent-primary)' }}>Hi {userName.split(' ')[0]}!</span>
                  </motion.div>
                  <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>
                    Your organization at a glance
                  </motion.h1>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full max-w-2xl mb-6">
                    <form onSubmit={handleSubmit}>
                      <div className="rounded-2xl px-4 py-3" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                        <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask Mamba anything..." className="w-full bg-transparent text-base outline-none mb-3" style={{ color: 'var(--text-primary)' }} />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button type="button" className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"><Plus className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} /></button>
                            <button type="button" className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[var(--bg-card)] transition-colors"><Slash className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} /><span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tools</span></button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button type="button" className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"><Mic className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} /></button>
                            <button type="button" className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"><AtSign className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} /></button>
                            <button type="submit" disabled={!input.trim()} className="p-2 rounded-lg transition-colors disabled:opacity-30" style={{ background: 'var(--accent-primary)' }}><ArrowUp className="w-4 h-4 text-white" /></button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto px-6 py-4 space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ background: 'var(--bg-muted)' }}>
                          <MambaLogo size={18} variant="forDark" />
                        </div>
                      )}
                      <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}`}
                           style={{ background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-muted)', color: msg.role === 'user' ? 'white' : 'var(--text-primary)' }}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ background: 'var(--bg-muted)' }}>
                        <MambaLogo size={18} variant="forDark" />
                      </div>
                      <div className="rounded-2xl rounded-bl-md px-4 py-3" style={{ background: 'var(--bg-muted)' }}>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => <motion.span key={i} className="w-2 h-2 rounded-full" style={{ background: 'var(--text-tertiary)' }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {hasMessages && (
              <div className="flex-shrink-0 px-6 pb-6">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask Mamba anything..." className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text-primary)' }} />
                    <button type="submit" disabled={!input.trim()} className="p-2 rounded-xl transition-colors disabled:opacity-50" style={{ background: 'var(--accent-primary)' }}><ArrowUp className="w-4 h-4 text-white" /></button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <AnimatePresence mode="wait">
            {canvas === 'flight-risk' && <FlightRiskCanvas key="fr" onClose={() => { setCanvas('none'); setShowYourDay(true); }} />}
            {canvas === 'impact' && <ImpactCanvas key="imp" onClose={() => { setCanvas('none'); setShowYourDay(true); }} />}
            {canvas === 'none' && showYourDay && (
              <motion.div key="yd" initial={{ width: 0, opacity: 0 }} animate={{ width: 320, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="flex-shrink-0 border-l overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                <YourDayPanel userName={userName} onQuery={handleQuery} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
