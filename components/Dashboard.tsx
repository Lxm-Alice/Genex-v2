
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CommunityStats, HealthTrend, Member } from '../types';

interface DashboardProps {
  stats: CommunityStats;
  trends: HealthTrend[];
  members: Member[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats, trends, members }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Members" value={stats.totalMembers} trend="+4.5%" color="bg-blue-500" />
        <StatCard title="Active Members" value={stats.activeParticipation} trend="+12.1%" color="bg-emerald-500" />
        <StatCard title="Engagement Score" value={`${stats.avgEngagementScore}%`} trend="-2.4%" color="bg-amber-500" />
        <StatCard title="Top Interest" value={stats.topConditionConcern} trend="New" color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Community Engagement Trend</h3>
            <select className="text-sm bg-gray-50 border-gray-200 rounded-lg focus:ring-emerald-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="engagement" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEngagement)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Status Distribution</h3>
          <div className="space-y-4">
             {['Active', 'At-Risk', 'Inactive'].map(status => {
                const count = members.filter(m => m.status === status).length;
                const percentage = (count / members.length) * 100;
                return (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-600">{status}</span>
                      <span className="text-gray-400">{count} members</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${status === 'Active' ? 'bg-emerald-500' : status === 'At-Risk' ? 'bg-red-400' : 'bg-gray-400'}`} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
             })}
          </div>
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl">
             <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">Quick Tip</p>
             <p className="text-sm text-emerald-900 leading-relaxed">
               Engage your At-Risk members with a personalized 'Sleep Wellness' newsletter this week.
             </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="pb-4 font-medium">Member</th>
                <th className="pb-4 font-medium">Daily Steps</th>
                <th className="pb-4 font-medium">Stress Level</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {members.slice(0, 4).map(member => (
                <tr key={member.id} className="border-t border-gray-50 group hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <img src={member.avatar} alt="" className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-semibold text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.lastActivity}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">{member.metrics.avgSteps.toLocaleString()}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`h-1.5 w-4 rounded-full ${i <= member.metrics.stressLevel ? 'bg-red-400' : 'bg-gray-100'}`}></div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      member.status === 'At-Risk' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{title: string, value: any, trend: string, color: string}> = ({ title, value, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
      </div>
      <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-600' : trend === 'New' ? 'text-blue-600' : 'text-red-600'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

export default Dashboard;
