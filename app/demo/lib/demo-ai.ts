/**
 * Demo AI Responses - Clean, Short, Conversational
 * 
 * Returns brief, friendly responses - data is shown in the canvas instead
 */

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

export interface DemoResponse {
  message: string;
  canvas: CanvasType;
}

// Backward compatibility - used by demo-chat.tsx
export interface DemoAIResponse {
  message: string;
  canvas?: CanvasType;
  canvasData?: Record<string, unknown>;
  toolCalls?: string[];
  suggestedFollowups?: string[];
}

// Suggested prompts for welcome screen (backward compat)
export const suggestedPrompts = [
  {
    category: 'People',
    icon: '👥',
    prompts: ['Who is at flight risk?', 'Show org chart', 'Find employee directory']
  },
  {
    category: 'Operations',
    icon: '📋',
    prompts: ['Show pending PTO', 'Check expense reports', 'Equipment requests']
  },
  {
    category: 'Insights',
    icon: '📊',
    prompts: ['Show key metrics', 'Team health check', 'Workforce trends']
  }
];

// Pattern matching for demo responses
const patterns: Array<{ match: RegExp | string[]; response: DemoResponse }> = [
  // Flight risk
  {
    match: ['flight risk', 'at risk', 'leaving', 'retention', 'quit', 'resign'],
    response: {
      message: "I've identified 3 employees with elevated flight risk. Take a look at the analysis on the right—I've flagged the key warning signals for each.",
      canvas: 'flight-risk'
    }
  },
  // Org overview
  {
    match: ['org overview', 'organization overview', 'company overview', 'headcount', 'glance'],
    response: {
      message: "Here's your organization snapshot. 52 employees across 5 departments, with an overall health score of 87. Looking strong!",
      canvas: 'org-overview'
    }
  },
  // PTO
  {
    match: ['pto', 'time off', 'vacation', 'leave', 'pending'],
    response: {
      message: "You have 3 PTO requests waiting for approval. I've pulled them up so you can review and take action quickly.",
      canvas: 'pto-requests'
    }
  },
  // Metrics
  {
    match: ['metric', 'kpi', 'performance', 'satisfaction', 'turnover'],
    response: {
      message: "Here are your key HR metrics. Turnover is down 1.5% and employee satisfaction hit 4.2/5—great progress this quarter!",
      canvas: 'metrics'
    }
  },
  // Team health
  {
    match: ['team health', 'health score', 'engagement', 'org health', 'morale'],
    response: {
      message: "Your overall org health score is 87, up 5 points from last month. Platform Team is thriving at 92, but DevOps could use some attention.",
      canvas: 'team-health'
    }
  },
  // Directory
  {
    match: ['directory', 'employee list', 'who works', 'find employee', 'search employee'],
    response: {
      message: "Here's your employee directory. You can search, filter by department, or click on anyone to see their full profile.",
      canvas: 'directory'
    }
  },
  // Org chart
  {
    match: ['org chart', 'reporting', 'structure', 'hierarchy', 'reports to'],
    response: {
      message: "Here's your organization chart. Click on any node to expand the team or view individual profiles.",
      canvas: 'org-chart'
    }
  },
  // Teams
  {
    match: ['teams', 'team overview', 'departments'],
    response: {
      message: "I've pulled up your teams overview. Engineering is your largest team at 24 people, followed by Sales with 10.",
      canvas: 'org-overview'
    }
  },
  // Analytics
  {
    match: ['analytics', 'reports', 'analyze', 'analysis', 'insights'],
    response: {
      message: "Here's your HR analytics dashboard. I've highlighted the trends that need your attention.",
      canvas: 'analytics'
    }
  },
  // Trends
  {
    match: ['trend', 'over time', 'history', 'growth'],
    response: {
      message: "I've charted your workforce trends. Headcount is up 12% YoY and attrition has been steadily declining.",
      canvas: 'trends'
    }
  },
  // Impact
  {
    match: ['impact', 'contribution', 'value'],
    response: {
      message: "Here's your impact overview. Your HR initiatives have saved an estimated $2.3M in retention costs this year.",
      canvas: 'metrics'
    }
  },
  // Settings
  {
    match: ['settings', 'preferences', 'configure'],
    response: {
      message: "Here are your account settings. You can manage notifications, integrations, and team permissions.",
      canvas: 'settings'
    }
  },
  // Expenses
  {
    match: ['expense', 'spending', 'budget', 'cost'],
    response: {
      message: "I've pulled up expense reports. Total spend this month is $48,200, with most going to benefits and payroll.",
      canvas: 'metrics'
    }
  },
  // Equipment
  {
    match: ['equipment', 'laptop', 'hardware', 'asset'],
    response: {
      message: "You have 2 pending equipment requests. Sarah needs a new monitor and Marcus requested a standing desk.",
      canvas: 'pto-requests'
    }
  },
  // Help
  {
    match: ['help', 'what can you do', 'capabilities', 'how do'],
    response: {
      message: "I can help you with:\n• Finding employees and org info\n• Reviewing PTO & expense requests\n• Analyzing team health and flight risk\n• Tracking metrics and trends\n• Managing settings and integrations\n\nJust ask naturally!",
      canvas: 'help'
    }
  },
  // Home
  {
    match: ['home', 'dashboard', 'main'],
    response: {
      message: "Welcome back! Your organization is healthy at 87. You have 3 pending PTO requests and 2 employees that might need a check-in.",
      canvas: 'org-overview'
    }
  }
];

