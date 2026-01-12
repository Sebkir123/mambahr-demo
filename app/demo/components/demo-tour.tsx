'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MambaLogo } from '@/components/ui/mamba-logo';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap, Search, Calendar, Sparkles, PieChart, Target, BarChart3, TrendingUp } from 'lucide-react';

interface TourStep {
  targetId?: string;
  title: string;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon?: any;
}

const steps: TourStep[] = [
  {
    title: "Welcome to MambaHR",
    content: (
      <span>
        Let's take a quick tour of your AI-native People OS. This is a 
        <span className="text-white font-semibold"> guided showcase</span>.
      </span>
    ),
    position: 'center',
    icon: MambaLogo
  },
  {
    targetId: 'tour-metrics',
    title: "Real-time Impact",
    content: (
      <div className="space-y-2">
        <p>Instantly see the financial & strategic health of your organization.</p>
        <div className="bg-[#18181b] p-2 rounded border border-[#27272a]">
          <span className="text-xs font-semibold text-[#10B981] block mb-1">EXAMPLE</span>
          <span className="text-xs text-gray-300">Track Top % Talent, Flight Risk, and Productivity Scores in real-time.</span>
        </div>
      </div>
    ),
    position: 'bottom',
    icon: TrendingUp
  },
  {
    targetId: 'tour-insights',
    title: "Proactive Insights",
    content: (
      <div className="space-y-2">
        <p>Mamba automatically surfaces critical issues before you ask.</p>
        <div className="bg-[#18181b] p-2 rounded border border-[#27272a]">
          <span className="text-xs font-semibold text-[#F59E0B] block mb-1">EXAMPLE</span>
          <span className="text-xs text-gray-300">"Emily Kim needs attention" &rarr; One-click "Schedule Check-in"</span>
        </div>
      </div>
    ),
    position: 'top',
    icon: Zap
  },
  {
    targetId: 'tour-breakdown',
    title: "ROI Analysis",
    content: (
      <div className="space-y-2">
        <p>Understand exactly where value is being generated.</p>
        <div className="bg-[#18181b] p-2 rounded border border-[#27272a]">
          <span className="text-xs font-semibold text-[#6366F1] block mb-1">EXAMPLE</span>
          <span className="text-xs text-gray-300">Visualize Revenue Generated vs. Cost Savings per employee.</span>
        </div>
      </div>
    ),
    position: 'left',
    icon: PieChart
  },
  {
    targetId: 'tour-reviews',
    title: "Performance History",
    content: (
      <div className="space-y-2">
        <p>Context-aware history of all performance reviews.</p>
        <div className="bg-[#18181b] p-2 rounded border border-[#27272a]">
          <span className="text-xs font-semibold text-[#8B5CF6] block mb-1">EXAMPLE</span>
          <span className="text-xs text-gray-300">AI summarizes strengths & weaknesses from the last 3 cycles.</span>
        </div>
      </div>
    ),
    position: 'left',
    icon: BarChart3
  },
  {
    targetId: 'tour-goals',
    title: "Goals Alignment",
    content: (
      <div className="space-y-2">
        <p>Keep everyone aligned with company objectives.</p>
        <div className="bg-[#18181b] p-2 rounded border border-[#27272a]">
          <span className="text-xs font-semibold text-[#EC4899] block mb-1">EXAMPLE</span>
          <span className="text-xs text-gray-300">Track OKR progress and link daily tasks to strategic goals.</span>
        </div>
      </div>
    ),
    position: 'left',
    icon: Target
  },
  {
    targetId: 'tour-search',
    title: "Ask Anything",
    content: (
      <div className="space-y-2">
        <p>Use natural language to find answers, people, or data.</p>
        <div className="bg-[#18181b] p-2 rounded border border-[#27272a]">
          <span className="text-xs font-semibold text-[#8B5CF6] block mb-1">EXAMPLE</span>
          <span className="text-xs text-gray-300">"Who is at risk of leaving?" returns a list of employees with engagement scores.</span>
        </div>
      </div>
    ),
    position: 'bottom',
    icon: Search
  },
  {
    targetId: 'tour-your-day',
    title: "Command Center",
    content: (
      <div className="space-y-2">
        <p>Your daily command center for approvals and tasks.</p>
        <div className="bg-[#18181b] p-2 rounded border border-[#27272a]">
           <span className="text-xs font-semibold text-[#10B981] block mb-1">EXAMPLE</span>
           <span className="text-xs text-gray-300">Batch approve 3 PTO requests or review 2 pending expense reports.</span>
        </div>
      </div>
    ),
    position: 'left',
    icon: Calendar
  }
];

