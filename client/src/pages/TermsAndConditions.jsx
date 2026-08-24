import React from 'react';
import { PremiumCard } from '../components/PremiumUI';

export default function TermsAndConditions() {
  return (
    <div className="py-12 px-6 max-w-4xl mx-auto font-sans text-sm">
      <PremiumCard>
        <h2 className="font-serif text-2xl font-bold text-navy mb-4 border-b border-navy/5 pb-2">TERMS & CONDITIONS PROTOCOL</h2>
        <div className="space-y-6 text-navy/80 leading-relaxed">
          <p className="text-xs text-navy/40 uppercase font-semibold">
            Effective Date: August 2026
          </p>

          <p>
            By accessing this digital portal (the &quot;Site&quot;), you agree to comply with and be bound by the following operational terms and conditions. If you do not accept these terms, you must exit this network chunk.
          </p>

          <h3 className="font-sans font-bold text-sm text-sage uppercase tracking-wide border-b border-navy/5 pb-1">
            1. Allowed Usage
          </h3>
          <p>
            You are permitted to browse the portfolio, read blog logs, and submit project blueprints. Any attempt to flood our database APIs, execute scripts on input fields, or bypass admin authentication portals will trigger IP blocks.
          </p>

          <h3 className="font-sans font-bold text-sm text-sage uppercase tracking-wide border-b border-navy/5 pb-1">
            2. Intellectual Property
          </h3>
          <p>
            All content, layout grids, CSS frameworks, code models, and brand designs on this website are original intellectual property owned by Abhishek Singh Sahil. You are prohibited from copying assets for commercial redistribution.
          </p>

          <h3 className="font-sans font-bold text-sm text-sage uppercase tracking-wide border-b border-navy/5 pb-1">
            3. Client Blueprints & Estimates
          </h3>
          <p>
            Timelines and budgets set in the Enquiry terminal are estimate proposals. A project is only officially initiated after signing a separate contract blueprint and deploying the project ledger.
          </p>

          <p className="text-xs text-navy/30 mt-8 border-t border-navy/5 pt-4 text-center font-sans font-bold uppercase tracking-widest">
            // USER CONDITIONS DEPLOYED //
          </p>
        </div>
      </PremiumCard>
    </div>
  );
}
