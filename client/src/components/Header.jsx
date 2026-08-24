"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoldButton } from './PremiumUI';
import { Menu, X, User as UserIcon, ShieldAlert } from 'lucide-react';

export default function Header() {
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-offwhite/95 backdrop-blur-md border-b border-navy/5 px-6 py-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Personal Brand */}
        <Link href="/" onClick={() => navigate('/')} className="flex items-center gap-3 group">
          {/* Subtle pixel accent monogram */}
          <div className="w-9 h-9 border border-navy bg-navy text-white flex items-center justify-center font-bold font-pixel text-xl transition-colors group-hover:bg-gold group-hover:border-gold">
            A
          </div>
          <span className="font-sans font-bold text-sm tracking-widest text-navy hover:text-gold transition-colors uppercase">
            Abhishek Singh Sahil
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans uppercase text-[10px] font-semibold tracking-widest text-navy/70">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
          <Link to="/projects" className="hover:text-gold transition-colors">Projects</Link>
          <Link to="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <a href="/#contact" className="hover:text-gold transition-colors">Contact</a>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {admin ? (
            <div className="flex items-center gap-2">
              <Link to="/admin/dashboard">
                <GoldButton variant="goldOutline" size="sm">
                  <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Admin
                </GoldButton>
              </Link>
              <GoldButton variant="outline" size="sm" onClick={logoutAdmin}>
                Logout
              </GoldButton>
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <GoldButton variant="goldOutline" size="sm">
                  <UserIcon className="w-3.5 h-3.5 mr-1" /> Dashboard
                </GoldButton>
              </Link>
              <GoldButton variant="outline" size="sm" onClick={logoutUser}>
                Logout
              </GoldButton>
            </div>
          ) : (
            <Link to="/login">
              <GoldButton variant="outline" size="sm">
                Login
              </GoldButton>
            </Link>
          )}

          <Link to="/enquiry">
            <GoldButton variant="solid" size="sm">
              Start Project
            </GoldButton>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-navy hover:text-gold"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 pt-4 border-t border-navy/5 flex flex-col gap-4 font-sans uppercase tracking-widest font-semibold text-[10px] text-navy/70">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold p-2">Home</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold p-2">Services</Link>
          <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold p-2">Projects</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold p-2">Blog</Link>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold p-2">Contact</a>

          <div className="flex flex-col gap-3 pt-2">
            {admin ? (
              <>
                <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <GoldButton variant="goldOutline" size="sm" className="w-full">
                    Admin Panel
                  </GoldButton>
                </Link>
                <GoldButton variant="outline" size="sm" onClick={() => { logoutAdmin(); setMobileMenuOpen(false); }} className="w-full">
                  Logout Admin
                </GoldButton>
              </>
            ) : user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <GoldButton variant="goldOutline" size="sm" className="w-full">
                    Dashboard
                  </GoldButton>
                </Link>
                <GoldButton variant="outline" size="sm" onClick={() => { logoutUser(); setMobileMenuOpen(false); }} className="w-full">
                  Logout
                </GoldButton>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <GoldButton variant="outline" size="sm" className="w-full">
                  Login
                </GoldButton>
              </Link>
            )}

            <Link to="/enquiry" onClick={() => setMobileMenuOpen(false)}>
              <GoldButton variant="solid" size="sm" className="w-full">
                Start Project
              </GoldButton>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
