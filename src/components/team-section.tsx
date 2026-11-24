"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TeamMember } from '../types';
import { useLanguage } from '@/lib/i18n';

// Fallback images in case local files aren't in /public yet
const fallbackAvatars: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  '2': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  '3': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
  '4': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
};

export const TeamSection: React.FC = () => {
  const { t } = useLanguage();

  const originalMembers: TeamMember[] = useMemo(() => [
    {
      id: '1',
      name: t.team.names.matyas,
      role: t.team.roles.matyas,
      image: '/maty.png'
    },
    {
      id: '2',
      name: t.team.names.abenezer,
      role: t.team.roles.abenezer,
      image: '/abenezer.png'
    },
    {
      id: '3',
      name: t.team.names.mulisa,
      role: t.team.roles.mulisa,
      image: '/mule.jpeg'
    },
    {
      id: '4',
      name: t.team.names.sarah,
      role: t.team.roles.sarah,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    }
  ], [t.team.roles, t.team.names]);

  // Triplicate the array for seamless infinite looping
  const loopedMembers = useMemo(
    () => [...originalMembers, ...originalMembers, ...originalMembers],
    [originalMembers]
  );

  const [itemsVisible, setItemsVisible] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(originalMembers.length);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Responsive Breakpoints
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsVisible(1);
      else if (w < 768) setItemsVisible(2);
      else if (w < 1024) setItemsVisible(3);
      else setItemsVisible(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveSlide = useCallback((newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(newIndex);
  }, [isAnimating]);

  const handleNext = useCallback(() => moveSlide(currentIndex + 1), [currentIndex, moveSlide]);
  const handlePrev = useCallback(() => moveSlide(currentIndex - 1), [currentIndex, moveSlide]);

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (currentIndex >= originalMembers.length * 2) {
      setCurrentIndex(currentIndex - originalMembers.length);
    } else if (currentIndex <= originalMembers.length - 1) {
      setCurrentIndex(currentIndex + originalMembers.length);
    }
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(handleNext, 6000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [handleNext]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(handleNext, 6000);
  };

  const itemWidthPercent = 100 / itemsVisible;
  const translateX = -(currentIndex * itemWidthPercent);

  return (
    <section className="bg-[var(--bg)] py-24 sm:py-32 overflow-hidden transition-colors" id="team">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span className="w-10 h-[2px] bg-[var(--gold)]"></span>
            <span className="text-xs font-mono font-semibold text-[var(--gold)] tracking-[0.16em] uppercase">{t.team.eyebrow}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--cream)] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            {t.team.title}
          </h2>
        </div>

        {/* Carousel Viewport */}
        <div className="relative mb-12 overflow-hidden">
          <motion.div 
            className="flex"
            animate={{ x: `${translateX}%` }}
            onAnimationComplete={handleTransitionEnd}
            transition={isAnimating ? { 
              duration: 0.8,
              ease: [0.32, 0.72, 0, 1]
            } : { duration: 0 }}
          >
            {loopedMembers.map((member, idx) => (
              <div
                key={`${member.id}-${idx}`}
                className="px-2.5 shrink-0"
                style={{ width: `${itemWidthPercent}%` }}
              >
                <div className="relative h-[500px] sm:h-[600px] rounded-[2.5rem] overflow-hidden group bg-[var(--panel)] border border-[var(--rule)] shadow-md transition-all duration-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    width={800}
                    height={900}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallback && fallbackAvatars[member.id]) {
                        target.dataset.fallback = 'true';
                        target.src = fallbackAvatars[member.id];
                      }
                    }}
                  />
                  
                  {/* Gradient Overlay for the card style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Content (Bottom Left) */}
                  <div className="absolute bottom-0 left-0 p-10 w-full z-10 text-white">
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-1 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-white/80">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-12 mt-16">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { handlePrev(); resetAutoPlay(); }}
              className="w-14 h-14 rounded-full bg-[var(--panel)] border border-[var(--rule)] flex items-center justify-center text-[var(--cream)] transition-all hover:scale-105 active:scale-95 shadow-md hover:bg-[var(--gold)] hover:text-[#16211C] cursor-pointer"
              aria-label={t.team.aria.prev}
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => { handleNext(); resetAutoPlay(); }}
              className="w-14 h-14 rounded-full bg-[var(--panel)] border border-[var(--rule)] flex items-center justify-center text-[var(--cream)] transition-all hover:scale-105 active:scale-95 shadow-md hover:bg-[var(--gold)] hover:text-[#16211C] cursor-pointer"
              aria-label={t.team.aria.next}
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
