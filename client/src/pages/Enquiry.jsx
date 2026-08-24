"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard, SectionHeader } from '../components/PremiumUI';
import { Send, CheckCircle, ArrowLeft } from 'lucide-react';

export default function EnquiryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [projectType, setProjectType] = useState('Website');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('₹25,000 - ₹75,000');
  const [timeline, setTimeline] = useState('1 - 2 Months');
  const [referenceWebsite, setReferenceWebsite] = useState('');
  const [preferredContact, setPreferredContact] = useState('Email');

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestCompany, setGuestCompany] = useState('');

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      if (serviceParam.includes('Web Application')) setProjectType('Web Application');
      else if (serviceParam.includes('E-commerce')) setProjectType('E-commerce');
      else if (serviceParam.includes('Software')) setProjectType('Custom Software');
      else if (serviceParam.includes('API') || serviceParam.includes('Backend')) setProjectType('API/Backend');
      else if (serviceParam.includes('Video')) setProjectType('Video Editing');
      else if (serviceParam.includes('Photo') || serviceParam.includes('Image')) setProjectType('Photo Editing');
      else if (serviceParam.includes('Maintenance')) setProjectType('Website Maintenance');
      else setProjectType('Website');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !budget || !timeline) return;

    setStatus('submitting');

    const payload = {
      projectType,
      description,
      budget,
      timeline,
      referenceWebsite,
      preferredContact,
    };

    if (!user) {
      if (!guestName || !guestEmail) {
        setStatus('error');
        return;
      }
      payload.guestInfo = {
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        company: guestCompany,
      };
    }

    try {
      const res = await apiFetch('/enquiries', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (res.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="py-12 px-6 max-w-3xl mx-auto font-sans text-xs md:text-sm">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-6 text-xs text-navy/60 hover:text-gold uppercase select-none outline-none font-semibold"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back
      </button>

      <SectionHeader title="START A PROJECT" subtitle="ENGAGEMENT WIZARD" center />

      <PremiumCard>
        {status === 'success' ? (
          <div className="text-center py-10">
            <CheckCircle className="w-16 h-16 text-sage mx-auto mb-6" />
            <h2 className="font-serif text-xl text-navy font-bold uppercase mb-3">Enquiry Transmitted!</h2>
            <p className="text-sm text-navy/60 max-w-md mx-auto mb-8 leading-relaxed">
              Your project specs have been registered. If you are logged in, you can track development status updates on your profile dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <GoldButton variant="solid" size="sm" onClick={() => navigate(user ? '/dashboard' : '/')}>
                {user ? 'View Dashboard' : 'Return to Home'}
              </GoldButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {!user && (
              <div className="border border-navy/10 p-5 bg-offwhite rounded-md space-y-4">
                <h3 className="font-sans font-bold text-xs text-gold uppercase tracking-wider mb-2">
                  👤 CLIENT CONTACT PROTOCOL
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full border border-navy/10 bg-white text-navy p-3 text-xs outline-none focus:border-gold rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="e.g. contact@aaravsharma.in"
                      className="w-full border border-navy/10 bg-white text-navy p-3 text-xs outline-none focus:border-gold rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Your Phone / Mobile</label>
                    <input
                      type="text"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full border border-navy/10 bg-white text-navy p-3 text-xs outline-none focus:border-gold rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Company / Brand Name</label>
                    <input
                      type="text"
                      value={guestCompany}
                      onChange={(e) => setGuestCompany(e.target.value)}
                      placeholder="e.g. Sharma Enterprises"
                      className="w-full border-2 border-navy/10 bg-white text-navy p-3 text-xs outline-none focus:border-gold rounded-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">What do you need? *</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full border border-navy/10 bg-offwhite text-navy p-3 text-xs outline-none rounded-sm"
                >
                  <option value="Website">Website</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Custom Software">Custom Software</option>
                  <option value="E-commerce">E-commerce Shop</option>
                  <option value="API/Backend">API / Backend Service</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Photo Editing">Photo/Asset Editing</option>
                  <option value="Website Maintenance">Website Maintenance</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Preferred Contact Method *</label>
                <select
                  value={preferredContact}
                  onChange={(e) => setPreferredContact(e.target.value)}
                  className="w-full border border-navy/10 bg-offwhite text-navy p-3 text-xs outline-none rounded-sm"
                >
                  <option value="Email">Email Communication</option>
                  <option value="WhatsApp">WhatsApp Message</option>
                  <option value="Phone">Direct Phone Call</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Approximate Budget *</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full border border-navy/10 bg-offwhite text-navy p-3 text-xs outline-none rounded-sm"
                >
                  <option value="Under ₹25,000">Under ₹25,000</option>
                  <option value="₹25,000 - ₹75,000">₹25,000 - ₹75,000</option>
                  <option value="₹75,000 - ₹2,00,000">₹75,000 - ₹2,00,000</option>
                  <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                  <option value="₹5,00,000+">₹5,00,000+ (Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Expected Timeline *</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full border border-navy/10 bg-offwhite text-navy p-3 text-xs outline-none rounded-sm"
                >
                  <option value="Under 2 Weeks">Under 2 Weeks (Urgent)</option>
                  <option value="2 - 4 Weeks">2 - 4 Weeks</option>
                  <option value="1 - 2 Months">1 - 2 Months</option>
                  <option value="2 - 4 Months">2 - 4 Months</option>
                  <option value="Flexible">Flexible / Ongoing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Reference Website (Optional)</label>
              <input
                type="url"
                value={referenceWebsite}
                onChange={(e) => setReferenceWebsite(e.target.value)}
                placeholder="https://example.com"
                className="w-full border border-navy/10 bg-offwhite text-navy p-3 text-xs outline-none rounded-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Project Spec Description *</label>
              <textarea
                rows={5}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please outline the target features, target pages, or business bottlenecks you want to resolve..."
                className="w-full border border-navy/10 bg-offwhite text-navy p-3 text-xs outline-none rounded-sm"
              />
            </div>

            {status === 'error' && (
              <div className="text-red-500 font-sans text-xs text-center font-medium">
                Failed to transmit blueprint parameters. Verify contact fields.
              </div>
            )}

            <div className="flex justify-end pt-4">
              <GoldButton
                type="submit"
                variant="solid"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Transmitting Specs...' : 'Submit Project Blueprint'} <Send className="w-4 h-4 ml-1.5" />
              </GoldButton>
            </div>
          </form>
        )}
      </PremiumCard>
    </div>
  );
}
