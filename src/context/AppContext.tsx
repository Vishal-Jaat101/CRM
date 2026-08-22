import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Account, Deal, ActivityItem, TaskItem, ActiveTab, PipelineStage } from '../types';

interface AppContextType {
  activeView: ActiveTab;
  setActiveView: (view: ActiveTab) => void;
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account | null) => void;
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  updateDealStage: (dealId: string, newStage: PipelineStage) => void;
  deleteDeal: (dealId: string) => void;
  activities: ActivityItem[];
  addActivity: (activity: Omit<ActivityItem, 'id'>) => void;
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  isNewAccountModalOpen: boolean;
  setIsNewAccountModalOpen: (open: boolean) => void;
  isNewDealModalOpen: boolean;
  setIsNewDealModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const initialAccounts: Account[] = [
  {
    id: 'acc-1',
    name: 'Global Tech',
    initials: 'GT',
    initialsColor: 'from-blue-600 to-indigo-600',
    lead: 'Sarah Jenkins',
    status: 'Optimal',
    healthScore: 96,
    nextMilestone: 'Q3 Review (In 2 days)',
    milestoneDue: 'In 2 days',
    arr: '$1.4M',
    arrValue: 1400000,
    industry: 'Enterprise Software',
    tier: 'Strategic',
    activeUsers: 840,
    lastContact: 'Today at 10:30 AM',
    contractRenewal: 'Nov 2026',
    summary: 'High satisfaction with current API endpoints. CTO approved expanding from 500 to 1,200 seats for Q4 rollout.'
  },
  {
    id: 'acc-2',
    name: 'Innovate Inc.',
    initials: 'IN',
    initialsColor: 'from-purple-600 to-pink-600',
    lead: 'Michael Chang',
    status: 'Monitor',
    healthScore: 78,
    nextMilestone: 'Support Escalation',
    milestoneDue: 'Today',
    arr: '$850K',
    arrValue: 850000,
    industry: 'FinTech',
    tier: 'Enterprise',
    activeUsers: 420,
    lastContact: 'Yesterday at 3:15 PM',
    contractRenewal: 'Jan 2027',
    summary: 'Encountered latency on custom webhook sync. Engineering patch deployed; customer success scheduled follow-up.'
  },
  {
    id: 'acc-3',
    name: 'Nexus Partners',
    initials: 'NX',
    initialsColor: 'from-amber-500 to-orange-600',
    lead: 'Alex Rivera',
    status: 'Optimal',
    healthScore: 94,
    nextMilestone: 'Renewal Kickoff',
    milestoneDue: 'Next Week',
    arr: '$1.8M',
    arrValue: 1800000,
    industry: 'Cloud Infrastructure',
    tier: 'Strategic',
    activeUsers: 1100,
    lastContact: 'Yesterday at 2:15 PM',
    contractRenewal: 'Dec 2026',
    summary: 'Successfully renewed 3-year enterprise agreement with +$120k ARR expansion. Legal approved SLA addendum.'
  },
  {
    id: 'acc-4',
    name: 'Apex Dynamics',
    initials: 'AD',
    initialsColor: 'from-emerald-500 to-teal-700',
    lead: 'Elena Rostova',
    status: 'Optimal',
    healthScore: 91,
    nextMilestone: 'Expansion Demo',
    milestoneDue: 'In 4 days',
    arr: '$620K',
    arrValue: 620000,
    industry: 'Logistics Automation',
    tier: 'Scale',
    activeUsers: 310,
    lastContact: '3 days ago',
    contractRenewal: 'Mar 2027',
    summary: 'Evaluating automated workflow modules for their European fulfillment operations.'
  },
  {
    id: 'acc-5',
    name: 'Quantum Systems',
    initials: 'QS',
    initialsColor: 'from-rose-500 to-red-700',
    lead: 'David Vance',
    status: 'At Risk',
    healthScore: 62,
    nextMilestone: 'Exec Alignment Sync',
    milestoneDue: 'Tomorrow',
    arr: '$940K',
    arrValue: 940000,
    industry: 'Cybersecurity',
    tier: 'Enterprise',
    activeUsers: 560,
    lastContact: '5 days ago',
    contractRenewal: 'Next Month',
    summary: 'Leadership change in procurement team created renewal friction. Executive sponsor meeting requested.'
  },
  {
    id: 'acc-6',
    name: 'Helios Energy',
    initials: 'HE',
    initialsColor: 'from-cyan-500 to-blue-700',
    lead: 'Maya Patel',
    status: 'Optimal',
    healthScore: 98,
    nextMilestone: 'Security Audit Sign-off',
    milestoneDue: 'In 6 days',
    arr: '$2.1M',
    arrValue: 2100000,
    industry: 'Renewable Power',
    tier: 'Strategic',
    activeUsers: 1450,
    lastContact: 'Yesterday at 9:00 AM',
    contractRenewal: 'Aug 2027',
    summary: 'Enterprise reference customer. Deployed Nexus CRM across 14 regional offices with 99.99% uptime.'
  }
];

