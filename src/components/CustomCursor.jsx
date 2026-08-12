import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device has touch capability
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const cursor = cursorRef.current;
    
    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out'
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
        gsap.to(cursor, {
          scale: 3,
          backgroundColor: 'rgba(154, 16, 64, 0.2)', // brand-magenta with opacity
          borderColor: 'rgba(154, 16, 64, 0.8)',
          duration: 0.3,
          ease: 'power3.out'
        });
        
        if (target.closest('.project-card')) {
          gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
        }
      } else {
        setIsHovering(false);
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: '#fff',
          borderColor: '#fff',
          duration: 0.3,
          ease: 'power3.out'
        });
        gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white"
    >
      <span ref={textRef} className="text-[3px] font-bold text-white opacity-0 uppercase tracking-widest absolute">
        View
      </span>
    </div>
  );
}
