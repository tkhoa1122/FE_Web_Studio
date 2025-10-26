'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface StaggeredChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number; // Delay between each child (in ms)
}

export const StaggeredChildren = ({ 
  children, 
  className = '', 
  staggerDelay = 100 
}: StaggeredChildrenProps) => {
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

  // Convert children to array for easier manipulation
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`
            transition-all duration-700 ease-out
            ${isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
            }
          `}
          style={{
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Professional staggered animation for sections
export const StaggeredSections = ({ 
  children, 
  className = '', 
  staggerDelay = 150 
}: StaggeredChildrenProps) => {
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

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`
            transition-all duration-800 ease-out
            ${isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
            }
          `}
          style={{
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Smooth cascade animation for cards/grid items
export const CascadeGrid = ({ 
  children, 
  className = '', 
  staggerDelay = 80 
}: StaggeredChildrenProps) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`
            transition-all duration-600 ease-out
            ${isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-6 scale-95'
            }
          `}
          style={{
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
