import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioContext } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceEducation() {
  const { experienceData, educationData } = usePortfolioContext();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-32 relative bg-brand-dark z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-24">
        
        {/* Experience Side */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-brand-muted text-sm tracking-[0.3em] uppercase mb-16">Experience</h2>
          
          <div className="timeline-container relative pl-8 border-l border-brand-magenta/30 flex flex-col gap-16">
            {experienceData.map((exp, index) => (
              <div key={index} className="timeline-item relative">
                {/* Timeline Dot */}
                <div className="absolute w-3 h-3 bg-brand-magenta rounded-full -left-[38px] top-2 shadow-[0_0_10px_rgba(154,16,64,0.8)]"></div>
                
                <h3 className="text-2xl md:text-3xl font-medium mb-2">{exp.role}</h3>
                <h4 className="text-brand-magenta font-semibold tracking-wider uppercase text-sm mb-6">{exp.company}</h4>
                <p className="text-brand-muted font-light leading-relaxed mb-6">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="text-xs tracking-wider text-white border border-white/20 px-3 py-1 uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Side */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-brand-muted text-sm tracking-[0.3em] uppercase mb-16">Education</h2>
          
          <div className="timeline-container relative pl-8 border-l border-brand-magenta/30 flex flex-col gap-16">
            {educationData.map((edu, index) => (
              <div key={index} className="timeline-item relative">
                {/* Timeline Dot */}
                <div className="absolute w-3 h-3 bg-white rounded-full -left-[38px] top-2"></div>
                
                <h3 className="text-2xl md:text-3xl font-medium mb-2">{edu.degree}</h3>
                <h4 className="text-white font-semibold tracking-wider uppercase text-sm mb-2">{edu.institution}</h4>
                <div className="text-brand-muted text-sm tracking-widest mb-6">{edu.duration}</div>
                
                <div className="inline-block border border-brand-magenta/50 bg-brand-magenta/10 px-4 py-2">
                  <span className="text-brand-magenta text-xs tracking-[0.2em] uppercase mr-4">CGPA</span>
                  <span className="text-white font-bold text-xl">{edu.cgpa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
