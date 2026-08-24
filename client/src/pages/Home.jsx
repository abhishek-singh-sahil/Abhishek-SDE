"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard, SectionHeader, AnimateReveal } from '../components/PremiumUI';
import { Monitor, Cpu, Layers, MessageSquare, ArrowRight, CheckCircle, Mail } from 'lucide-react';

export default function Home() {
  const [settings, setSettings] = useState({
    heroText: 'BUILDING DIGITAL WORLDS, ONE PROJECT AT A TIME.',
    heroSubtitle: 'Professional Full-Stack Developer & Software Developer crafting bespoke web applications, custom software, and digital solutions for scaling businesses.',
    currentlyBuilding: '3D Voxel Portfolio Engine',
    currentlyLearning: 'WebGPU Renderers',
    availabilityStatus: 'Available',
  });

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactStatus, setContactStatus] = useState('idle');

  useEffect(() => {
    async function loadData() {
      try {
        const siteRes = await apiFetch('/settings/site');
        if (siteRes.success && siteRes.data) {
          setSettings(siteRes.data);
        }
      } catch (e) {}

      try {
        const skillsRes = await apiFetch('/skills');
        if (skillsRes.success && skillsRes.data) {
          setSkills(skillsRes.data);
          if (skillsRes.data.length > 0) {
            setSelectedSkill(skillsRes.data[0]);
          }
        }
      } catch (e) {}

      try {
        const projectsRes = await apiFetch('/projects');
        if (projectsRes.success && projectsRes.data) {
          setProjects(projectsRes.data.slice(0, 3));
        }
      } catch (e) {}
    }
    loadData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactSubject || !contactMsg) return;
    setContactStatus('submitting');
    try {
      const res = await apiFetch('/messages', {
        method: 'POST',
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMsg,
        }),
      });
      if (res.success) {
        setContactStatus('success');
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMsg('');
      } else {
        setContactStatus('error');
      }
    } catch (err) {
      setContactStatus('error');
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 bg-offwhite dot-grid border-b border-navy/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white border border-navy/5 shadow-premium mb-6">
              <span className={`w-2.5 h-2.5 rounded-full inline-block ${
                settings.availabilityStatus === 'Available' ? 'bg-sage animate-pulse' : 'bg-red-400'
              }`} />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-navy/70">
                {settings.availabilityStatus === 'Available' ? 'SYSTEMS ONLINE: Available for work' : 'SYSTEMS BUSY'}
              </span>
            </div>

            <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-gold mb-4">
              Abhishek Singh Sahil
            </h2>

            <h1 className="font-serif text-4xl md:text-6xl text-navy font-bold leading-tight uppercase mb-6">
              Full-Stack Developer & Software Developer
            </h1>

            <p className="font-sans text-sm md:text-base text-navy/75 mb-8 leading-relaxed max-w-xl">
              {settings.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <Link to="/projects" className="w-full md:w-auto">
                <GoldButton variant="solid" className="w-full md:w-auto">Explore My Work</GoldButton>
              </Link>
              <Link to="/enquiry" className="w-full md:w-auto">
                <GoldButton variant="outline" className="w-full md:w-auto">Start a Project</GoldButton>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Elegant avatar frame */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white border border-navy/5 p-4 rounded-full shadow-premium flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-navy/5 flex items-center justify-center overflow-hidden relative">
                {settings.profileImage ? (
                  <img
                    src={settings.profileImage}
                    alt={settings.brandName || "Abhishek Singh Sahil"}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <svg width="128" height="128" viewBox="0 0 64 64" className="w-36 h-36 opacity-85 select-none" style={{ imageRendering: 'pixelated' }}>
                    <rect x="20" y="8" width="24" height="12" fill="#7C9A8B"/>
                    <rect x="16" y="12" width="32" height="12" fill="#7C9A8B"/>
                    <rect x="20" y="20" width="24" height="20" fill="#C89B4B"/>
                    <rect x="16" y="24" width="32" height="12" fill="#C89B4B"/>
                    <rect x="22" y="26" width="6" height="4" fill="#18212B"/>
                    <rect x="36" y="26" width="6" height="4" fill="#18212B"/>
                    <rect x="28" y="28" width="8" height="2" fill="#18212B"/>
                    <rect x="24" y="27" width="2" height="2" fill="#6B7FA3"/>
                    <rect x="38" y="27" width="2" height="2" fill="#6B7FA3"/>
                    <rect x="28" y="34" width="8" height="2" fill="#18212B"/>
                    <rect x="16" y="40" width="32" height="20" fill="#18212B" stroke="#F7F6F2" strokeWidth="2"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white border-b border-navy/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateReveal>
            <SectionHeader title="THE STUDIO" subtitle="ABOUT BASE" />
            <p className="font-sans text-sm md:text-base text-navy/80 leading-relaxed mb-6">
              I am a dedicated Full-Stack Developer with hands-on experience building custom web systems and database portals for clients. I coordinate directly with local business clients in my home state to understand operational requirements, convert them into functional software models, build solid database indices, and host products online.
            </p>
            <p className="font-sans text-sm md:text-base text-navy/80 leading-relaxed mb-8">
              My engineering focuses on creating maintainable backend middleware, clean web views, and fast media streaming services (video and photo adjustments). I manage every project from draft blueprints to final DNS cloud settings.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="border border-navy/5 p-4 bg-offwhite rounded-md shadow-premium">
                <h4 className="font-sans font-bold text-xs text-gold uppercase mb-1.5">🤝 Client Sync</h4>
                <p className="text-xs text-navy/70">Aligning project timelines and features directly with client reviews.</p>
              </div>
              <div className="border border-navy/5 p-4 bg-offwhite rounded-md shadow-premium">
                <h4 className="font-sans font-bold text-xs text-gold uppercase mb-1.5">⚙ Full-Stack</h4>
                <p className="text-xs text-navy/70">Connecting React routes to Express controllers and MongoDB models.</p>
              </div>
            </div>
          </AnimateReveal>

          {/* Interactive Technology Inventory */}
          <AnimateReveal>
            <PremiumCard>
              <div className="mb-6">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-navy mb-2">TECH INVENTORY</h3>
                <p className="text-xs text-navy/60 font-sans">
                  Click on any inventory skill block to inspect specifications and details.
                </p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                {skills.map((skill, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSkill(skill)}
                    className={`border p-3 text-center transition-all duration-300 font-sans font-medium text-xs rounded-sm shadow-premium ${
                      selectedSkill?.name === skill.name
                        ? 'border-gold bg-gold/5 text-gold'
                        : 'border-navy/5 bg-offwhite hover:border-navy text-navy/80'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>

              {selectedSkill ? (
                <div className="border border-navy/5 bg-offwhite p-5 rounded-md relative shadow-premium">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-sans font-bold text-sm text-gold uppercase tracking-wider">
                      {selectedSkill.name}
                    </h4>
                    <span className="text-[10px] font-sans font-semibold border border-sage text-sage px-2 py-0.5 uppercase bg-white">
                      {selectedSkill.level}
                    </span>
                  </div>
                  <p className="text-xs text-navy/70 font-sans leading-relaxed mb-3">
                    {selectedSkill.description}
                  </p>
                  <div className="text-[9px] font-sans font-semibold text-navy/40 uppercase">
                    Slot Category: <span className="text-navy">{selectedSkill.category}</span>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-navy/10 p-5 text-center text-xs text-navy/40 rounded-md">
                  Select an item from tech grid to inspect.
                </div>
              )}
            </PremiumCard>
          </AnimateReveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-offwhite border-b border-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <SectionHeader title="SERVICES STATION" subtitle="SERVICES" />
            <Link to="/services">
              <GoldButton variant="outline" size="sm">
                Inspect All Services <ArrowRight className="w-4 h-4 ml-1.5" />
              </GoldButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PremiumCard>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 border border-navy/5 bg-offwhite text-gold rounded-md">
                  <Monitor className="w-5 h-5" />
                </span>
                <h3 className="font-serif text-lg font-bold text-navy">Website Development</h3>
              </div>
              <p className="text-xs text-navy/70 font-sans leading-relaxed mb-6">
                Tailored business platforms, single page landing configurations, and static business listings built using modern React.js.
              </p>
              <Link to="/enquiry?service=Website Development" className="block w-full">
                <GoldButton variant="navy" size="sm" className="w-full">Enquire Site Plan</GoldButton>
              </Link>
            </PremiumCard>

            <PremiumCard>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 border border-navy/5 bg-offwhite text-gold rounded-md">
                  <Layers className="w-5 h-5" />
                </span>
                <h3 className="font-serif text-lg font-bold text-navy">Full-Stack Web Apps</h3>
              </div>
              <p className="text-xs text-navy/70 font-sans leading-relaxed mb-6">
                High-performance dashboard apps including database configurations, secure JWT log panels, and operational dashboards.
              </p>
              <Link to="/enquiry?service=Full-Stack Web Application Development" className="block w-full">
                <GoldButton variant="navy" size="sm" className="w-full">Enquire App Plan</GoldButton>
              </Link>
            </PremiumCard>

            <PremiumCard>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 border border-navy/5 bg-offwhite text-gold rounded-md">
                  <Cpu className="w-5 h-5" />
                </span>
                <h3 className="font-serif text-lg font-bold text-navy">Video / Image Editing</h3>
              </div>
              <p className="text-xs text-navy/70 font-sans leading-relaxed mb-6">
                Creative assets touch-ups and clean post-production video editing for social profiles, business ads, and YouTube thumbnails.
              </p>
              <Link to="/enquiry?service=Video Editing" className="block w-full">
                <GoldButton variant="navy" size="sm" className="w-full">Enquire Media Plan</GoldButton>
              </Link>
            </PremiumCard>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="projects" className="py-24 px-6 bg-white border-b border-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <SectionHeader title="PROJECT ARCHIVES" subtitle="PORTFOLIO" />
            <Link to="/projects">
              <GoldButton variant="outline" size="sm">
                View Project Catalog
              </GoldButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <PremiumCard key={idx}>
                <div className="relative w-full h-48 bg-[#0a0d1c] mb-6 rounded-md flex items-center justify-center text-offwhite/50 text-xs font-serif italic uppercase select-none">
                  [Cover Image: {project.title}]
                </div>
                <h3 className="font-serif text-xl font-bold text-navy mb-2">{project.title}</h3>
                <p className="text-xs text-navy/70 font-sans leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9px] font-sans font-semibold border border-navy/5 px-2.5 py-1 bg-offwhite text-navy/80 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to={`/projects/${project.slug}`} className="block w-full">
                  <GoldButton variant="navy" size="sm" className="w-full">
                    Launch Archives Details
                  </GoldButton>
                </Link>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-offwhite">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="ESTABLISH CONNECTION" subtitle="CONTACT" center />

          <PremiumCard>
            {contactStatus === 'success' ? (
              <div className="text-center py-10">
                <CheckCircle className="w-12 h-12 text-sage mx-auto mb-4" />
                <h4 className="font-serif text-lg font-bold text-navy mb-2">Message Broadcast Completed!</h4>
                <p className="text-xs text-navy/70 font-sans max-w-sm mx-auto">
                  Your coordinates have been safely written in the database logs. The administrator will reply to your mail shortly.
                </p>
                <GoldButton variant="outline" size="sm" onClick={() => setContactStatus('idle')} className="mt-6">
                  Send Another Message
                </GoldButton>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase text-navy/60 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full border border-navy/10 bg-offwhite text-navy rounded-sm p-3 text-xs outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase text-navy/60 mb-2">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. contact@aaravsharma.in"
                      className="w-full border border-navy/10 bg-offwhite text-navy rounded-sm p-3 text-xs outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase text-navy/60 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Custom CRM Dashboard"
                    className="w-full border border-navy/10 bg-offwhite text-navy rounded-sm p-3 text-xs outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase text-navy/60 mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Describe your requirements, system size, and timelines..."
                    className="w-full border border-navy/10 bg-offwhite text-navy rounded-sm p-3 text-xs outline-none focus:border-gold"
                  />
                </div>

                {contactStatus === 'error' && (
                  <div className="text-red-500 font-sans text-xs text-center font-medium">
                    Failed to establish database write. Please verify logs.
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <GoldButton
                    type="submit"
                    variant="solid"
                    disabled={contactStatus === 'submitting'}
                  >
                    {contactStatus === 'submitting' ? 'Transmitting...' : 'Broadcast Coordinates'}
                  </GoldButton>
                </div>
              </form>
            )}
          </PremiumCard>
        </div>
      </section>
    </div>
  );
}
