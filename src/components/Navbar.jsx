import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePortfolioContext } from '../context/PortfolioContext';

export default function Navbar() {
  const { personalData } = usePortfolioContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-brand-dark/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')}
          className="text-white font-bold text-lg tracking-widest uppercase hover-target"
        >
          {personalData.name}
        </a>

        <nav className="hidden md:flex gap-8">
          {['About', 'Work', 'Skills', 'Experience', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item.toLowerCase())}
              className="text-sm font-medium text-brand-muted hover:text-white transition-colors duration-300 uppercase tracking-widest hover-target"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
