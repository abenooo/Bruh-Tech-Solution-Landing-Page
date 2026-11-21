"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  {
    id: '01',
    number: '01',
    title: 'Onboarding & Requirements',
    description: 'We align your SACCO’s policies, products, and workflows with our ready-built fintech platform.'
  },
  {
    id: '02',
    number: '02',
    title: 'Configuration',
    description: 'We configure modules—members, savings, loans, and roles—to match how your SACCO operates.'
  },
  {
    id: '03',
    number: '03',
    title: 'Deployment & Launch',
    description: 'Your system is deployed, tested, and launched with secure access for staff and members.'
  },
  {
    id: '04',
    number: '04',
    title: 'Support & Scale',
    description: 'We provide ongoing support, compliance alignment, and scalability as your SACCO grows.'
  }
];

export const ProcessTimeline: React.FC = () => {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start center", "end center"]
  });

  const heightSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const height = useTransform(heightSpring, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative bg-[#FAFAFA] dark:bg-[#0c0d0e] py-16 sm:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 sm:top-32 z-30 mb-10 lg:mb-0">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="text-red-600 font-bold tracking-widest text-xs uppercase">// Process //</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-4">
                A proven fintech process <br className="hidden sm:block"/> for SACCOs.
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
                Codex Africa delivers a ready-to-use SACCO fintech platform—configured to your needs and launched fast.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div ref={stepsContainerRef} className="relative space-y-8 sm:space-y-16">
                <div className="absolute left-[1.15rem] sm:left-10 top-10 sm:top-[5.5rem] bottom-0 w-[2px] bg-gray-200/60 dark:bg-gray-800">
                    <motion.div style={{ height }} className="absolute top-0 left-0 w-full bg-red-500 origin-top">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
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
        <div className="flex items-center justify-center w-10 h-10 sm:w-20 sm:h-20 bg-[#FAFAFA] dark:bg-[#141618] rounded-full border border-gray-200 dark:border-gray-750 group-hover:border-red-300 transition-colors duration-500 relative overflow-hidden">
           <motion.div style={{ opacity }} className="absolute inset-0 rounded-full border-[2px] border-red-500" />
           <span className="text-[10px] sm:text-base font-mono font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white z-10">{step.number}</span>
        </div>
      </div>
      <div className="flex-grow">
        <div className="bg-white dark:bg-[#141618] p-6 sm:p-10 rounded-[1.5rem] sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-500 border border-gray-100 dark:border-white/10">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3 tracking-tight">{step.title}</h3>
            <p className="text-sm sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
