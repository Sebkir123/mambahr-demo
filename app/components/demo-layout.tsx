'use client';

/**
 * Demo V2 Layout - Standalone
 * 
 * Self-contained demo matching production design exactly.
 * Sidebar items are clickable and trigger chat queries.
 */

import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MambaLogo } from '@/components/ui/mamba-logo';
import { 
  Home, Search, Heart, Zap, Settings, Users, ChevronDown, ChevronRight,
  Building, BarChart3, Bell, Menu, MessageSquare
} from 'lucide-react';

// ============================================================================
// DEMO CONTEXT
// ============================================================================

interface DemoContextType {
  sendQuery: (query: string) => void;
  registerQueryHandler: (handler: (query: string) => void) => void;
}

const DemoContext = createContext<DemoContextType>({
  sendQuery: () => {},
  registerQueryHandler: () => {},
});

export const useDemoContext = () => useContext(DemoContext);

// ============================================================================
// DEMO SIDEBAR - Matches Production Exactly
// ============================================================================

function DemoSidebar({ userName, onNavClick }: { userName: string; onNavClick: (query: string) => void }) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['people', 'operations', 'insights']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <aside
      className="w-64 h-full flex flex-col"
      style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border)' }}
    >
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
          onClick={() => onNavClick('Show me my organization at a glance')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors bg-[var(--bg-muted)]"
        >
          <Home className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Home</span>
        </button>

        {/* FOR YOU section */}
        <div className="mt-5 mb-2">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            For You
          </span>
        </div>
        
        <button
          onClick={() => onNavClick('Show me org health overview')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 hover:bg-[var(--bg-muted)] transition-colors"
        >
          <Heart className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Org Health</span>
        </button>
        
        <button
          onClick={() => onNavClick('Show me my impact metrics')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 hover:bg-[var(--bg-muted)] transition-colors"
        >
          <Zap className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Impact</span>
        </button>
        
        <button
          onClick={() => onNavClick('Show me settings')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 hover:bg-[var(--bg-muted)] transition-colors"
        >
          <Settings className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Settings</span>
        </button>

        {/* PEOPLE section */}
        <div className="mt-4">
          <button
            onClick={() => toggleSection('people')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>People</span>
            </div>
            <ChevronDown 
              className={`w-3.5 h-3.5 transition-transform ${expandedSections.includes('people') ? '' : '-rotate-90'}`} 
              style={{ color: 'var(--text-tertiary)' }} 
            />
          </button>
          <AnimatePresence>
            {expandedSections.includes('people') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <button onClick={() => onNavClick('Show me the employee directory')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Directory</button>
                <button onClick={() => onNavClick('Show me the org chart')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Org Chart</button>
                <button onClick={() => onNavClick('Show me teams overview')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Teams</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* OPERATIONS section */}
        <div className="mt-2">
          <button
            onClick={() => toggleSection('operations')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Operations</span>
            </div>
            <ChevronDown 
              className={`w-3.5 h-3.5 transition-transform ${expandedSections.includes('operations') ? '' : '-rotate-90'}`} 
              style={{ color: 'var(--text-tertiary)' }} 
            />
          </button>
          <AnimatePresence>
            {expandedSections.includes('operations') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <button onClick={() => onNavClick('Show pending PTO requests')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>PTO</button>
                <button onClick={() => onNavClick('Show expense reports')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Expenses</button>
                <button onClick={() => onNavClick('Show equipment requests')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Equipment</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INSIGHTS section */}
        <div className="mt-2">
          <button
            onClick={() => toggleSection('insights')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Insights</span>
            </div>
            <ChevronDown 
              className={`w-3.5 h-3.5 transition-transform ${expandedSections.includes('insights') ? '' : '-rotate-90'}`} 
              style={{ color: 'var(--text-tertiary)' }} 
            />
          </button>
          <AnimatePresence>
            {expandedSections.includes('insights') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <button onClick={() => onNavClick('Show me HR analytics')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Analytics</button>
                <button onClick={() => onNavClick('Generate a workforce report')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Reports</button>
                <button onClick={() => onNavClick('Show me workforce trends')} className="w-full text-left pl-10 pr-3 py-1.5 text-sm hover:bg-[var(--bg-muted)] rounded-lg transition-colors" style={{ color: 'var(--text-tertiary)' }}>Trends</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RECENT section */}
        <div className="mt-5 mb-2">
          <span className="px-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Recent
          </span>
        </div>
        {[
          { text: 'Plan a 10% reduction in Engin...', icon: MessageSquare },
          { text: 'Show impact overview', icon: MessageSquare },
          { text: 'Show impact overview', icon: MessageSquare },
        ].map((chat, i) => (
          <button
            key={i}
            onClick={() => onNavClick(chat.text.replace('...', ''))}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-[var(--bg-muted)] transition-colors truncate"
            style={{ color: 'var(--text-tertiary)' }}
          >
            <chat.icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{chat.text}</span>
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
// DEMO NAVBAR
// ============================================================================

function DemoNavbar({ userName, onLogout }: { userName: string; onLogout: () => void }) {
  return (
    <nav
      className="h-14 flex items-center justify-between px-4"
      style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}
    >
      <div />
      <div className="flex items-center gap-3">


        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <Bell className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
        </button>

        {/* Avatar */}
        <button
          onClick={onLogout}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
          style={{ background: 'var(--accent-primary)', color: 'white' }}
          title="Click to exit demo"
        >
          {userName.charAt(0).toUpperCase()}
        </button>
      </div>
    </nav>
  );
}

// ============================================================================
// LAYOUT
// ============================================================================

export default function DemoV2Layout({ children }: { children: React.ReactNode }) {
  // const router = useRouter(); 
  // Simplified for demo-lite: no router checks or auth, just default user
  const user = { name: 'YCombinator' }; 
  const [queryHandler, setQueryHandler] = useState<((query: string) => void) | null>(null);

  const handleLogout = () => {
    // No-op for demo-lite
    console.log('Logout clicked');
  };

  const handleNavClick = (query: string) => {
    if (queryHandler) {
      queryHandler(query);
    }
  };

  const contextValue: DemoContextType = {
    sendQuery: handleNavClick,
    registerQueryHandler: (handler) => setQueryHandler(() => handler),
  };

  return (
    <DemoContext.Provider value={contextValue}>
      <div className="h-screen w-screen flex overflow-hidden" style={{ background: 'var(--background)' }}>
        <DemoSidebar userName={user.name} onNavClick={handleNavClick} />
        <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden">
          <DemoNavbar userName={user.name} onLogout={handleLogout} />
          <main className="flex-1 min-h-0 overflow-hidden flex">
            {children}
          </main>
        </div>
      </div>
    </DemoContext.Provider>
  );
}