const initialDeals: Deal[] = [
  {
    id: 'deal-1',
    title: 'Global Tech Q4 Expansion',
    account: 'Global Tech',
    value: 240000,
    stage: 'Negotiation',
    probability: 85,
    lead: 'Sarah Jenkins',
    daysInStage: 4,
    priority: 'High',
    expectedClose: 'Oct 15, 2026'
  },
  {
    id: 'deal-2',
    title: 'Innovate Security Add-on',
    account: 'Innovate Inc.',
    value: 65000,
    stage: 'Proposal',
    probability: 60,
    lead: 'Michael Chang',
    daysInStage: 9,
    priority: 'Medium',
    expectedClose: 'Nov 01, 2026'
  },
  {
    id: 'deal-3',
    title: 'Nexus Multi-region Cluster',
    account: 'Nexus Partners',
    value: 380000,
    stage: 'Contract',
    probability: 95,
    lead: 'Alex Rivera',
    daysInStage: 2,
    priority: 'High',
    expectedClose: 'Sep 30, 2026'
  },
  {
    id: 'deal-4',
    title: 'Apex Global Rollout',
    account: 'Apex Dynamics',
    value: 180000,
    stage: 'Discovery',
    probability: 40,
    lead: 'Elena Rostova',
    daysInStage: 12,
    priority: 'Medium',
    expectedClose: 'Dec 15, 2026'
  },
  {
    id: 'deal-5',
    title: 'Quantum Tier-1 Renewal',
    account: 'Quantum Systems',
    value: 420000,
    stage: 'Negotiation',
    probability: 70,
    lead: 'David Vance',
    daysInStage: 6,
    priority: 'High',
    expectedClose: 'Oct 30, 2026'
  },
  {
    id: 'deal-6',
    title: 'Helios AI Copilot Seat Pack',
    account: 'Helios Energy',
    value: 150000,
    stage: 'Closed Won',
    probability: 100,
    lead: 'Maya Patel',
    daysInStage: 1,
    priority: 'High',
    expectedClose: 'Sep 10, 2026'
  },
  {
    id: 'deal-7',
    title: 'Vanguard API Integration',
    account: 'Vanguard Systems',
    value: 95000,
    stage: 'Proposal',
    probability: 55,
    lead: 'Sarah Jenkins',
    daysInStage: 8,
    priority: 'Low',
    expectedClose: 'Nov 20, 2026'
  }
];

const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    time: 'Today, 10:30 AM',
    type: 'Meeting',
    title: 'Executive Alignment Sync',
    description: 'Global Tech CTO confirmed strategic alignment for Q4 rollout. Next steps assigned to integration team.',
    account: 'Global Tech',
    author: 'Sarah Jenkins',
    impact: 'Strategic Expansion'
  },
  {
    id: 'act-2',
    time: 'Yesterday, 14:15 PM',
    type: 'Milestone',
    title: 'Contract Renewal Executed',
    description: 'Nexus Partners successfully renewed 3-year enterprise agreement. +$120k ARR increase.',
    account: 'Nexus Partners',
    author: 'Alex Rivera',
    impact: '+$120K ARR'
  },
  {
    id: 'act-3',
    time: 'Yesterday, 09:00 AM',
    type: 'Meeting',
    title: 'Security Audit & Compliance Sign-off',
    description: 'Helios Energy completed SOC2 Type II and ISO27001 validation for EU cloud partition.',
    account: 'Helios Energy',
    author: 'Maya Patel',
    impact: 'Compliance Passed'
  },
  {
    id: 'act-4',
    time: '2 days ago, 16:45 PM',
    type: 'Support',
    title: 'Webhook Sync SLA Resolved',
    description: 'Innovate Inc. data sync optimization patch confirmed by their lead systems architect.',
    account: 'Innovate Inc.',
    author: 'Michael Chang',
    impact: 'Status Improved'
  }
];

