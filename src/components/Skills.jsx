import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioContext } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const { skillsData } = usePortfolioContext();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-heading',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.skill-category',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.skill-tag',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 75%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative bg-brand-burgundy/10 z-10 border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="skills-heading text-brand-muted text-sm tracking-[0.3em] uppercase mb-20 text-center md:text-left">What I Work With</h2>
        
        <div className="skills-container flex flex-col gap-16">
          {skillsData.map((category, index) => (
            <div key={index} className="skill-category flex flex-col md:flex-row md:items-start gap-6 md:gap-24 border-b border-white/5 pb-10">
              <h3 className="w-full md:w-1/4 text-2xl font-light tracking-wide text-brand-magenta">
                {category.category}
              </h3>
              <div className="w-full md:w-3/4 flex flex-wrap gap-4">
                {category.items.map((skill, i) => (
                  <span 
                    key={i} 
                    className="skill-tag hover-target px-6 py-3 bg-white/5 hover:bg-brand-magenta/20 border border-white/10 hover:border-brand-magenta/50 text-white rounded-full text-sm tracking-wider transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
