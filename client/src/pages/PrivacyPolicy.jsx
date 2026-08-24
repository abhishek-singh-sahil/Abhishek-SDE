import React from 'react';
import { PremiumCard } from '../components/PremiumUI';

export default function PrivacyPolicy() {
  return (
    <div className="py-12 px-6 max-w-4xl mx-auto font-sans text-sm">
      <PremiumCard>
        <h2 className="font-serif text-2xl font-bold text-navy mb-4 border-b border-navy/5 pb-2">PRIVACY POLICY PROTOCOL</h2>
        <div className="space-y-6 text-navy/80 leading-relaxed">
          <p className="text-xs text-navy/40 uppercase font-semibold">
            Last Updated: August 2026 / System Version 1.0.0
          </p>

          <p>
            Welcome to the developer portfolio of Abhishek Singh Sahil (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting the metadata and personal coordinates you transmit through our network forms.
          </p>

          <h3 className="font-sans font-bold text-sm text-gold uppercase tracking-wide border-b border-navy/5 pb-1">
            1. Metadata Collection
          </h3>
          <p>
            We collect coordinates and identifiers you explicitly enter into our communication logs:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs text-navy/60">
            <li><strong>Client Information:</strong> Name, email address, phone contact, and company details when submitting project blueprints.</li>
            <li><strong>Authentication Logs:</strong> Google profile indicators (ID, name, and avatar pictures) when you connect via Google Sign-In.</li>
            <li><strong>Message Data:</strong> Subjects and logs sent via the contact portal.</li>
          </ul>

          <h3 className="font-sans font-bold text-sm text-gold uppercase tracking-wide border-b border-navy/5 pb-1">
            2. How We Use Collected Data
          </h3>
          <p>
            Your information is stored in our database records for:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs text-navy/60">
            <li>Responding to client project enquiries and establishing communications.</li>
            <li>Enabling secure log access on the user dashboard.</li>
            <li>Compiling overall traffic metrics via Google Analytics.</li>
          </ul>

          <h3 className="font-sans font-bold text-sm text-gold uppercase tracking-wide border-b border-navy/5 pb-1">
            3. Cookies & Local Storage
          </h3>
          <p>
            We utilize secure session cookies and browser local storage to maintain active login authorization states for administrators and users. You can disable cookies in browser options, but it will block secure dashboard gates.
          </p>

          <p className="text-xs text-navy/30 mt-8 border-t border-navy/5 pt-4 text-center font-sans font-bold uppercase tracking-widest">
            // ALL SECURITY ENGINES ONLINE //
          </p>
        </div>
      </PremiumCard>
    </div>
  );
}
