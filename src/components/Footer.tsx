
import React from 'react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="glassmorphic border-t border-white/5 mt-16 backdrop-blur-lg bg-background/30">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-display font-bold text-xl mb-2 highlight-gradient">SM Manager</h3>
            <p className="text-foreground/70 text-sm">Creating engaging social media content.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <SocialLinks className="mb-4" />
            <div className="text-foreground/50 text-sm">
              &copy; {currentYear} Social Media Manager. All rights reserved.
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 flex justify-center md:justify-start">
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li><a href="#home" className="text-sm text-foreground/70 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#projects" className="text-sm text-foreground/70 hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#videos" className="text-sm text-foreground/70 hover:text-primary transition-colors">Videos</a></li>
              <li><a href="#about" className="text-sm text-foreground/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