// Employee-specific responses for deep dives
const employeeResponses: Record<string, DemoAIResponse> = {
  'sebastian': {
    message: "Sebastian joined just 7 days ago and is ramping up quickly. He's already reviewed 3 PRs and attended his first team sync. Engagement is at 72%—healthy for a new joiner. No concerns yet, but I'll flag anything if patterns change.",
    canvas: 'directory',
    toolCalls: ['analyze_employee_signals', 'check_onboarding_progress'],
    suggestedFollowups: ['Schedule a 30-day check-in', 'Show his team'],
  },
  'emily': {
    message: "⚠️ Emily Kim is showing signs of disengagement. Her commits dropped 40% this month, she's skipped two 1:1s, and updated her LinkedIn last week. Total impact: $842,000/year. I'd recommend scheduling a retention conversation soon.",
    canvas: 'impact',
    toolCalls: ['analyze_flight_risk', 'calculate_impact', 'scan_linkedin_activity'],
    suggestedFollowups: ['Schedule 1:1 with Emily', 'Review her comp'],
  },
  'gary': {
    message: "Gary Tan is thriving—92 PPI score with 88% engagement. He's been here 5 years and is a key culture carrier. Zero flight risk signals. Recently started mentoring 2 new hires.",
    canvas: 'directory',
    toolCalls: ['analyze_employee_signals', 'check_mentorship_impact'],
    suggestedFollowups: ['Show his impact', 'Check his team'],
  },
  'michael': {
    message: "Michael Seibel has an 89 PPI score and has been a high performer for 8 years. He leads the YC batch program and directly influences 50+ portfolio companies per batch. Flight risk: very low.",
    canvas: 'directory',
    toolCalls: ['analyze_employee_signals', 'check_leadership_metrics'],
    suggestedFollowups: ['Show his team', 'Check impact'],
  },
};

// Tool calls for different query types
const toolCallMap: Record<string, string[]> = {
  'flight-risk': ['scan_behavioral_signals', 'analyze_engagement_trends', 'check_linkedin_activity'],
  'org-overview': ['aggregate_headcount', 'calculate_health_scores'],
  'pto-requests': ['fetch_pending_requests', 'check_team_coverage'],
  'metrics': ['aggregate_hr_metrics', 'calculate_trends'],
  'team-health': ['analyze_team_sentiment', 'aggregate_health_scores'],
  'directory': ['fetch_employee_list', 'check_active_status'],
  'analytics': ['run_workforce_analytics', 'generate_insights'],
  'impact': ['calculate_employee_impact', 'analyze_flight_risk', 'fetch_performance_data'],
};

export function matchDemoResponse(query: string): DemoAIResponse {
  const q = query.toLowerCase().trim();
  
  // Check for employee-specific queries first
  const employeeNames = Object.keys(employeeResponses);
  for (const name of employeeNames) {
    if (q.includes(name) || q.includes(`about ${name}`) || q.includes(`tell me about ${name}`)) {
      return employeeResponses[name];
    }
  }
  
  // Pattern matching
  for (const pattern of patterns) {
    if (Array.isArray(pattern.match)) {
      if (pattern.match.some(keyword => q.includes(keyword))) {
        const canvasType = pattern.response.canvas;
        return {
          ...pattern.response,
          toolCalls: toolCallMap[canvasType] || [],
          suggestedFollowups: getContextualFollowups(canvasType),
        };
      }
    } else if (pattern.match.test(q)) {
      const canvasType = pattern.response.canvas;
      return {
        ...pattern.response,
        toolCalls: toolCallMap[canvasType] || [],
        suggestedFollowups: getContextualFollowups(canvasType),
      };
    }
  }
  
  // Default response - still show a canvas
  return {
    message: "I've pulled up some relevant information for you. Let me know if you need anything specific!",
    canvas: 'org-overview',
    toolCalls: ['aggregate_org_data'],
    suggestedFollowups: ['Show org overview', 'Check team health'],
  };
}

// Context-aware follow-ups
function getContextualFollowups(canvas: CanvasType): string[] {
  const followups: Record<string, string[]> = {
    'flight-risk': ['Schedule check-ins', 'Review compensation', 'Show trends'],
    'org-overview': ['Show by department', 'Check hiring pipeline', 'View analytics'],
    'pto-requests': ['Approve all', 'Check coverage', 'Show calendar'],
    'metrics': ['Compare to last quarter', 'Show breakdown', 'Export report'],
    'team-health': ['Find low scorers', 'Schedule pulse survey', 'View trends'],
    'directory': ['Filter by department', 'Show org chart', 'Find someone'],
    'analytics': ['Show YoY comparison', 'Drill into attrition', 'Export data'],
    'settings': ['Manage integrations', 'Update notifications', 'View audit log'],
    'help': ['Show examples', 'What can you do?', 'Get started'],
    'impact': ['Show flight risk factors', 'Review compensation', 'Schedule 1:1'],
  };
  return followups[canvas] || ['Tell me more', 'Show details'];
}

// Proactive insights for the welcome screen
export const proactiveInsights = [
  {
    id: 'emily-risk',
    type: 'warning' as const,
    icon: '⚠️',
    title: 'Emily Kim needs attention',
    description: "Her engagement dropped 15% after three cancelled 1:1s.",
    action: 'Schedule a check-in',
    query: 'Tell me about Emily',
  },
  {
    id: 'linkedin-alert',
    type: 'alert' as const,
    icon: '🔔',
    title: '3 engineers updated LinkedIn',
    description: "Unusual activity for Platform Team this month.",
    action: 'Review flight risks',
    query: 'Who is at flight risk?',
  },
  {
    id: 'dei-win',
    type: 'success' as const,
    icon: '🎉',
    title: 'DEI hiring improved 12%',
    description: "Great progress on diversity goals this quarter!",
    action: 'See breakdown',
    query: 'Show me key metrics',
  },
];
