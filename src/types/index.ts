export type HealthStatus = 'Optimal' | 'Monitor' | 'At Risk';

export interface Account {
  id: string;
  name: string;
  initials: string;
  initialsColor: string;
  lead: string;
  leadAvatar?: string;
  status: HealthStatus;
  healthScore: number;
  nextMilestone: string;
  milestoneDue: string;
  arr: string;
  arrValue: number;
  industry: string;
  tier: 'Enterprise' | 'Strategic' | 'Scale';
  activeUsers: number;
  lastContact: string;
  contractRenewal: string;
  summary: string;
}

export type PipelineStage = 'Discovery' | 'Proposal' | 'Negotiation' | 'Contract' | 'Closed Won';

export interface Deal {
  id: string;
  title: string;
  account: string;
  value: number;
  stage: PipelineStage;
  probability: number;
  lead: string;
  daysInStage: number;
  priority: 'High' | 'Medium' | 'Low';
  expectedClose: string;
}

export type ActivityType = 'Meeting' | 'Milestone' | 'Contract' | 'Support' | 'Note';

export interface ActivityItem {
  id: string;
  time: string;
  type: ActivityType;
  title: string;
  description: string;
  account: string;
  author: string;
  impact?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  account: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  tag?: string;
}

export type ActiveTab = 'landing' | 'dashboard' | 'pipeline' | 'analytics';

export interface DemoFormState {
  fullName: string;
  workEmail: string;
  companyName: string;
  teamSize: string;
  preferredDate: string;
  preferredTime: string;
  useCase: string;
}
