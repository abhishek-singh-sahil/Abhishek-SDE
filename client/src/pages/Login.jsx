"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoldButton, PremiumCard } from '../components/PremiumUI';
import { ArrowLeft, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, loginUser, registerUser } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate('/dashboard');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) return;

    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await registerUser(name, email, password);
      } else {
        await loginUser(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-6 max-w-md mx-auto font-sans">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 mb-6 text-xs text-navy/60 hover:text-gold uppercase select-none outline-none font-semibold"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <PremiumCard>
        <h2 className="font-serif text-2xl font-bold text-navy mb-2 uppercase text-center">
          {isSignUp ? 'Create Account' : 'Client Login'}
        </h2>
        <p className="text-xs text-navy/60 leading-relaxed mb-6 text-center">
          {isSignUp ? 'Sign up to submit and track your project blueprints.' : 'Sign in to access your project dashboard.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[10px] font-bold text-navy/60 uppercase mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-navy/40">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full border border-navy/10 bg-offwhite text-navy pl-10 pr-3 py-3 text-xs outline-none focus:border-gold rounded-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-navy/60 uppercase mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-navy/40">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. contact@aaravsharma.in"
                className="w-full border border-navy/10 bg-offwhite text-navy pl-10 pr-3 py-3 text-xs outline-none focus:border-gold rounded-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-navy/60 uppercase mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-navy/40">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-navy/10 bg-offwhite text-navy pl-10 pr-3 py-3 text-xs outline-none focus:border-gold rounded-sm"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-[11px] font-medium text-center">
              {error}
            </div>
          )}

          <GoldButton type="submit" variant="solid" size="md" className="w-full justify-center" disabled={loading}>
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </GoldButton>
        </form>

        <div className="text-center text-[10px] font-bold text-navy/40 uppercase my-4 select-none">
          — OR —
        </div>

        <GoldButton
          variant="outline"
          size="md"
          className="w-full justify-center"
          onClick={() => setError('Google OAuth configurations must be registered.')}
        >
          Continue with Google
        </GoldButton>

        <div className="mt-6 text-center text-xs">
          {isSignUp ? (
            <span className="text-navy/65">
              Already have an account?{' '}
              <button onClick={() => { setIsSignUp(false); setError(''); }} className="text-gold font-bold hover:underline">
                Log In
              </button>
            </span>
          ) : (
            <span className="text-navy/65">
              New client?{' '}
              <button onClick={() => { setIsSignUp(true); setError(''); }} className="text-gold font-bold hover:underline">
                Create Account
              </button>
            </span>
          )}
        </div>
      </PremiumCard>
    </div>
  );
}
