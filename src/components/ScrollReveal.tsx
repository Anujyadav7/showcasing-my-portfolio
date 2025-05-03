
import React, { useRef, useEffect, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );
    
    const current = ref.current;
    if (current) {
      observer.observe(current);
    }
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);
  
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