export function DemoTour({ onClose, onStepChange }: { onClose: () => void; onStepChange?: (stepIndex: number) => void }) {
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const step = steps[currentStep];
    if (step.targetId) {
      // Small retry loop to handle elements appearing/animating
      let retries = 0;
      const maxRetries = 20; // 2 seconds
      
      const checkElement = () => {
        const el = document.getElementById(step.targetId!);
        if (el) {
          // Scroll into view if needed
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          setTargetRect(el.getBoundingClientRect());
          
          // Keep updating while potentially animating (e.g. panel slide-in)
          if (retries < maxRetries) {
            retries++;
            requestAnimationFrame(checkElement);
          }
        } else if (retries < maxRetries) {
          retries++;
          setTimeout(checkElement, 100);
        } else {
          setTargetRect(null);
        }
      };
      
      checkElement();
    } else {
      setTargetRect(null);
    }
    
    // Notify parent of step change
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      setIsComplete(true);
      setTargetRect(null);
    }
  };

  const handleRestart = () => {
    setIsComplete(false);
    setCurrentStep(0);
  };

  const step = steps[currentStep];

  return (
    <div 
      className="fixed inset-0 z-[99999] pointer-events-auto cursor-default"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onMouseUp={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
    >
      {/* Backdrop - always show when no target is active or when complete */}
      {(!targetRect || isComplete) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
      )}

      {/* Spotlight visual */ }
      {!isComplete && targetRect && (
        <motion.div
          layoutId="spotlight"
          className="absolute border-2 border-[#8B5CF6] rounded-xl"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.8), 0 0 30px rgba(139, 92, 246, 0.4)'
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Completion Card */}
        <AnimatePresence>
          {isComplete && (
             <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pointer-events-auto w-[450px] bg-[#09090b] border border-[#27272a] rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F26522] to-[#8B5CF6]" />
              
              <div className="flex justify-center items-center mb-6">
                 {/* YC Logo */}
                 <div className="w-12 h-12 bg-[#F26522] rounded flex items-center justify-center text-white font-bold text-2xl">Y</div>
              </div>

              <div className="w-16 h-16 rounded-full bg-[#18181b] text-[#8B5CF6] flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Thank you</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                You've seen the highlights of MambaHR. We're happy to show you more of how powerful MambaHR is.
              </p>
              <Button 
                size="lg" 
                onClick={handleRestart}
                className="w-full bg-[#8B5CF6] hover:bg-[#7c3aed] text-white"
              >
                Restart Tour
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Card */}
        <AnimatePresence>
          {!isComplete && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                ...(step.position !== 'center' && targetRect ? {
                  x: step.position === 'left' ? targetRect.left - 340 : 
                     step.position === 'right' ? targetRect.right + 20 :
                     targetRect.left, 
                  y: step.position === 'top' ? targetRect.top - 180 : 
                     step.position === 'bottom' ? targetRect.bottom + 20 :
                     targetRect.top,
                  position: 'fixed',
                  left: 0, 
                  top: 0 
                } : {})
              }}
              className={`pointer-events-auto w-[320px] bg-[#09090b] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden ${step.position === 'center' ? '' : 'absolute'}`}
            >
              {/* Header image/color */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]" />
              
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#18181b] text-[#8B5CF6]">
                    {step.icon === MambaLogo ? <MambaLogo size={20} variant="forDark" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <div className="text-sm text-gray-400 leading-relaxed font-medium">{step.content}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-1">
                    {steps.map((_, i) => (
                      <div 
                        key={i}
                        className={`transition-all duration-300 ${i === currentStep ? 'w-4 bg-[#8B5CF6]' : 'w-1 bg-[#27272a]'} h-1 rounded-full`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={nextStep}
                      className="bg-[#8B5CF6] hover:bg-[#7c3aed] text-white gap-1 pl-4 pr-3"
                    >
                      {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                      <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
