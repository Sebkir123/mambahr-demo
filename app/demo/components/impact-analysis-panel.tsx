'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed Supabase client import for demo-lite
// Removed ManagerImpactForm import

import {
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Zap,
  Crown,
  Star,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Briefcase,
  MessageSquare,
  GitBranch,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Brain,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ImpactAnalysisPanelProps {
  isOpen: boolean;
  onClose: () => void;
  employee: {
    id: string;
    name: string;
    title: string;
    avatar?: string;
    department?: string;
    tenure?: number;
    email?: string;
    salary?: number;
  };
  impact: {
    totalValue: number;
    valueChange: number;
    revenueGenerated: number;
    costSavings: number;
    teamLift: number;
    productivityScore: number;
    strategicScore: number;
    trend: 'up' | 'down' | 'stable';
    rankPercentile: number;
    monthlyData: number[];
    flightRisk?: 'high' | 'medium' | 'low';
    criticalityLevel?: 'irreplaceable' | 'essential' | 'important' | 'standard';
    replacementCost?: number;
    keyContributions?: string[];
    confidenceLevel?: number;
  };
  organizationId: string;
  canEdit?: boolean;
  // Optional pre-loaded data for demo/preview
  initialReviews?: PerformanceReview[];
  initialGoals?: Goal[];
  initialSignals?: WorkSignalStats[];
  isEmbedded?: boolean;
}

interface PerformanceReview {
  id: string;
  review_cycle: string;
  overall_rating: number;
  performance_rating: number;
  potential_rating: number;
  strengths: string;
  areas_for_improvement: string;
  review_period_end: string;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  status: string;
  target_date: string;
}

interface WorkSignalStats {
  provider: string;
  count: number;
  lastActivity: string;
}

export function ImpactAnalysisPanel({
  isOpen,
  onClose,
  employee,
  impact,
  organizationId,
  canEdit = false,
  initialReviews,
  initialGoals,
  initialSignals,
  isEmbedded = false,
}: ImpactAnalysisPanelProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [reviews, setReviews] = useState<PerformanceReview[]>(initialReviews || []);
  const [goals, setGoals] = useState<Goal[]>(initialGoals || []);
  const [workSignals, setWorkSignals] = useState<WorkSignalStats[]>(initialSignals || []);
  const [aiNarrative, setAiNarrative] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary', 'breakdown']));

  useEffect(() => {
    if (isOpen) {
      // Always rely on initial props for demo-lite
        setLoading(true);
        setTimeout(() => {
          generateNarrative(); 
          setLoading(false);
        }, 800);
    }
  }, [isOpen, employee.id]);

  const generateNarrative = () => {
    setAiNarrative(
      `${employee.name} is a high-performing ${employee.title} who consistently delivers above expectations. ` +
      `With a ${impact.productivityScore}/100 productivity score and ${impact.strategicScore}/100 strategic impact, ` +
      `they represent exceptional value to the organization. Their ${impact.teamLift}x team multiplier indicates ` +
      `strong collaborative skills that amplify team output. ${impact.flightRisk === 'high' ? 
      'However, flight risk indicators suggest immediate attention to retention strategies may be warranted.' : 
      'Current engagement levels appear healthy.'}`
    );
  };

  // Removed loadDetailedData as it required backend

  const toggleSection = (section: string) => {
    const updated = new Set(expandedSections);
    if (updated.has(section)) {
      updated.delete(section);
    } else {
      updated.add(section);
    }
    setExpandedSections(updated);
  };

  const formatCurrency = (value: number): string => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const SectionHeader = ({ 
    title, 
    icon: Icon, 
    section,
    badge,
  }: { 
    title: string; 
    icon: React.ElementType; 
    section: string;
    badge?: string;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800/70 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-surface flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary-muted" />
        </div>
        <span className="font-semibold text-white">{title}</span>
        {badge && (
          <span className="px-2 py-0.5 text-xs bg-primary-surface text-primary-muted rounded-full">
            {badge}
          </span>
        )}
      </div>
      {expandedSections.has(section) ? (
        <ChevronUp className="w-5 h-5 text-zinc-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-zinc-500" />
      )}
    </button>
  );

  const renderPanelContent = () => (
    <div className="flex flex-col h-full w-full bg-zinc-900">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-zinc-800 bg-gradient-to-r from-primary/10 to-primary-active/10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary-hover to-fuchsia-500 p-[2px]">
                <div className="w-full h-full rounded-[14px] bg-zinc-900 flex items-center justify-center overflow-hidden">
                  {employee.avatar ? (
                    <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
              </div>
              {impact.rankPercentile <= 10 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Crown className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{employee.name}</h2>
              <p className="text-zinc-400">{employee.title}</p>
              {employee.department && (
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs bg-zinc-800 text-zinc-400 rounded-full">
                  {employee.department}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`#`}
              onClick={(e) => e.preventDefault()}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-default"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            {!isEmbedded && (
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div id="tour-metrics" className="grid grid-cols-4 gap-3 mt-6">
          <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
            <div className="text-2xl font-bold text-white">{formatCurrency(impact.totalValue)}</div>
            <div className="text-xs text-zinc-500">Total Value</div>
          </div>
          <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
            <div className="text-2xl font-bold text-white">Top {impact.rankPercentile}%</div>
            <div className="text-xs text-zinc-500">Rank</div>
          </div>
          <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
            <div className="text-2xl font-bold text-white">{impact.productivityScore}</div>
            <div className="text-xs text-zinc-500">Productivity</div>
          </div>
          <div className="text-center p-3 bg-zinc-800/50 rounded-xl">
            <div className={`text-2xl font-bold ${
              impact.flightRisk === 'high' ? 'text-red-400' :
              impact.flightRisk === 'medium' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {impact.flightRisk?.charAt(0).toUpperCase()}{impact.flightRisk?.slice(1) || 'Low'}
            </div>
            <div className="text-xs text-zinc-500">Flight Risk</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {loading ? (
           <div className="space-y-4">
             {/* Skeleton with ID for fallback targeting */}
             <div id="tour-metrics" className="grid grid-cols-4 gap-3">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="animate-pulse bg-zinc-800/50 h-24 rounded-xl" />
               ))}
             </div>
             <div className="animate-pulse bg-zinc-800/50 h-32 rounded-xl" />
           </div>
        ) : (
          <>
            {/* AI Summary */}
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary-hover/10 border border-primary-border rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-primary-muted" />
                <span className="font-semibold text-white">AI Analysis</span>
                <span className="px-2 py-0.5 text-xs bg-primary-surface text-primary-muted rounded-full">
                  {impact.confidenceLevel || 75}% confidence
                </span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{aiNarrative}</p>
            </div>

            {/* Value Breakdown */}
            <div id="tour-breakdown">
              <SectionHeader title="Value Breakdown" icon={PieChart} section="breakdown" />
              <AnimatePresence>
                {expandedSections.has('breakdown') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      {/* Revenue */}
                      <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-emerald-400" />
                          <div>
                            <div className="text-sm text-zinc-400">Revenue Generated</div>
                            <div className="text-lg font-bold text-white">{formatCurrency(impact.revenueGenerated)}</div>
                          </div>
                        </div>
                        <div className="text-sm text-emerald-400">Direct attribution</div>
                      </div>

                      {/* Cost Savings */}
                      <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <TrendingDown className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="text-sm text-zinc-400">Cost Savings</div>
                            <div className="text-lg font-bold text-white">{formatCurrency(impact.costSavings)}</div>
                          </div>
                        </div>
                        <div className="text-sm text-blue-400">Process optimization</div>
                      </div>

                      {/* Team Value */}
                      <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-primary-muted" />
                          <div>
                            <div className="text-sm text-zinc-400">Team Multiplier</div>
                            <div className="text-lg font-bold text-white">{impact.teamLift}x</div>
                          </div>
                        </div>
                        <div className="text-sm text-primary-muted">Lifts team output</div>
                      </div>
                      
                      {/* Replacement Cost */}
                      {impact.replacementCost && (
                        <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                            <div>
                              <div className="text-sm text-zinc-400">Replacement Cost</div>
                              <div className="text-lg font-bold text-white">{formatCurrency(impact.replacementCost)}</div>
                            </div>
                          </div>
                          <div className="text-sm text-red-400">Estimated</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Performance History */}
            <div id="tour-reviews">
              <SectionHeader 
                title="Performance Reviews" 
                icon={BarChart3} 
                section="performance"
                badge={`${reviews.length} reviews`}
              />
              <AnimatePresence>
                {expandedSections.has('performance') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      {reviews.length === 0 ? (
                        <p className="text-sm text-zinc-500 text-center py-4">No performance reviews yet</p>
                      ) : (
                        reviews.map((review) => (
                          <div key={review.id} className="p-3 bg-zinc-800/30 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-white">{review.review_cycle}</span>
                              <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= (review.overall_rating || 0)
                                        ? 'text-amber-400 fill-amber-400'
                                        : 'text-zinc-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            {review.strengths && (
                              <p className="text-xs text-zinc-400 line-clamp-2">{review.strengths}</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Goals */}
            <div id="tour-goals">
              <SectionHeader 
                title="Goals & OKRs" 
                icon={Target} 
                section="goals"
                badge={`${goals.filter(g => g.status === 'completed').length}/${goals.length} complete`}
              />
              <AnimatePresence>
                {expandedSections.has('goals') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      {goals.length === 0 ? (
                        <p className="text-sm text-zinc-500 text-center py-4">No goals set</p>
                      ) : (
                        goals.map((goal) => (
                          <div key={goal.id} className="p-3 bg-zinc-800/30 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-sm font-medium text-white">{goal.title}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                goal.status === 'completed' 
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              }`}>
                                {goal.status === 'completed' ? '✓ Complete' : 'In Progress'}
                              </span>
                            </div>
                            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${goal.progress}%` }}
                              />
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">{goal.progress}% complete</div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Work Tool Activity */}
            <div>
              <SectionHeader 
                title="Work Tool Activity" 
                icon={Zap} 
                section="activity"
                badge={`${workSignals.length} sources`}
              />
              <AnimatePresence>
                {expandedSections.has('activity') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      {workSignals.length === 0 ? (
                        <p className="text-sm text-zinc-500 text-center py-4">No work tool data connected</p>
                      ) : (
                        workSignals.map((signal, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary-surface flex items-center justify-center">
                                {signal.provider === 'GitHub' && <GitBranch className="w-4 h-4 text-primary-muted" />}
                                {signal.provider === 'Jira' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                                {signal.provider === 'Salesforce' && <DollarSign className="w-4 h-4 text-emerald-400" />}
                                {signal.provider === 'Slack' && <MessageSquare className="w-4 h-4 text-primary-muted" />}
                                {signal.provider === 'Meetings' && <Calendar className="w-4 h-4 text-amber-400" />}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{signal.provider}</div>
                                <div className="text-xs text-zinc-500">{signal.lastActivity}</div>
                              </div>
                            </div>
                            <div className="text-lg font-bold text-white">{signal.count}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Key Contributions */}
            {impact.keyContributions && impact.keyContributions.length > 0 && (
              <div>
                <SectionHeader title="Key Contributions" icon={Award} section="contributions" />
                <AnimatePresence>
                  {expandedSections.has('contributions') && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-2">
                        {impact.keyContributions.map((contribution, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-zinc-300">{contribution}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-zinc-800 bg-zinc-900/95">
        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            {!isEmbedded && (
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Close
              </button>
            )}
            <a
              href={`#`}
              onClick={(e) => e.preventDefault()}
              className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-hover transition-colors cursor-default"
            >
              View Full Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (isEmbedded) {
    return renderPanelContent();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-zinc-900 border-l border-zinc-800 z-50 overflow-hidden flex flex-col"
          >
            {renderPanelContent()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
