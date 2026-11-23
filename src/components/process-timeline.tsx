"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ProcessStep } from '../types';
import { useLanguage } from '@/lib/i18n';

export const ProcessTimeline: React.FC = () => {
  const { t } = useLanguage();
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start center", "end center"]
  });

  const heightSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const height = useTransform(heightSpring, [0, 1], ["0%", "100%"]);

  const steps = t.process.steps;

  return (
    <section id="process" className="relative bg-[var(--bg)] py-16 sm:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 sm:top-32 z-30 mb-10 lg:mb-0">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="text-[var(--gold)] font-mono font-bold tracking-widest text-xs uppercase">{t.process.tag}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--cream)] tracking-tight leading-[1.1] mb-4">
                {t.process.title}
              </h2>
              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-md">
                {t.process.subhead}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div ref={stepsContainerRef} className="relative space-y-8 sm:space-y-16">
                <div className="absolute left-[1.15rem] sm:left-10 top-10 sm:top-[5.5rem] bottom-0 w-[2px] bg-[var(--rule)]">
                    <motion.div style={{ height }} className="absolute top-0 left-0 w-full bg-[var(--gold)] origin-top">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[var(--gold)] rounded-full"></div>
                    </motion.div>
                </div>

                {steps.map((step, index) => (
                    <TimelineStep key={step.id} step={step} index={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineStep: React.FC<{ step: ProcessStep; index: number }> = ({ step }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center center"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const opacity = useTransform(smoothProgress, [0.5, 1], [0, 1]);
  
  return (
    <div ref={ref} className="relative flex items-stretch gap-6 sm:gap-12 group">
      <div className="flex-shrink-0 relative z-10 flex flex-col justify-start pt-2">
        <div className="flex items-center justify-center w-10 h-10 sm:w-20 sm:h-20 bg-[var(--panel)] rounded-full border border-[var(--rule)] group-hover:border-[var(--gold)] transition-colors duration-500 relative overflow-hidden">
           <motion.div style={{ opacity }} className="absolute inset-0 rounded-full border-[2px] border-[var(--gold)]" />
           <span className="text-[10px] sm:text-base font-mono font-medium text-[var(--muted)] group-hover:text-[var(--cream)] z-10">{step.number}</span>
        </div>
      </div>
      <div className="flex-grow">
        <div className="bg-[var(--panel)] p-6 sm:p-10 rounded-[1.5rem] sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-500 border border-[var(--rule)]">
            <h3 className="text-lg sm:text-2xl font-bold text-[var(--cream)] mb-2 sm:mb-3 tracking-tight">{step.title}</h3>
            <p className="text-sm sm:text-lg text-[var(--muted)] leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
