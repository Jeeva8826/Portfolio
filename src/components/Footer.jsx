import { usePortfolioContext } from '../context/PortfolioContext';

export default function Footer() {
  const { personalData } = usePortfolioContext();
  return (
    <footer className="py-12 bg-brand-dark border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <div className="text-white font-bold tracking-widest uppercase mb-2">{personalData.name}</div>
          <div className="text-brand-muted text-xs tracking-[0.2em] uppercase">Software Developer</div>
        </div>
        
        <div className="text-brand-muted/50 text-xs tracking-wider">
          © {new Date().getFullYear()} {personalData.name}
        </div>
        
        <div className="flex gap-8">
          <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="hover-target text-brand-muted hover:text-white text-xs tracking-widest uppercase transition-colors duration-300">
            LinkedIn
          </a>
          <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="hover-target text-brand-muted hover:text-white text-xs tracking-widest uppercase transition-colors duration-300">
            GitHub
          </a>
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalData.email}`} target="_blank" rel="noopener noreferrer" className="hover-target text-brand-muted hover:text-white text-xs tracking-widest uppercase transition-colors duration-300">
            Email
          </a>
        </div>
        
      </div>
    </footer>
  );
}
