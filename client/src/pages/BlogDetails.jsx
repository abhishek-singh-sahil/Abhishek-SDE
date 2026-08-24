"use client";

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { apiFetch } from '../lib/api';
import { GoldButton, PremiumCard } from '../components/PremiumUI';
import { ArrowLeft, User as UserIcon, Calendar, Bookmark } from 'lucide-react';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPostDetails() {
      try {
        const res = await apiFetch(`/blog/slug/${slug}`);
        if (res.success && res.data) {
          setPost(res.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadPostDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center font-sans text-gold font-medium animate-pulse">
        DESERIALIZING LOG ENTRY...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="py-24 px-6 text-center font-sans">
        <h2 className="font-serif text-2xl text-red-500 font-bold uppercase mb-4">Error: Log Not Found</h2>
        <p className="text-sm text-navy/60 mb-8">
          The requested article is not stored in the database cores.
        </p>
        <Link to="/blog">
          <GoldButton variant="outline" size="sm">Back to Blog Archives</GoldButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto font-sans">
      <Link to="/blog" className="inline-flex items-center gap-2 mb-8 text-xs text-navy/60 hover:text-gold uppercase select-none font-semibold">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <article className="bg-white border border-navy/5 p-6 md:p-12 rounded-lg shadow-premium">
        <h1 className="font-serif text-3xl md:text-5xl text-navy font-bold uppercase mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-navy/5 py-4 mb-8 text-xs text-navy/60 select-none">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-gold flex-shrink-0" />
            <div>
              <div className="text-[9px] font-sans font-bold uppercase text-navy/40">Author</div>
              <div className="text-navy font-semibold">{post.author}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sage flex-shrink-0" />
            <div>
              <div className="text-[9px] font-sans font-bold uppercase text-navy/40">Published</div>
              <div className="text-navy font-semibold">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-softblue flex-shrink-0" />
            <div>
              <div className="text-[9px] font-sans font-bold uppercase text-navy/40">Category</div>
              <div className="text-navy font-semibold uppercase">{post.category}</div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-56 md:h-96 bg-[#0a0d1c] rounded-md flex items-center justify-center font-serif italic text-offwhite/50 text-xs uppercase mb-8 select-none">
          [ARTICLE CARTRIDGE COVER: {post.title}]
        </div>

        <div className="prose prose-navy max-w-none text-sm md:text-base leading-relaxed text-navy/85 space-y-6">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => <h2 className="font-serif text-xl md:text-2xl text-navy font-bold uppercase mt-8 mb-4 border-b border-navy/5 pb-2" {...props} />,
              h3: ({ node, ...props }) => <h3 className="font-serif text-base md:text-lg text-gold font-bold uppercase mt-6 mb-3" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 text-justify leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-1.5" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-1.5" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              code: ({ node, inline, className, children, ...props }) => {
                return (
                  <code
                    className="bg-offwhite border border-navy/5 px-1.5 py-0.5 font-mono text-xs text-gold break-all rounded-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ node, ...props }) => (
                <pre className="bg-navy text-offwhite p-4 overflow-x-auto rounded-md shadow-premium max-w-full font-mono text-xs mb-6" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-navy/5 pt-6 mt-8">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="font-sans text-[10px] border border-navy/5 px-2.5 py-1 bg-offwhite text-navy/60 font-semibold rounded-sm">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
