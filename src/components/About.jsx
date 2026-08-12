import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioContext } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { personalData } = usePortfolioContext();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-heading', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.about-statement',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-statement',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.about-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.stat-item',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 85%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 relative bg-brand-dark z-10">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="about-heading text-brand-muted text-sm tracking-[0.3em] uppercase mb-16">About</h2>
        
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="w-full md:w-3/5">
            <h3 className="about-statement text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-12">
              I build intelligent systems where software, AI and cybersecurity meet.
            </h3>
            
            <p className="about-text text-xl md:text-2xl text-brand-muted font-light leading-relaxed max-w-3xl">
              As a Computer Science student, I am passionate about exploring the intersection of these fields to create secure, efficient, and accessible digital experiences. My focus lies in developing intelligent solutions that solve complex problems while maintaining robust security and elegant user interfaces.
            </p>
          </div>
          
          <div className="w-full md:w-2/5 flex flex-col justify-center gap-12 stats-container">
            <div className="stat-item border-l border-brand-magenta/30 pl-8 py-2">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">{personalData.stats.cgpa}</div>
              <div className="text-sm tracking-widest text-brand-magenta uppercase">CGPA</div>
            </div>
            
            <div className="stat-item border-l border-brand-magenta/30 pl-8 py-2">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">{personalData.stats.problemsSolved}</div>
              <div className="text-sm tracking-widest text-brand-magenta uppercase">Problems Solved</div>
            </div>
            
            <div className="stat-item border-l border-brand-magenta/30 pl-8 py-2">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{personalData.stats.educationTimeline}</div>
              <div className="text-sm tracking-widest text-brand-magenta uppercase">Computer Science</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
