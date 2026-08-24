import React from 'react';
import { PremiumCard } from '../components/PremiumUI';

export default function CookieNotice() {
  return (
    <div className="py-12 px-6 max-w-4xl mx-auto font-sans text-sm">
      <PremiumCard>
        <h2 className="font-serif text-2xl font-bold text-navy mb-4 border-b border-navy/5 pb-2">COOKIE NOTICE PROTOCOL</h2>
        <div className="space-y-6 text-navy/80 leading-relaxed">
          <p className="text-xs text-navy/40 uppercase font-semibold">
            Last Updated: August 2026
          </p>

          <p>
            Our website utilizes cookie files to store browser states and support standard security protocols.
          </p>

          <h3 className="font-sans font-bold text-sm text-gold uppercase tracking-wide border-b border-navy/5 pb-1">
            What are Cookies?
          </h3>
          <p>
            Cookies are micro-strings of data stored on your hard drive that help us remember your login sessions.
          </p>

          <h3 className="font-sans font-bold text-sm text-gold uppercase tracking-wide border-b border-navy/5 pb-1">
            Cookies We Deploy
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-xs text-navy/60">
            <li><strong>Authorization Tokens:</strong> Local cookies storing user or admin login states securely. These are critical for accessing dashboard logs.</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics indicators to track how users explore my projects and services.</li>
          </ul>

          <h3 className="font-sans font-bold text-sm text-gold uppercase tracking-wide border-b border-navy/5 pb-1">
            Adjusting Settings
          </h3>
          <p>
            You can clear cookies anytime via your browser settings panel. If you disable cookies entirely, you will not be able to log into dashboard pages.
          </p>

          <p className="text-xs text-navy/30 mt-8 border-t border-navy/5 pt-4 text-center font-sans font-bold uppercase tracking-widest">
            // COOKIE NOTICE READ COMPLETE //
          </p>
        </div>
      </PremiumCard>
    </div>
  );
}
