"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard } from '../components/PremiumUI';
import { ShieldCheck, Clock, Layers } from 'lucide-react';

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  const timelineStates = [
    { label: 'Submitted', key: 'Submitted' },
    { label: 'Reviewed', key: 'Reviewed' },
    { label: 'Contacted', key: 'Contacted' },
    { label: 'Discussion', key: 'In Discussion' },
    { label: 'Proposal', key: 'Proposal Sent' },
    { label: 'In Progress', key: 'In Progress' },
    { label: 'Completed', key: 'Completed' },
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    async function loadUserEnquiries() {
      try {
        const res = await apiFetch('/enquiries/me');
        if (res.success && res.data) {
          setEnquiries(res.data);
          if (res.data.length > 0) {
            setSelectedEnquiry(res.data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load user enquiries:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUserEnquiries();
  }, [user]);

  const getActiveTimelineStep = (status) => {
    switch (status) {
      case 'New': return 0;
      case 'Contacted': return 2;
      case 'In Discussion': return 3;
      case 'Proposal Sent': return 4;
      case 'In Progress': return 5;
      case 'Completed': return 6;
      default: return 1;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center font-sans text-gold font-medium animate-pulse">
        CONNECTING USER DASHBOARD...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border border-navy/5 bg-white p-6 mb-8 rounded-lg shadow-premium gap-4 select-none">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-navy/5 text-gold flex items-center justify-center font-bold font-pixel text-xl rounded-full">
            U
          </div>
          <div>
            <h1 className="font-serif text-lg md:text-xl text-navy font-bold uppercase tracking-wider">
              Welcome Back, {user.name}
            </h1>
            <p className="text-xs text-navy/60 font-sans">
              Sector Level: <span className="text-gold uppercase font-semibold">{user.role}</span> | Email ID: {user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs border border-navy/5 p-2 bg-offwhite rounded-md">
          <ShieldCheck className="w-4 h-4 text-sage" />
          <span className="text-[10px] font-sans font-bold uppercase text-navy/50">Session Secure Status: Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-serif text-sm uppercase text-navy font-bold mb-2 tracking-wider border-b border-navy/5 pb-2">My Project Blueprints</h3>

          {enquiries.length === 0 ? (
            <div className="border border-dashed border-navy/10 p-6 bg-white text-center rounded-md">
              <p className="text-xs text-navy/60 font-sans mb-4">No project plans submitted yet.</p>
              <Link to="/enquiry">
                <GoldButton variant="solid" size="sm" className="w-full">
                  Create First Blueprint
                </GoldButton>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <button
                  key={enq._id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`w-full text-left p-4 border rounded-md outline-none select-none transition-all duration-300 shadow-premium flex flex-col justify-between ${
                    selectedEnquiry?._id === enq._id
                      ? 'border-gold bg-gold/5'
                      : 'border-navy/5 bg-white hover:border-navy/20'
                  }`}
                >
                  <div className="flex justify-between items-start w-full mb-2">
                    <span className="font-sans font-bold text-xs text-navy uppercase tracking-wider max-w-[70%] truncate">
                      {enq.projectType}
                    </span>
                    <span className={`text-[8px] font-sans font-bold border px-2 py-0.5 uppercase rounded-sm ${
                      enq.status === 'Completed'
                        ? 'border-sage text-sage'
                        : enq.status === 'Rejected' || enq.status === 'Archived'
                          ? 'border-gray-400 text-gray-400'
                          : 'border-gold text-gold animate-pulse'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-navy/50">
                    Sent: {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-8">
          {selectedEnquiry ? (
            <div className="space-y-6">
              <PremiumCard title={`DEVELOPMENT TRACKER: ${selectedEnquiry.projectType}`}>
                <div className="mb-8 select-none">
                  <h4 className="font-sans font-bold text-[10px] text-gold uppercase mb-6 tracking-widest text-center">
                    BLUEPRINT INTEGRATION PIPELINE
                  </h4>

                  <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto px-4">
                    <div className="absolute top-4 left-4 right-4 h-[2px] bg-navy/10 z-0" />
                    
                    <div
                      className="absolute top-4 left-4 h-[2px] bg-sage z-0 transition-all duration-500"
                      style={{
                        width: `${(getActiveTimelineStep(selectedEnquiry.status) / (timelineStates.length - 1)) * 96}%`,
                      }}
                    />

                    {timelineStates.map((step, idx) => {
                      const isCompleted = idx <= getActiveTimelineStep(selectedEnquiry.status);
                      return (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-sans text-xs transition-all ${
                            isCompleted
                              ? 'border-sage bg-sage text-white font-bold shadow-premium'
                              : 'border-navy/15 bg-white text-navy/40'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className={`text-[9px] font-sans font-bold uppercase mt-2.5 whitespace-nowrap tracking-wider hidden sm:block ${
                            isCompleted ? 'text-sage' : 'text-navy/40'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-navy/5 pt-6 text-xs text-navy/60">
                  <div>
                    <h5 className="font-sans font-bold text-[10px] text-gold uppercase mb-2">INTEGRATION DETAILS</h5>
                    <div className="space-y-2">
                      <div>
                        <span className="text-navy font-medium">Budget Block:</span> {selectedEnquiry.budget}
                      </div>
                      <div>
                        <span className="text-navy font-medium">Time Frame:</span> {selectedEnquiry.timeline}
                      </div>
                      <div>
                        <span className="text-navy font-medium">Preferred Port:</span> {selectedEnquiry.preferredContact}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-sans font-bold text-[10px] text-gold uppercase mb-2">BLUEPRINT SPECIFICATIONS</h5>
                    <p className="leading-relaxed h-20 overflow-y-auto pr-2">
                      {selectedEnquiry.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-navy/5 pt-6">
                  <h5 className="font-sans font-bold text-[10px] text-gold uppercase mb-3">SYSTEM LOG STATEMENTS</h5>
                  <div className="space-y-3 text-xs">
                    {selectedEnquiry.timelineEvents.map((evt, idx) => (
                      <div key={idx} className="border-l-2 border-navy/10 pl-3 py-1 flex items-start justify-between gap-4 bg-offwhite p-2 rounded-sm shadow-premiumInset">
                        <div>
                          <div className="font-bold text-navy uppercase text-[10px]">
                            {evt.status}
                          </div>
                          <p className="text-[11px] text-navy/70 mt-0.5">{evt.note || 'No specific logs submitted.'}</p>
                        </div>
                        <div className="text-[10px] text-right flex-shrink-0 text-navy/50">
                          <div>{new Date(evt.timestamp).toLocaleDateString()}</div>
                          <div>{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </div>
          ) : (
            <div className="border border-dashed border-navy/10 p-12 bg-white text-center font-sans font-semibold text-navy/40 uppercase rounded-md">
              Select a project blueprint to track progress.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Since Dashboard imports PixelCard, wait, PixelCard was defined in components/PremiumUI.jsx!
// Let's create an alias or check: In components/PremiumUI.jsx, we defined PremiumCard, not PixelCard.
// Ah! In components/PremiumUI.jsx, we exported PremiumCard. I should use PremiumCard instead of PixelCard in Dashboard.jsx!
// Let's make sure I import and use PremiumCard in Dashboard.jsx.
// Wait, I can see that in Dashboard.jsx line 147 I wrote <PixelCard>. Let's change that to <PremiumCard>.
// Let's call replace_file_content or rewrite it. Let's rewrite the file.
