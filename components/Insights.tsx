
import React, { useState } from 'react';
import { Member } from '../types';
import { getCommunityInsights } from '../services/geminiService';

interface InsightsProps {
  members: Member[];
}

const Insights: React.FC<InsightsProps> = ({ members }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    setInsight(null);
    try {
      const data = await getCommunityInsights(members);
      setInsight(data || "No insights found.");
    } catch (e) {
      console.error(e);
      setInsight("Error generating community insights. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">AI Community Strategy</h2>
          <p className="text-emerald-50 opacity-90 mb-8 max-w-xl">
            Leverage Gemini's advanced reasoning to analyze patterns across your health community. 
            Identify silent risks and discover opportunities for positive engagement.
          </p>
          <button 
            onClick={fetchInsights}
            disabled={loading}
            className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                <span>Run Community Analysis</span>
              </>
            )}
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400 opacity-20 rounded-full -ml-10 -mb-10"></div>
      </div>

      {insight ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex items-center space-x-2 mb-6">
             <span className="flex h-3 w-3 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
             </span>
             <h3 className="text-xl font-bold text-gray-900 tracking-tight">AI Generated Strategy Report</h3>
           </div>
           
           <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
             {insight.split('\n').map((line, i) => (
               <p key={i}>{line}</p>
             ))}
           </div>

           <div className="mt-8 pt-8 border-t border-gray-50 flex space-x-4">
              <button className="flex-1 bg-emerald-50 text-emerald-700 font-bold py-3 rounded-xl hover:bg-emerald-100 transition-colors">Export PDF Report</button>
              <button className="flex-1 bg-gray-50 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">Share with Stakeholders</button>
           </div>
        </div>
      ) : !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InsightPreviewCard 
            title="Silent Burnout detection" 
            desc="Gemini analyzes step reduction and sleep irregularity to flag potential burnout before it happens."
            icon={<svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
          />
          <InsightPreviewCard 
            title="Engagement Optimization" 
            desc="Discover which days of the week your community is most receptive to health challenges."
            icon={<svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
          />
        </div>
      )}
    </div>
  );
};

const InsightPreviewCard: React.FC<{title: string, desc: string, icon: React.ReactNode}> = ({ title, desc, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="mb-4">{icon}</div>
    <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default Insights;
