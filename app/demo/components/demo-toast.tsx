'use client';

/**
 * Demo Toast - Action confirmation notifications
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Calendar, Mail, AlertTriangle } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning';
  message: string;
  icon?: 'check' | 'calendar' | 'mail' | 'alert';
}

interface DemoToastProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const iconMap = {
  check: Check,
  calendar: Calendar,
  mail: Mail,
  alert: AlertTriangle,
};

export function DemoToast({ toasts, onRemove }: DemoToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.icon || 'check'];
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[280px]"
              style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid var(--border)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
              }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 
                              toast.type === 'warning' ? 'rgba(245, 158, 11, 0.2)' : 
                              'rgba(139, 92, 246, 0.2)',
                  color: toast.type === 'success' ? '#10B981' : 
                         toast.type === 'warning' ? '#F59E0B' : 
                         'var(--accent-primary)'
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>
                {toast.message}
              </span>
              <button 
                onClick={() => onRemove(toast.id)}
                className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
              >
                <X className="w-3 h-3" style={{ color: 'var(--text-tertiary)' }} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
