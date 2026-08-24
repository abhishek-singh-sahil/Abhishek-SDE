"use client";

import React, { useEffect, useState } from 'react';

export default function PixelCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updateDeviceType = () => {
      setIsMobile(!mediaQuery.matches);
    };

    updateDeviceType();
    mediaQuery.addEventListener('change', updateDeviceType);

    if (isMobile) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      mediaQuery.removeEventListener('change', updateDeviceType);
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer elegant ring */}
      <div 
        className={`w-8 h-8 rounded-full border border-gold/45 transition-all duration-300 ${
          isClicked 
            ? 'scale-75 bg-gold/10' 
            : isHovering 
              ? 'scale-125 border-navy bg-navy/5' 
              : 'scale-100'
        }`}
      />

      {/* Center dot - modeled as a tiny 3x3 pixel square to keep a subtle pixel identity */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-navy transition-colors ${
          isClicked 
            ? 'bg-gold' 
            : isHovering 
              ? 'bg-gold' 
              : 'bg-navy'
        }`}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
