import React from 'react';
import { motion } from 'framer-motion';

export function GoldButton({
  variant = 'solid', // solid, outline, text
  size = 'md',       // sm, md, lg
  children,
  className = '',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium uppercase tracking-wider transition-all duration-300 outline-none focus:ring-2 focus:ring-gold/30";
  
  const variants = {
    solid: "bg-gold text-white hover:bg-navy hover:text-white border-2 border-gold hover:border-navy shadow-premium hover:shadow-premiumHover",
    outline: "bg-transparent text-navy hover:bg-navy hover:text-white border-2 border-navy hover:border-navy",
    goldOutline: "bg-transparent text-gold hover:bg-gold hover:text-white border-2 border-gold",
    navy: "bg-navy text-white hover:bg-gold border-2 border-navy hover:border-gold",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function PremiumCard({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`bg-white border border-black/5 p-6 md:p-8 rounded-lg shadow-premium hover:shadow-premiumHover transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  center = false,
  className = '',
}) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : 'text-left'} ${className}`}>
      {subtitle && (
        <span className="text-[10px] font-sans font-semibold tracking-widest text-sage uppercase block mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-serif text-navy font-bold leading-tight">
        {title}
      </h2>
      <div className={`h-1 w-12 bg-gold mt-4 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}

export function AnimateReveal({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
