
import React, { useState, useEffect } from 'react';
import { Member, CommunityStats, HealthTrend } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Insights from './components/Insights';

const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    age: 34,
    email: 'sarah.j@example.com',
    status: 'Active',
    lastActivity: '2 hours ago',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    metrics: { avgSteps: 8500, heartRate: 72, sleepHours: 7.5, stressLevel: 3 }
  },
  {
    id: '2',
    name: 'Marcus Chen',
    age: 42,
    email: 'm.chen@example.com',
    status: 'At-Risk',
    lastActivity: '1 day ago',
    avatar: 'https://picsum.photos/seed/marcus/100/100',
    metrics: { avgSteps: 2100, heartRate: 88, sleepHours: 5.2, stressLevel: 8 }
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    age: 28,
    email: 'elena.r@example.com',
    status: 'Active',
    lastActivity: '15 mins ago',
    avatar: 'https://picsum.photos/seed/elena/100/100',
    metrics: { avgSteps: 12000, heartRate: 65, sleepHours: 8.0, stressLevel: 2 }
  },
  {
    id: '4',
    name: 'David Wilson',
    age: 55,
    email: 'd.wilson@example.com',
    status: 'Inactive',
    lastActivity: '1 week ago',
    avatar: 'https://picsum.photos/seed/david/100/100',
    metrics: { avgSteps: 4500, heartRate: 75, sleepHours: 6.5, stressLevel: 5 }
  },
  {
    id: '5',
    name: 'Amara Okafor',
    age: 31,
    email: 'amara.o@example.com',
    status: 'Active',
    lastActivity: '5 hours ago',
    avatar: 'https://picsum.photos/seed/amara/100/100',
    metrics: { avgSteps: 9800, heartRate: 70, sleepHours: 7.2, stressLevel: 4 }
  }
];

const MOCK_TRENDS: HealthTrend[] = [
  { date: 'Mon', steps: 6000, sleep: 6.5, engagement: 70 },
  { date: 'Tue', steps: 7200, sleep: 7.0, engagement: 75 },
  { date: 'Wed', steps: 8100, sleep: 6.8, engagement: 82 },
  { date: 'Thu', steps: 7800, sleep: 7.2, engagement: 78 },
  { date: 'Fri', steps: 9500, sleep: 7.5, engagement: 88 },
  { date: 'Sat', steps: 11000, sleep: 8.5, engagement: 95 },
  { date: 'Sun', steps: 8500, sleep: 8.0, engagement: 85 },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'insights'>('dashboard');
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats: CommunityStats = {
    totalMembers: members.length,
    activeParticipation: members.filter(m => m.status === 'Active').length,
    avgEngagementScore: 84,
    topConditionConcern: 'Sleep Hygiene'
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <main className="flex-1 overflow-y-auto relative p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === 'dashboard' && 'Monitor your community’s pulse in real-time.'}
              {activeTab === 'members' && 'Manage and support individual community members.'}
              {activeTab === 'insights' && 'AI-driven analytics and wellness predictions.'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
             <button className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
               <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             </button>
             <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">JD</div>
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard stats={stats} trends={MOCK_TRENDS} members={members} />}
        {activeTab === 'members' && <Members members={members} />}
        {activeTab === 'insights' && <Insights members={members} />}
      </main>
    </div>
  );
};

export default App;
