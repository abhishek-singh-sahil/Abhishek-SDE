"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { Github, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    async function loadSocials() {
      try {
        const res = await apiFetch('/social-links');
        if (res.success && res.data) {
          setSocials(res.data);
        }
      } catch (err) {
        setSocials([
          { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
          { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
          { platform: 'Email', url: 'mailto:hello@pixelcraft.dev', icon: 'mail' },
        ]);
      }
    }
    loadSocials();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-4.5 h-4.5" />;
      case 'linkedin':
        return <Linkedin className="w-4.5 h-4.5" />;
      case 'youtube':
        return <Youtube className="w-4.5 h-4.5" />;
      case 'mail':
        return <Mail className="w-4.5 h-4.5" />;
      default:
        return <Phone className="w-4.5 h-4.5" />;
    }
  };

  return (
    <footer className="bg-navy border-t border-navy/5 text-offwhite pt-16 pb-8 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gold border border-gold flex items-center justify-center font-bold font-pixel text-lg text-white">
              A
            </div>
            <span className="font-sans font-bold text-sm tracking-widest uppercase">
              Abhishek Singh Sahil
            </span>
          </div>
          <p className="text-offwhite/75 text-xs max-w-sm mb-6 leading-relaxed">
            Crafting scalable software systems, high-converting React applications, and premium video post-production modules for growing brands.
          </p>
          <div className="flex gap-3">
            {socials.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-offwhite/15 hover:border-gold hover:text-gold flex items-center justify-center text-offwhite/80 transition-all duration-300"
                title={link.platform}
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-sm font-bold text-gold uppercase mb-6 tracking-wide">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-xs text-offwhite/70">
            <li><Link to="/#about" className="hover:text-gold transition-colors">About Base</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Service Station</Link></li>
            <li><Link to="/projects" className="hover:text-gold transition-colors">Code Lab</Link></li>
            <li><Link to="/blog" className="hover:text-gold transition-colors">Blog Archives</Link></li>
            <li><Link to="/enquiry" className="hover:text-gold transition-colors">Enquiry Terminal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-bold text-gold uppercase mb-6 tracking-wide">Legal Protocol</h4>
          <ul className="flex flex-col gap-3 text-xs text-offwhite/70">
            <li><Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            <li><Link to="/cookie-notice" className="hover:text-gold transition-colors">Cookie Notice</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-offwhite/10 text-center text-[10px] tracking-widest text-offwhite/40 uppercase">
        <p>&copy; {new Date().getFullYear()} Abhishek Singh Sahil. All rights reserved.</p>
      </div>
    </footer>
  );
}
