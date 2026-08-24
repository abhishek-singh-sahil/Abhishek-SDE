"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard, SectionHeader } from '../components/PremiumUI';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Websites', 'Web Apps', 'Software', 'E-commerce', 'Other'];

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await apiFetch('/projects');
        if (res.success && res.data) {
          setProjects(res.data);
          setFilteredProjects(res.data);
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
  };

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <SectionHeader title="PROJECT ARCHIVES" subtitle="ARCHIVES" center />

      {/* Filter Options */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 select-none">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-2 border font-sans text-xs uppercase tracking-wider transition-all duration-300 rounded-sm shadow-premium ${
              activeFilter === filter
                ? 'bg-gold border-gold text-white font-semibold'
                : 'bg-white border-navy/5 text-navy/70 hover:border-navy'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16 font-sans text-gold font-medium animate-pulse">
          LOADING SYSTEM CORES...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-navy/10 p-8 bg-white max-w-md mx-auto rounded-md">
          <h3 className="font-serif text-base text-navy font-bold mb-2">Sector Empty</h3>
          <p className="text-xs text-navy/60 font-sans leading-relaxed mb-6">
            No projects registered in the &quot;{activeFilter}&quot; category logs yet.
          </p>
          {activeFilter !== 'All' && (
            <GoldButton variant="goldOutline" size="sm" onClick={() => handleFilterClick('All')}>
              View All Projects
            </GoldButton>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <PremiumCard key={idx}>
              <div className="relative w-full h-48 bg-[#0b0f21] mb-6 rounded-md overflow-hidden select-none border border-navy/5">
                {project.liveUrl ? (
                  <div className="w-full h-full relative pointer-events-none">
                    <iframe
                      src={project.liveUrl}
                      title={project.title}
                      className="w-[200%] h-[200%] border-0 opacity-85"
                      style={{
                        transform: 'scale(0.5)',
                        transformOrigin: '0 0',
                      }}
                    />
                    {/* Transparent absolute overlay to block cursor and scrolling */}
                    <div className="absolute inset-0 bg-transparent cursor-default pointer-events-auto" />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center font-serif italic text-xs text-offwhite/50 uppercase">
                    <span>[COVER MEDIA SCREEN]</span>
                    <span className="text-[10px] text-gold mt-1 font-sans not-italic font-bold">{project.title}</span>
                  </div>
                )}
              </div>

              <h3 className="font-serif text-xl font-bold text-navy mb-2">{project.title}</h3>
              <p className="text-xs text-navy/70 font-sans leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[9px] font-sans font-semibold border border-navy/5 px-2.5 py-1 bg-offwhite text-navy/70 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-navy/5 pt-4 gap-4">
                <span className="font-sans text-[10px] font-bold text-sage uppercase">
                  Cat: {project.category}
                </span>
                <Link to={`/projects/${project.slug}`}>
                  <GoldButton variant="navy" size="sm">
                    Inspect Blueprint
                  </GoldButton>
                </Link>
              </div>
            </PremiumCard>
          ))}
        </div>
      )}
    </div>
  );
}
