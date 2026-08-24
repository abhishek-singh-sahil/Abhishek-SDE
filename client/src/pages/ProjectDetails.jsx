"use client";

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard } from '../components/PremiumUI';
import { ArrowLeft, Globe, Github, Calendar } from 'lucide-react';

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadProjectDetails() {
      try {
        const res = await apiFetch(`/projects/slug/${slug}`);
        if (res.success && res.data) {
          setProject(res.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProjectDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center font-sans text-gold font-medium animate-pulse">
        LOADING PROJECT BLUEPRINTS...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="py-24 px-6 text-center font-sans">
        <h2 className="font-serif text-2xl text-red-500 font-bold uppercase mb-4">Error: Blueprint Not Found</h2>
        <p className="text-sm text-navy/60 mb-8">
          The requested project code is not located in the database.
        </p>
        <Link to="/projects">
          <GoldButton variant="outline" size="sm">Back to Archives</GoldButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto font-sans">
      <Link to="/projects" className="inline-flex items-center gap-2 mb-8 text-xs text-navy/60 hover:text-gold uppercase select-none font-semibold">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-navy/5 p-6 md:p-8 rounded-lg shadow-premium">
            <h1 className="font-serif text-2xl md:text-4xl text-navy font-bold uppercase mb-2 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[10px] font-sans font-bold border border-gold text-gold px-2.5 py-0.5 uppercase bg-offwhite rounded-sm">
                {project.category}
              </span>
              {project.clientName && (
                <span className="text-[10px] font-sans font-bold border border-sage text-sage px-2.5 py-0.5 uppercase bg-offwhite rounded-sm">
                  Client: {project.clientName}
                </span>
              )}
            </div>

            <div className="relative w-full h-64 md:h-96 bg-[#0a0d1c] rounded-md overflow-hidden mb-6 select-none border border-navy/5">
              {project.liveUrl ? (
                <div className="w-full h-full relative pointer-events-none">
                  <iframe
                    src={project.liveUrl}
                    title={project.title}
                    className="w-full h-full border-0 opacity-85"
                  />
                  {/* Transparent absolute overlay to block cursor and scrolling */}
                  <div className="absolute inset-0 bg-transparent cursor-default pointer-events-auto" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center font-serif italic text-offwhite/50 text-xs uppercase">
                  [COVER PHOTO: {project.title}]
                </div>
              )}
            </div>

            <h3 className="font-sans font-bold text-xs uppercase text-gold mb-2 tracking-wider">Overview</h3>
            <p className="text-sm text-navy/85 leading-relaxed mb-6">
              {project.description}
            </p>

            {project.challenges && (
              <>
                <h3 className="font-sans font-bold text-xs uppercase text-gold mb-2 tracking-wider">The Challenges</h3>
                <p className="text-sm text-navy/70 leading-relaxed mb-6">
                  {project.challenges}
                </p>
              </>
            )}

            {project.solution && (
              <>
                <h3 className="font-sans font-bold text-xs uppercase text-sage mb-2 tracking-wider">The Solution</h3>
                <p className="text-sm text-navy/85 leading-relaxed mb-6">
                  {project.solution}
                </p>
              </>
            )}

            {project.results && (
              <>
                <h3 className="font-sans font-bold text-xs uppercase text-gold mb-2 tracking-wider">Project Outcomes</h3>
                <p className="text-sm text-navy/85 leading-relaxed">
                  {project.results}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <PremiumCard>
            <h3 className="font-serif text-sm font-bold text-navy uppercase mb-4 tracking-wider border-b border-navy/5 pb-2">SPECIFICATIONS</h3>
            <ul className="space-y-4 text-xs">
              {project.completionDate && (
                <li className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-sans font-bold text-navy/40 uppercase">Completed Date</div>
                    <div className="text-navy font-semibold">{new Date(project.completionDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</div>
                  </div>
                </li>
              )}

              <li>
                <div className="text-[10px] font-sans font-bold text-navy/40 uppercase mb-2">Technologies Used</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="font-sans border border-navy/5 px-2 py-0.5 bg-offwhite text-navy/70 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>

              <li className="pt-4 border-t border-navy/5 space-y-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <GoldButton variant="solid" size="sm" className="w-full">
                      <Globe className="w-4 h-4 mr-2" /> Live Website
                    </GoldButton>
                  </a>
                )}

                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <GoldButton variant="outline" size="sm" className="w-full">
                      <Github className="w-4 h-4 mr-2" /> GitHub Repository
                    </GoldButton>
                  </a>
                )}
              </li>
            </ul>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
}