const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Quarterly Review due',
    account: 'Global Tech',
    dueDate: 'In 2 days',
    priority: 'High',
    completed: false,
    tag: 'Executive'
  },
  {
    id: 'task-2',
    title: 'Follow up on support ticket',
    account: 'Innovate Inc.',
    dueDate: 'Today',
    priority: 'High',
    completed: false,
    tag: 'Urgent'
  },
  {
    id: 'task-3',
    title: 'Approve custom SLA terms',
    account: 'Nexus Partners',
    dueDate: 'In 3 days',
    priority: 'Medium',
    completed: false,
    tag: 'Legal'
  },
  {
    id: 'task-4',
    title: 'Send automated security whitepaper',
    account: 'Apex Dynamics',
    dueDate: 'In 5 days',
    priority: 'Low',
    completed: true,
    tag: 'Marketing'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveTab>('landing');
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addAccount = (accountData: Omit<Account, 'id'>) => {
    const newId = `acc-${Date.now()}`;
    const newAccount: Account = { ...accountData, id: newId };
    setAccounts((prev) => [newAccount, ...prev]);
    showToast(`Account "${newAccount.name}" created successfully.`);
  };

  const updateAccount = (id: string, updates: Partial<Account>) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, ...updates } : acc))
    );
    if (selectedAccount?.id === id) {
      setSelectedAccount((prev) => (prev ? { ...prev, ...updates } : null));
    }
    showToast('Account details updated.');
  };

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    if (selectedAccount?.id === id) {
      setSelectedAccount(null);
    }
    showToast('Account deleted.');
  };

  const addDeal = (dealData: Omit<Deal, 'id'>) => {
    const newId = `deal-${Date.now()}`;
    const newDeal: Deal = { ...dealData, id: newId };
    setDeals((prev) => [newDeal, ...prev]);
    showToast(`Deal "${newDeal.title}" added to pipeline.`);
  };

  const updateDealStage = (dealId: string, newStage: PipelineStage) => {
    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              stage: newStage,
              probability:
                newStage === 'Closed Won'
                  ? 100
                  : newStage === 'Contract'
                  ? 90
                  : newStage === 'Negotiation'
                  ? 75
                  : newStage === 'Proposal'
                  ? 50
                  : 30
            }
          : deal
      )
    );
    showToast(`Deal moved to ${newStage}.`);
  };

  const deleteDeal = (dealId: string) => {
    setDeals((prev) => prev.filter((deal) => deal.id !== dealId));
    showToast('Deal removed from pipeline.');
  };

  const addActivity = (activityData: Omit<ActivityItem, 'id'>) => {
    const newActivity: ActivityItem = { ...activityData, id: `act-${Date.now()}` };
    setActivities((prev) => [newActivity, ...prev]);
    showToast('New activity logged.');
  };

  const addTask = (taskData: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = { ...taskData, id: `task-${Date.now()}` };
    setTasks((prev) => [newTask, ...prev]);
    showToast('Task added.');
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        accounts,
        addAccount,
        updateAccount,
        deleteAccount,
        selectedAccount,
        setSelectedAccount,
        deals,
        addDeal,
        updateDealStage,
        deleteDeal,
        activities,
        addActivity,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        isDemoModalOpen,
        setIsDemoModalOpen,
        isNewAccountModalOpen,
        setIsNewAccountModalOpen,
        isNewDealModalOpen,
        setIsNewDealModalOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
