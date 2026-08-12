import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import profileImg from '../assets/newprofile.jpg';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const bgGlowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background glow mouse follow
      const onMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 100;
        const yPos = (clientY / window.innerHeight - 0.5) * 100;
        
        gsap.to(bgGlowRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: 'power3.out'
        });

        gsap.to(imgRef.current, {
          x: -xPos * 0.2,
          y: -yPos * 0.2,
          rotationY: xPos * 0.05,
          rotationX: -yPos * 0.05,
          duration: 1.5,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', onMouseMove);

      // Initial reveal animation
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-eyebrow', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      .fromTo('.hero-text-line',
        { opacity: 0, y: 50, rotation: 2 },
        { opacity: 1, y: 0, rotation: 0, duration: 1, stagger: 0.15, ease: 'power4.out' },
        "-=0.5"
      )
      .fromTo('.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.5"
      )
      .fromTo('.hero-buttons button',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        "-=0.8"
      )
      .fromTo(imgRef.current,
        { opacity: 0, scale: 0.9, filter: 'brightness(0.5) blur(10px)' },
        { opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)', duration: 2, ease: 'power2.out' },
        "-=1.5"
      );

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 bg-noise opacity-30"></div>
      
      <div 
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-brand-magenta rounded-full mix-blend-screen filter blur-[150px] opacity-20 z-0 pointer-events-none"
      ></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between h-full">
        
        {/* Left Content */}
        <div ref={textRef} className="w-full md:w-3/5 flex flex-col justify-center h-full order-2 md:order-1 mt-12 md:mt-0">
          <p className="hero-eyebrow text-brand-magenta font-semibold tracking-[0.2em] text-xs md:text-sm mb-6 uppercase">
            Computer Science • Software Developer
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[0.95] tracking-tight mb-8">
            <div className="overflow-hidden py-1"><div className="hero-text-line">BUILDING</div></div>
            <div className="overflow-hidden py-1"><div className="hero-text-line text-brand-red">INTELLIGENT</div></div>
            <div className="overflow-hidden py-1"><div className="hero-text-line">SYSTEMS.</div></div>
          </h1>
          
          <p className="hero-desc text-brand-muted text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed">
            Software Developer focused on building intelligent, secure and meaningful software experiences.
          </p>
          
          <div className="hero-buttons flex flex-wrap gap-6">
            <button 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('work');
                if (element) window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
              }}
              className="hover-target px-8 py-4 bg-brand-magenta hover:bg-brand-red text-white text-sm font-semibold tracking-widest uppercase transition-colors duration-300"
            >
              Explore My Work
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('experience');
                if (element) window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
              }}
              className="hover-target px-8 py-4 border border-white/20 hover:border-brand-magenta text-white text-sm font-semibold tracking-widest uppercase transition-all duration-300"
            >
              View Resume
            </button>
          </div>
        </div>

        {/* Right Portrait */}
        <div className="w-full md:w-2/5 h-[50vh] md:h-[80vh] flex items-center justify-center relative order-1 md:order-2 perspective-1000">
          <div className="absolute inset-0 bg-brand-magenta filter blur-[100px] opacity-20 rounded-full"></div>
          <img 
            ref={imgRef}
            src={profileImg} 
            alt="Jeevananth C" 
            className="w-full h-full object-cover object-center max-h-[600px] max-w-[450px] mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 ease-in-out z-10 custom-drop-shadow"
            style={{ 
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }}
          />
        </div>
      </div>
    </section>
  );
}
