"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard, SectionHeader } from '../components/PremiumUI';
import { 
  Monitor, Layers, Briefcase, Cpu, ShoppingCart, Link as LinkIcon, 
  Terminal, Database, Cloud, Wrench, Video, Image as ImageIcon, Sparkles, HelpCircle 
} from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await apiFetch('/services');
        if (res.success && res.data) {
          setServices(res.data);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const getLucideIcon = (iconName) => {
    switch (iconName.toLowerCase()) {
      case 'monitor': return <Monitor className="w-6 h-6" />;
      case 'layers': return <Layers className="w-6 h-6" />;
      case 'briefcase': return <Briefcase className="w-6 h-6" />;
      case 'cpu': return <Cpu className="w-6 h-6" />;
      case 'shoppingcart': return <ShoppingCart className="w-6 h-6" />;
      case 'link': return <LinkIcon className="w-6 h-6" />;
      case 'terminal': return <Terminal className="w-6 h-6" />;
      case 'database': return <Database className="w-6 h-6" />;
      case 'cloud': return <Cloud className="w-6 h-6" />;
      case 'wrench': return <Wrench className="w-6 h-6" />;
      case 'video': return <Video className="w-6 h-6" />;
      case 'image': return <ImageIcon className="w-6 h-6" />;
      case 'sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <HelpCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <SectionHeader title="SERVICES STATION" subtitle="CHANNELS" center />

      {loading ? (
        <div className="text-center py-16 font-sans text-gold font-medium animate-pulse">
          FETCHING DATA FROM DB CONTEXT...
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-navy/10 p-8 bg-white max-w-md mx-auto rounded-md">
          <h3 className="font-serif text-lg text-navy font-bold mb-2">No Services Configured</h3>
          <p className="text-xs text-navy/60 mb-6 font-sans">
            Please seed the database or configure services in the admin dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <PremiumCard key={idx}>
              <div className="flex items-center gap-3 mb-4 select-none">
                <span className="p-2 border border-navy/5 bg-offwhite text-gold rounded-md">
                  {getLucideIcon(service.icon)}
                </span>
                <h3 className="font-serif text-base font-bold text-navy">
                  {service.name}
                </h3>
              </div>

              <p className="text-xs text-navy/70 font-sans leading-relaxed mb-6 h-16 overflow-y-auto">
                {service.description}
              </p>

              <div className="mb-4">
                <h4 className="font-sans text-[10px] font-bold text-gold uppercase mb-2 tracking-wider">Features Included:</h4>
                <ul className="space-y-1.5 text-xs text-navy/85">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5 font-sans">
                      <span className="text-sage">■</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 border-t border-navy/5 pt-4">
                <h4 className="font-sans text-[10px] font-bold text-sage uppercase mb-2 tracking-wider">Suitable For:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {service.suitableFor.map((suit, sIdx) => (
                    <span key={sIdx} className="text-[9px] font-sans font-semibold border border-navy/5 px-2 py-0.5 bg-offwhite text-navy/70 rounded-sm">
                      {suit}
                    </span>
                  ))}
                </div>
              </div>

              <Link to={`/enquiry?service=${encodeURIComponent(service.name)}`} className="block w-full">
                <GoldButton variant="outline" size="sm" className="w-full">
                  Enquire About This
                </GoldButton>
              </Link>
            </PremiumCard>
          ))}
        </div>
      )}
    </div>
  );
}
