
import React, { useState } from 'react';
import { Member } from '../types';
import { generateMemberTip } from '../services/geminiService';

interface MembersProps {
  members: Member[];
}

const Members: React.FC<MembersProps> = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);

  const handleGetTip = async (member: Member) => {
    setLoadingTip(true);
    setAiTip(null);
    try {
      const tip = await generateMemberTip(member);
      setAiTip(tip);
    } catch (e) {
      console.error(e);
      setAiTip("Could not generate a tip at this moment.");
    } finally {
      setLoadingTip(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Community Members</h3>
            <div className="flex space-x-2">
              <input type="text" placeholder="Search members..." className="text-sm border-gray-200 rounded-lg" />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">Add New</button>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {members.map(member => (
              <div 
                key={member.id} 
                onClick={() => { setSelectedMember(member); setAiTip(null); }}
                className={`p-6 flex items-center cursor-pointer transition-all ${selectedMember?.id === member.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'hover:bg-gray-50'}`}
              >
                <img src={member.avatar} alt="" className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{member.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      member.status === 'At-Risk' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {selectedMember ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
            <div className="text-center mb-6">
              <img src={selectedMember.avatar} alt="" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-emerald-50 shadow-sm" />
              <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
              <p className="text-gray-500">{selectedMember.age} years old • {selectedMember.status}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Steps</p>
                <p className="text-lg font-bold text-gray-800">{selectedMember.metrics.avgSteps}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Sleep</p>
                <p className="text-lg font-bold text-gray-800">{selectedMember.metrics.sleepHours}h</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Stress</p>
                <p className="text-lg font-bold text-gray-800">{selectedMember.metrics.stressLevel}/10</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">Heart</p>
                <p className="text-lg font-bold text-gray-800">{selectedMember.metrics.heartRate} bpm</p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => handleGetTip(selectedMember)}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                disabled={loadingTip}
              >
                {loadingTip ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>Generate AI Care Tip</span>
                  </>
                )}
              </button>

              {aiTip && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-sm text-emerald-900 leading-relaxed italic">"{aiTip}"</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <p>Select a member to view their profile and get AI insights.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
