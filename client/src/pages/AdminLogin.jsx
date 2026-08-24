"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoldButton, PremiumCard } from '../components/PremiumUI';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { admin, loginAdmin } = useAuth();

  const [email, setEmail] = useState('admin@pixeldev.com');
  const [password, setPassword] = useState('adminpassword123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (admin) {
    navigate('/admin/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setSubmitting(true);
    setError('');

    try {
      await loginAdmin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('System rejected login. Verify email and secure passwords.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-5 max-w-md mx-auto">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 mb-6 text-xs text-navy/60 hover:text-gold uppercase select-none outline-none font-semibold"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <PremiumCard>
        <h2 className="font-serif text-2xl font-bold text-navy mb-2 uppercase text-center">ADMIN CONSOLE</h2>

        <div className="flex items-center gap-2.5 border border-red-500/20 bg-red-950 bg-opacity-5 p-3 mb-6 text-red-700 font-sans font-semibold text-[10px] uppercase rounded-sm">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>Restricted Area. Admin credentials required.</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-navy/10 bg-offwhite text-navy p-3 text-xs outline-none focus:border-gold rounded-sm"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans font-bold text-navy/60 uppercase mb-1.5">Secure Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-navy/10 bg-offwhite text-navy p-3 text-xs outline-none focus:border-gold rounded-sm"
            />
          </div>

          {error && (
            <div className="text-red-500 font-sans text-[10px] uppercase text-center font-bold animate-pulse pt-2">
              {error}
            </div>
          )}

          <div className="pt-2">
            <GoldButton
              type="submit"
              variant="solid"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? 'Decrypting Access...' : 'Authenticate Console Access'}
            </GoldButton>
          </div>
        </form>
      </PremiumCard>
    </div>
  );
}
