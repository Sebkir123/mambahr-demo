'use client';

/**
 * Demo Canvas - Standalone visualizations
 * 
 * Self-contained canvas components that show when AI responds to queries.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MambaLogo } from '@/components/ui/mamba-logo';
import { 
  X, AlertTriangle, TrendingDown, TrendingUp, Users, Calendar, 
  Mail, Phone, MapPin, Briefcase, Check, Settings, HelpCircle,
  BarChart3, Heart, ArrowUp, ArrowDown, GitBranch, Search, 
  Bell, Shield, Link2, MessageSquare, Zap
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export type CanvasType = 
  | 'none' 
  | 'flight-risk' 
  | 'org-overview' 
  | 'employee-profile' 
  | 'pto-requests' 
  | 'metrics'
  | 'team-health'
  | 'directory'
  | 'org-chart'
  | 'analytics'
  | 'trends'
  | 'settings'
  | 'help'
  | 'impact';

// ============================================================================
// FLIGHT RISK CANVAS
// ============================================================================

function FlightRiskCanvas({ onClose }: { onClose: () => void }) {
  const employees = [
    { 
      name: 'Emily Kim', 
      role: 'Senior Software Engineer', 
      risk: 42, 
      riskLabel: '90-day',
      trend: 'up', 
      impact: '$842K',
      signals: ['Slack response +45%', 'Commits down 30%', 'Calendar fragmentation ↑'],
      signalsTracked: 162  // The actual number from our product
    },
    { 
      name: 'David Park', 
      role: 'Sales Director', 
      risk: 62, 
      riskLabel: '90-day',
      trend: 'up', 
      impact: '$2.1M',
      signals: ['LinkedIn activity +300%', 'Quota at 78%', 'Declined 1:1s'],
      signalsTracked: 162
    },
    { 
      name: 'Alex Rivera', 
      role: 'Senior Software Engineer', 
      risk: 6, 
      riskLabel: '90-day',
      trend: 'stable', 
      impact: '$260K',
      signals: ['Stable work patterns', 'High engagement'],
      signalsTracked: 162
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Retention Intelligence</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="p-4 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(245, 158, 11, 0.05)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>2 employees need attention</span>
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
            Proactive action
          </span>
        </div>
        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>162 signals tracked across 40 integrations</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {employees.map((emp, i) => (
          <motion.div
            key={emp.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 border-b hover:bg-[var(--bg-muted)] transition-colors cursor-pointer"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{emp.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{emp.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold" style={{ color: emp.risk >= 30 ? '#F59E0B' : '#10B981' }}>{emp.risk}%</span>
                  {emp.trend === 'up' && <TrendingUp className="w-4 h-4" style={{ color: '#F59E0B' }} />}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{emp.riskLabel} flight risk</div>
              </div>
            </div>
            
            {/* Impact value */}
            <div className="flex items-center gap-2 mb-3 p-2 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Impact:</span>
              <span className="text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>{emp.impact}</span>
              <span className="text-xs ml-auto" style={{ color: 'var(--text-tertiary)' }}>{emp.signalsTracked} signals tracked</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {emp.signals.map((signal, j) => (
                <span key={j} className="text-xs px-2 py-0.5 rounded-full" style={{ 
                  background: signal.includes('↑') || signal.includes('+') || signal.includes('down') || signal.includes('Declined') ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
                  color: signal.includes('↑') || signal.includes('+') || signal.includes('down') || signal.includes('Declined') ? '#F59E0B' : '#10B981' 
                }}>{signal}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button className="w-full py-2.5 rounded-xl text-sm font-medium" style={{ background: 'var(--accent-primary)', color: 'white' }}>
          Schedule Retention Check-ins
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// ORG OVERVIEW CANVAS
// ============================================================================

function OrgOverviewCanvas({ onClose }: { onClose: () => void }) {
  const departments = [
    { name: 'Engineering', count: 24, health: 89 },
    { name: 'Product', count: 8, health: 92 },
    { name: 'Design', count: 6, health: 85 },
    { name: 'Sales', count: 10, health: 78 },
    { name: 'Operations', count: 4, health: 95 },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Organization</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
          <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>52</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Employees</div>
        </div>
        <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
          <div className="text-2xl font-bold" style={{ color: '#10B981' }}>87</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Health</div>
        </div>
        <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
          <div className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>+6</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>This Qtr</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {departments.map((dept, i) => (
          <motion.div
            key={dept.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between py-3 border-b last:border-0"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-primary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{dept.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{dept.count}</span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs" 
                style={{ background: dept.health >= 85 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: dept.health >= 85 ? '#10B981' : '#F59E0B' }}>
                <Heart className="w-3 h-3" />
                {dept.health}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PTO REQUESTS CANVAS
// ============================================================================

function PTORequestsCanvas({ onClose }: { onClose: () => void }) {
  const requests = [
    { name: 'Marcus Chen', dates: 'Dec 23-27', days: 5, type: 'Vacation' },
    { name: 'Alex Rivera', dates: 'Dec 24-26', days: 3, type: 'Personal' },
    { name: 'Jordan Taylor', dates: 'Jan 2-3', days: 2, type: 'Sick' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>PTO Requests</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {requests.map((req, i) => (
          <motion.div
            key={req.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                  {req.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{req.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{req.dates} · {req.days} days</div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--bg-muted)', color: 'var(--text-secondary)' }}>{req.type}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                <Check className="w-4 h-4" /> Approve
              </button>
              <button className="flex-1 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--bg-muted)', color: 'var(--text-secondary)' }}>Decline</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// METRICS CANVAS
// ============================================================================

function MetricsCanvas({ onClose }: { onClose: () => void }) {
  const metrics = [
    { label: 'Satisfaction', value: '4.2/5', trend: '+0.3', positive: true },
    { label: 'Avg. Tenure', value: '2.4 yrs', trend: '+0.2', positive: true },
    { label: 'Turnover', value: '8.2%', trend: '-1.5%', positive: true },
    { label: 'Time to Hire', value: '32 days', trend: '+5', positive: false },
    { label: 'Training', value: '89%', trend: '+12%', positive: true },
    { label: 'eNPS', value: '+42', trend: '+8', positive: true },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Key Metrics</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
            >
              <div className="text-xs mb-2" style={{ color: 'var(--text-tertiary)' }}>{metric.label}</div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{metric.value}</span>
                <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: metric.positive ? '#10B981' : '#EF4444' }}>
                  {metric.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {metric.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TEAM HEALTH CANVAS
// ============================================================================

function TeamHealthCanvas({ onClose }: { onClose: () => void }) {
  const teams = [
    { name: 'Platform Team', score: 92, members: 8, status: 'Thriving' },
    { name: 'Frontend Team', score: 87, members: 6, status: 'Healthy' },
    { name: 'Backend Team', score: 84, members: 7, status: 'Healthy' },
    { name: 'DevOps', score: 79, members: 3, status: 'Watch' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5" style={{ color: '#10B981' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Team Health</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="p-4 border-b text-center" style={{ borderColor: 'var(--border)' }}>
        <div className="text-4xl font-bold mb-1" style={{ color: '#10B981' }}>87</div>
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Overall Health Score</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {teams.map((team, i) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl mb-3"
            style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{team.name}</span>
              <span className="text-lg font-bold" style={{ color: team.score >= 85 ? '#10B981' : '#F59E0B' }}>{team.score}</span>
            </div>
            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
              <span>{team.members} members</span>
              <span className="px-2 py-0.5 rounded-full" style={{ 
                background: team.status === 'Thriving' ? 'rgba(16, 185, 129, 0.1)' : team.status === 'Healthy' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                color: team.status === 'Thriving' ? '#10B981' : team.status === 'Healthy' ? 'var(--accent-primary)' : '#F59E0B'
              }}>{team.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// DIRECTORY CANVAS - Production Design with YC Employees
// ============================================================================

function DirectoryCanvas({ onClose }: { onClose: () => void }) {
  const [selectedEmployee, setSelectedEmployee] = React.useState<typeof employees[0] | null>(null);
  const [activeTab, setActiveTab] = React.useState<'people' | 'teams' | 'orgchart'>('people');

  const employees = [
    { name: 'Sebastian Kirsch', role: 'Owner', dept: 'Leadership', location: 'office', tenure: '7d', ppi: 75, engagement: 72, goalAlign: 78, burnoutRisk: 'Low' },
    { name: 'Gary Tan', role: 'CEO', dept: 'Leadership', location: 'office', tenure: '5y', ppi: 92, engagement: 88, goalAlign: 95, burnoutRisk: 'Low' },
    { name: 'Michael Seibel', role: 'Managing Director', dept: 'Leadership', location: 'office', tenure: '8y', ppi: 89, engagement: 85, goalAlign: 91, burnoutRisk: 'Low' },
    { name: 'Diana Hu', role: 'COO', dept: 'Leadership', location: 'office', tenure: '4y', ppi: 87, engagement: 82, goalAlign: 88, burnoutRisk: 'Low' },
    { name: 'Dalton Caldwell', role: 'Managing Director', dept: 'Leadership', location: 'office', tenure: '10y', ppi: 94, engagement: 91, goalAlign: 93, burnoutRisk: 'Low' },
    { name: 'Gustaf Alströmer', role: 'Group Partner', dept: 'Partners', location: 'remote', tenure: '6y', ppi: 86, engagement: 79, goalAlign: 84, burnoutRisk: 'Medium' },
    { name: 'Harj Taggar', role: 'Group Partner', dept: 'Partners', location: 'office', tenure: '7y', ppi: 88, engagement: 84, goalAlign: 87, burnoutRisk: 'Low' },
    { name: 'Jared Friedman', role: 'Group Partner', dept: 'Partners', location: 'office', tenure: '9y', ppi: 91, engagement: 88, goalAlign: 92, burnoutRisk: 'Low' },
  ];

  // If employee is selected, show profile view
  if (selectedEmployee) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Employee Canvas</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedEmployee(null)} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
              <ArrowDown className="w-4 h-4 rotate-90" style={{ color: 'var(--text-tertiary)' }} />
            </button>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
              <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
              {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{selectedEmployee.name}</h3>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedEmployee.role}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)' }}>
                  {selectedEmployee.dept}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>📍 {selectedEmployee.location}</span>
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{selectedEmployee.tenure}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
              <Mail className="w-4 h-4" /> Email
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)' }}>
              <MambaLogo size={14} variant="forDark" /> Ask Mamba
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
              <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedEmployee.tenure}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Tenure</div>
            </div>
            <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
              <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>0</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Reports</div>
            </div>
            <div className="text-center p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
              <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>0</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Goals</div>
            </div>
          </div>

          {/* Behavioral Insights */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Behavioral Insights</span>
              </div>
              <button className="text-xs flex items-center gap-1" style={{ color: 'var(--accent-primary)' }}>
                <MambaLogo size={12} variant="forDark" /> Deep dive
              </button>
            </div>

            {/* PPI Score */}
            <div className="flex items-center justify-between mb-4 p-3 rounded-xl" style={{ background: 'var(--bg-card)' }}>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedEmployee.ppi}</span>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>/ 100</span>
                </div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>PPI Score</div>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium" style={{ color: '#10B981' }}>
                <Zap className="w-4 h-4" /> Strong
              </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="p-3 rounded-xl text-center" style={{ background: 'var(--bg-card)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{selectedEmployee.engagement}%</div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Engagement</div>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ background: 'var(--bg-card)' }}>
                <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{selectedEmployee.goalAlign}%</div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Goal Align</div>
              </div>
              <div className="p-3 rounded-xl text-center" style={{ background: selectedEmployee.burnoutRisk === 'Low' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)' }}>
                <div className="text-lg font-bold" style={{ color: selectedEmployee.burnoutRisk === 'Low' ? '#10B981' : '#F59E0B' }}>{selectedEmployee.burnoutRisk}</div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Burnout Risk</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
              <TrendingUp className="w-3 h-3" /> Engagement stable
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="p-4 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
          <button className="w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)' }}>
            <MambaLogo size={14} variant="forDark" /> Ask Mamba about {selectedEmployee.name.split(' ')[0]}
          </button>
          <button className="w-full py-2.5 rounded-xl text-sm font-medium" style={{ background: 'var(--bg-muted)', color: 'var(--text-secondary)' }}>
            View Full Profile
          </button>
        </div>
      </div>
    );
  }

  // Directory list view
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Directory</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
            <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>
        <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{employees.length} people in your organization</div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-3 border-b" style={{ borderColor: 'var(--border)' }}>
        {[
          { id: 'people', label: 'People', icon: Users },
          { id: 'teams', label: 'Teams', icon: Users },
          { id: 'orgchart', label: 'Org Chart', icon: GitBranch },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === tab.id ? '' : 'hover:bg-[var(--bg-muted)]'}`}
            style={{
              background: activeTab === tab.id ? 'var(--bg-muted)' : 'transparent',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-tertiary)'
            }}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[var(--bg-muted)] transition-colors" style={{ color: 'var(--text-tertiary)' }}>
          + New Team
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
            <Search className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <input type="text" placeholder="Search by name, title, or email..." className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text-primary)' }} />
          </div>
          <button className="px-3 py-2 rounded-lg text-xs" style={{ background: 'var(--bg-muted)', color: 'var(--text-secondary)' }}>
            All Departments ▾
          </button>
        </div>
      </div>

      {/* Employee cards grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-3">
          {employees.map((emp, i) => (
            <motion.button
              key={emp.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedEmployee(emp)}
              className="p-4 rounded-xl text-left hover:bg-[var(--bg-muted)] transition-colors"
              style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: '#10B981', borderColor: 'var(--bg-muted)' }} />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>{emp.name}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{emp.role}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
                <span>{emp.dept}</span>
                <span>📍 {emp.location}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ORG CHART CANVAS
// ============================================================================

function OrgChartCanvas({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Org Chart</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* CEO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-2" style={{ background: 'var(--accent-primary)', color: 'white' }}>JD</div>
          <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Jane Doe</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>CEO</div>
        </div>
        
        <div className="w-px h-6 mx-auto" style={{ background: 'var(--border)' }} />
        
        {/* Direct reports */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { initials: 'MK', name: 'Mike Kim', title: 'CTO' },
            { initials: 'SL', name: 'Sara Lee', title: 'CPO' },
            { initials: 'TR', name: 'Tom Ross', title: 'COO' },
          ].map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-3 rounded-xl cursor-pointer hover:bg-[var(--bg-muted)] transition-colors"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium mb-2" style={{ background: 'var(--bg-muted)', border: '2px solid var(--accent-primary)', color: 'var(--accent-primary)' }}>
                {person.initials}
              </div>
              <div className="text-xs font-medium text-center" style={{ color: 'var(--text-primary)' }}>{person.name}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{person.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SETTINGS CANVAS
// ============================================================================

function SettingsCanvas({ onClose }: { onClose: () => void }) {
  const settings = [
    { icon: Bell, label: 'Notifications', desc: 'Email and push alerts' },
    { icon: Shield, label: 'Security', desc: '2FA and passwords' },
    { icon: Link2, label: 'Integrations', desc: 'Slack, Calendar, HRIS' },
    { icon: Users, label: 'Team Permissions', desc: 'Roles and access' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Settings</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {settings.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="w-full flex items-center gap-4 p-4 rounded-xl mb-3 hover:bg-[var(--bg-muted)] transition-colors text-left"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-muted)' }}>
              <item.icon className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div>
              <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{item.label}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// HELP CANVAS
// ============================================================================

function HelpCanvas({ onClose }: { onClose: () => void }) {
  const capabilities = [
    { icon: Users, label: 'Find people', example: '"Who works in Engineering?"' },
    { icon: Calendar, label: 'Manage time off', example: '"Show pending PTO"' },
    { icon: AlertTriangle, label: 'Identify risks', example: '"Who is at flight risk?"' },
    { icon: BarChart3, label: 'Track metrics', example: '"Show me turnover rate"' },
    { icon: Heart, label: 'Monitor health', example: '"How is team morale?"' },
    { icon: MessageSquare, label: 'Get insights', example: '"What should I focus on?"' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>What I Can Do</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {capabilities.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-xl mb-2"
            style={{ background: 'var(--bg-muted)' }}
          >
            <item.icon className="w-5 h-5 mt-0.5" style={{ color: 'var(--accent-primary)' }} />
            <div>
              <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{item.label}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.example}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// ANALYTICS/TRENDS CANVAS (Combined)
// ============================================================================

function AnalyticsCanvas({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Analytics</h2>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <X className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Trend chart placeholder */}
        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
          <div className="text-xs font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>HEADCOUNT TREND</div>
          <div className="flex items-end gap-2 h-24">
            {[40, 42, 44, 45, 48, 50, 52].map((val, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${val * 1.8}%` }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 rounded-t"
                style={{ background: `var(--accent-primary)`, opacity: 0.5 + (i * 0.07) }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span>Jun</span><span>Dec</span>
          </div>
        </div>

        {/* Key insights */}
        <div className="space-y-3">
          <div className="p-3 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <div className="flex items-center gap-2 mb-1">
              <ArrowUp className="w-4 h-4" style={{ color: '#10B981' }} />
              <span className="text-sm font-medium" style={{ color: '#10B981' }}>+12% YoY Growth</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Headcount growing faster than industry avg</div>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <div className="flex items-center gap-2 mb-1">
              <ArrowDown className="w-4 h-4" style={{ color: '#10B981' }} />
              <span className="text-sm font-medium" style={{ color: '#10B981' }}>-2.1% Attrition</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Retention improving since Q2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN CANVAS COMPONENT
// ============================================================================

interface DemoCanvasProps {
  type: CanvasType;
  onClose: () => void;
}

export function DemoCanvas({ type, onClose }: DemoCanvasProps) {
  if (type === 'none') return null;

  const canvasMap: Record<Exclude<CanvasType, 'none'>, React.ReactNode> = {
    'flight-risk': <FlightRiskCanvas onClose={onClose} />,
    'org-overview': <OrgOverviewCanvas onClose={onClose} />,
    'employee-profile': <DirectoryCanvas onClose={onClose} />,
    'pto-requests': <PTORequestsCanvas onClose={onClose} />,
    'metrics': <MetricsCanvas onClose={onClose} />,
    'team-health': <TeamHealthCanvas onClose={onClose} />,
    'directory': <DirectoryCanvas onClose={onClose} />,
    'org-chart': <OrgChartCanvas onClose={onClose} />,
    'analytics': <AnalyticsCanvas onClose={onClose} />,
    'trends': <AnalyticsCanvas onClose={onClose} />,
    'settings': <SettingsCanvas onClose={onClose} />,
    'help': <HelpCanvas onClose={onClose} />,
    'impact': <ImpactCanvas onClose={onClose} />,
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: type === 'impact' ? 650 : 380, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex-shrink-0 h-full border-l overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
    >
      {canvasMap[type as Exclude<CanvasType, 'none'>]}
    </motion.div>
  );
}

// ============================================================================
// IMPACT CANVAS - WRAPPER FOR IMPACT ANALYSIS PANEL
// ============================================================================

import { ImpactAnalysisPanel } from './impact-analysis-panel';

function ImpactCanvas({ onClose }: { onClose: () => void }) {
  // Mock data for Emily Kim - the $842K employee from the YC demo
  const mockEmployee = {
    id: 'emp_emily_kim',
    name: 'Emily Kim',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    tenure: 2.5,
    email: 'emily.kim@demo.mambahr.com',
    salary: 195000
  };

  // The famous $842K breakdown:
  // - Revenue Contribution: $285,000 (direct pipeline impact)
  // - Revenue Influence: $420,000 (deals she supported, code powering sales)
  // - Cost Savings: $137,000 (40% infra cost reduction)
  const mockImpact = {
    totalValue: 842000,
    valueChange: 15,
    revenueGenerated: 285000,   // Direct revenue contribution
    // revenueInfluence: 420000, // Removed to match interface
    costSavings: 137000,        // 40% infrastructure cost reduction
    teamLift: 2.4,              // 2.4x team multiplier
    productivityScore: 92,
    strategicScore: 94,
    trend: 'down' as const,     // Fixed type matching
    rankPercentile: 5,           // Top 5%
    monthlyData: [120, 125, 128, 124, 118, 112],  // Declining trend
    flightRisk: 'medium' as const,
    flightRiskScore: 42,         // 42% 90-day probability
    confidenceLevel: 89,
    keyContributions: [
      'Architected real-time event pipeline (10M events/day)',
      'Reduced infrastructure costs by 40% ($137K savings)',
      'Mentored 3 junior engineers to promotion'
    ],
    riskFactors: [
      { factor: 'Slack response time up 45%', impact: 18 },
      { factor: 'Calendar fragmentation increased', impact: 15 },
      { factor: 'Commit frequency down 30%', impact: 12 },
      { factor: 'After-hours work up 60%', impact: 9 }
    ],
    protectiveFactors: [
      { factor: 'Team tenure: 2.5 years', impact: 12 },
      { factor: 'Promoted 8 months ago', impact: 8 }
    ]
  };

  const mockReviews = [
    {
      id: 'r1',
      review_cycle: '2025 Annual',
      overall_rating: 4.8,
      performance_rating: 5,
      potential_rating: 4,
      strengths: 'Emily continues to be one of our top performers. Exceptional technical skills and system design. Architected our real-time pipeline processing 10M events/day.',
      areas_for_improvement: 'Sometimes takes on too much. Could improve delegation.',
      review_period_end: '2025-12-31'
    },
    {
      id: 'r2',
      review_cycle: 'Q2 2025',
      overall_rating: 4.5,
      performance_rating: 4,
      potential_rating: 5,
      strengths: 'Outstanding work on infrastructure cost optimization. 40% reduction exceeded targets.',
      areas_for_improvement: 'Encourage more visibility with leadership team.',
      review_period_end: '2025-06-30'
    }
  ];

  const mockGoals = [
    { id: 'g1', title: 'Scale event pipeline to 50M events/day', progress: 65, status: 'in_progress', target_date: '2026-03-31' },
    { id: 'g2', title: 'Reduce p99 latency to <50ms', progress: 60, status: 'in_progress', target_date: '2026-02-28' },
    { id: 'g3', title: 'Implement partition sharding', progress: 80, status: 'in_progress', target_date: '2026-01-31' },
    { id: 'g4', title: '40% infrastructure cost reduction', progress: 100, status: 'completed', target_date: '2025-09-01' }
  ];

  const mockSignals = [
    { provider: 'GitHub', count: 162, lastActivity: 'Today', trend: 'down' },
    { provider: 'Jira', count: 34, lastActivity: 'Today', trend: 'stable' },
    { provider: 'Slack', count: 1847, lastActivity: 'Today', trend: 'up' },
    { provider: 'Calendar', count: 28, lastActivity: 'This week', trend: 'up' }
  ];

  return (
    <div className="h-full relative">
      <ImpactAnalysisPanel 
        isOpen={true} 
        onClose={onClose}
        employee={mockEmployee}
        impact={mockImpact}
        organizationId="demo-org-id"
        // Inject mock data to skip loading
        initialReviews={mockReviews}
        initialGoals={mockGoals}
        initialSignals={mockSignals}
        isEmbedded={true}
      />
    </div>
  );
}
