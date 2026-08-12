import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioContext } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { projectsData } = usePortfolioContext();
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const scrollContentRef = useRef(null);

  useEffect(() => {
    // Determine if mobile (disable horizontal scroll on small screens)
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-heading',
            start: 'top 80%',
          }
        }
      );

      if (!isMobile && scrollContentRef.current && scrollWrapperRef.current) {
        const panels = gsap.utils.toArray('.project-panel');
        
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + scrollContentRef.current.offsetWidth,
          }
        });
      } else {
        // Mobile vertical reveal
        gsap.utils.toArray('.project-panel').forEach(panel => {
          gsap.fromTo(panel, 
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1,
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%'
              }
            }
          );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-32 relative bg-brand-dark z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <h2 className="projects-heading text-brand-muted text-sm tracking-[0.3em] uppercase">Selected Work</h2>
      </div>

      <div ref={scrollWrapperRef} className="w-full md:h-screen md:flex md:items-center">
        <div 
          ref={scrollContentRef} 
          className="flex flex-col md:flex-row w-full md:w-[400vw] h-full md:h-[80vh] px-6 md:px-0"
        >
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className="project-panel project-card w-full md:w-[100vw] h-full flex flex-col justify-center px-0 md:px-12 lg:px-24 mb-24 md:mb-0 relative group"
            >
              <div className="flex flex-col md:flex-row h-full md:h-[80%] rounded-2xl bg-brand-dark/50 border border-white/5 overflow-hidden group-hover:border-brand-magenta/30 transition-colors duration-500">
                
                {/* Project Info */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between relative z-10 bg-gradient-to-br from-brand-dark to-brand-burgundy/80 overflow-y-auto">
                  <div>
                    <div className="text-brand-magenta text-6xl md:text-8xl font-bold opacity-20 mb-2 transition-transform duration-500 group-hover:-translate-y-2">{project.id}</div>
                    <h4 className="text-xs tracking-[0.3em] text-brand-muted uppercase mb-2">{project.subtitle}</h4>
                    <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-muted transition-all duration-500">{project.title}</h3>
                    <p className="text-base md:text-lg text-brand-muted font-light mb-6 max-w-xl line-clamp-4 md:line-clamp-none">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies?.slice(0, 5).map((tech, i) => (
                        <span key={i} className="text-xs tracking-wider text-brand-muted border border-white/10 px-3 py-1 rounded-full uppercase">
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 5 && (
                        <span className="text-xs tracking-wider text-brand-magenta border border-brand-magenta/30 px-3 py-1 rounded-full uppercase">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                    
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover-target text-sm font-semibold tracking-[0.2em] uppercase flex items-center gap-4 text-white group-hover:text-brand-magenta transition-colors duration-300">
                        View Project
                        <span className="w-12 h-[1px] bg-white group-hover:bg-brand-magenta transition-colors duration-300 transform origin-left group-hover:scale-x-150"></span>
                      </a>
                    ) : (
                      <button className="hover-target text-sm font-semibold tracking-[0.2em] uppercase flex items-center gap-4 text-white group-hover:text-brand-magenta transition-colors duration-300 opacity-50 cursor-not-allowed" title="Link coming soon">
                        View Project
                        <span className="w-12 h-[1px] bg-white/50 transition-colors duration-300 transform origin-left"></span>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Project Visual Area */}
                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-[#050505]">
                  <div className="absolute inset-0 bg-brand-magenta mix-blend-screen opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-10 pointer-events-none"></div>
                  
                  {/* Abstract representations based on theme */}
                  {project.theme === 'cyber' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105">
                       <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/20 via-brand-dark to-brand-dark"></div>
                       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMzMwMTAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20"></div>
                    </div>
                  )}
                  {project.theme === 'minimal' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105 bg-gradient-to-t from-brand-dark to-brand-burgundy/40">
                      <div className="w-48 h-48 rounded-full border border-brand-magenta/30"></div>
                      <div className="absolute w-32 h-32 rounded-full border border-brand-magenta/50"></div>
                    </div>
                  )}
                  {project.theme === 'water' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105 bg-gradient-to-b from-brand-dark to-[#0f1a24]">
                      <div className="w-full h-1/2 absolute bottom-0 bg-brand-magenta/10 blur-xl"></div>
                    </div>
                  )}
                  {project.theme === 'simple' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-105 bg-brand-dark border-l border-white/5">
                      <div className="grid grid-cols-4 grid-rows-4 w-full h-full opacity-10">
                        {Array.from({length: 16}).map((_, i) => <div key={i} className="border border-white/20"></div>)}
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/5 font-bold text-4xl tracking-widest whitespace-nowrap -rotate-90 md:rotate-0">
                    [ VISUAL COMING SOON ]
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
