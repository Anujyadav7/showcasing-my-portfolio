
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <span className="text-xl font-display font-bold highlight-gradient">SM Manager</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#videos" className="nav-link">Videos</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
          
          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="flex flex-col space-y-1.5 items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : 'closed'} p-4`}>
        <div className="flex justify-end mb-8">
          <button onClick={toggleMenu} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="flex flex-col space-y-4">
            <li><a href="#home" className="block py-2 px-4 text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>Home</a></li>
            <li><a href="#projects" className="block py-2 px-4 text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>Projects</a></li>
            <li><a href="#videos" className="block py-2 px-4 text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>Videos</a></li>
            <li><a href="#about" className="block py-2 px-4 text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>About</a></li>
            <li><a href="#contact" className="block py-2 px-4 text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>Contact</a></li>
          </ul>
        </nav>
      </div>
      
      {/* Overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
