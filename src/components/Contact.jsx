import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioContext } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { personalData } = usePortfolioContext();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-title-line',
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.contact-heading',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.contact-text',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-heading',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.contact-btn',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-links',
            start: 'top 90%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="py-32 md:py-48 relative bg-brand-burgundy/20 z-10 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-brand-magenta rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <h2 className="contact-heading text-6xl md:text-8xl lg:text-[8rem] font-bold leading-[0.9] tracking-tight mb-12 uppercase">
            <div className="overflow-hidden py-1"><div className="contact-title-line">LET'S BUILD</div></div>
            <div className="overflow-hidden py-1"><div className="contact-title-line text-brand-red">SOMETHING</div></div>
            <div className="overflow-hidden py-1"><div className="contact-title-line">MEANINGFUL.</div></div>
          </h2>
          
          <p className="contact-text text-xl md:text-2xl text-brand-muted font-light mb-20">
            Have an idea, project or opportunity? Let's connect.
          </p>
          
          <div className="contact-links flex flex-col md:flex-row gap-6 md:gap-12 w-full md:w-auto">
            <a 
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn hover-target px-12 py-5 bg-white text-brand-dark hover:bg-brand-magenta hover:text-white text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 w-full md:w-auto text-center"
            >
              LinkedIn
            </a>
            
            <a 
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn hover-target px-12 py-5 border border-white/20 hover:border-white text-white text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 w-full md:w-auto text-center"
            >
              GitHub
            </a>
            
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalData.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn hover-target px-12 py-5 border border-transparent text-brand-muted hover:text-brand-magenta text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 w-full md:w-auto text-center"
            >
              Email
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}
