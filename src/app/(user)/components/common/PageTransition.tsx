'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    // Trigger exit animation
    setIsVisible(false);
    
    // After exit animation completes, update path and trigger enter animation
    const timer = setTimeout(() => {
      setCurrentPath(pathname);
      setIsVisible(true);
    }, 200); // Slightly longer delay for smoother transition

    return () => clearTimeout(timer);
  }, [pathname]);

  // Initial load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Professional staggered animation component
export const StaggeredTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setCurrentPath(pathname);
      setIsVisible(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        transition-all duration-800 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Cascade animation for child elements
export const CascadeTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        transition-all duration-1000 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Smooth fade transition
export const FadeTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        transition-opacity duration-600 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Slide transition
export const SlideTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-12'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Scale transition
export const ScaleTransition = ({ children, className = '' }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        transition-all duration-500 ease-out
        ${isVisible 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};
