import React from 'react';
import { Link } from 'react-router-dom';
import { GoldButton, PremiumCard } from '../components/PremiumUI';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 px-6 max-w-md mx-auto text-center font-sans select-none">
      <PremiumCard>
        <div className="mb-6 text-gold animate-bounce flex justify-center">
          <AlertCircle className="w-16 h-16 stroke-[1.5]" />
        </div>

        <h1 className="font-serif text-3xl text-navy font-bold uppercase mb-4 tracking-wider">
          PAGE NOT FOUND
        </h1>
        
        <h2 className="font-sans text-xs font-bold text-navy/40 uppercase mb-4 tracking-wide">
          404 — Unknown Route Coordinates
        </h2>

        <p className="text-xs text-navy/65 mb-8 leading-relaxed">
          The page you are trying to reach does not exist or has been relocated to another sector.
        </p>

        <Link to="/">
          <GoldButton variant="solid" size="sm" className="w-full">
            Return to Home Base
          </GoldButton>
        </Link>
      </PremiumCard>
    </div>
  );
}
