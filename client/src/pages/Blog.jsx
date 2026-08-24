"use client";

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard, SectionHeader } from '../components/PremiumUI';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await apiFetch('/blog');
        if (res.success && res.data) {
          setPosts(res.data);
        }
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <SectionHeader title="BLOG LOGS" subtitle="ARTICLES" center />

      {loading ? (
        <div className="text-center py-16 font-sans text-gold font-medium animate-pulse">
          DESERIALIZING ARTICLES DATABASE...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-navy/10 p-8 bg-white max-w-md mx-auto rounded-md">
          <h3 className="font-serif text-base text-navy font-bold mb-2">Logs Empty</h3>
          <p className="text-xs text-navy/60 font-sans leading-relaxed">
            No articles published to the network logs yet. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PremiumCard key={post._id}>
              <div className="relative w-full h-40 bg-[#0a0d1d] mb-4 rounded-md flex items-center justify-center font-serif italic text-offwhite/50 text-xs uppercase select-none">
                [CARTRIDGE IMAGE]
              </div>

              <div className="flex justify-between items-center mb-4 text-[10px] text-navy/40 font-bold uppercase">
                <span>Cat: {post.category}</span>
                <span>By: {post.author}</span>
              </div>

              <h3 className="font-serif text-lg font-bold text-navy mb-2 h-14 overflow-hidden text-ellipsis">{post.title}</h3>

              <p className="text-xs text-navy/70 font-sans leading-relaxed mb-4 h-16 overflow-hidden text-ellipsis">
                {post.content.replace(/[#*`_[\]]/g, '').slice(0, 120)}...
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {post.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[9px] font-sans font-semibold border border-navy/5 px-2.5 py-0.5 bg-offwhite text-navy/75 rounded-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-navy/5 pt-4 gap-4">
                <span className="font-sans text-[10px] text-navy/50 font-medium">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                </span>
                <Link to={`/blog/${post.slug}`}>
                  <GoldButton variant="navy" size="sm">
                    Read Log
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
