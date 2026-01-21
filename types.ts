
export interface Member {
  id: string;
  name: string;
  age: number;
  email: string;
  status: 'Active' | 'At-Risk' | 'Inactive';
  lastActivity: string;
  metrics: {
    avgSteps: number;
    heartRate: number;
    sleepHours: number;
    stressLevel: number;
  };
  avatar: string;
}

export interface CommunityStats {
  totalMembers: number;
  activeParticipation: number;
  avgEngagementScore: number;
  topConditionConcern: string;
}

export interface HealthTrend {
  date: string;
  steps: number;
  sleep: number;
  engagement: number;
}
