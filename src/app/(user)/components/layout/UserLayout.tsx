'use client';

import { ReactNode } from 'react';
import { PageTransition } from '../common/PageTransition';

interface UserLayoutProps {
  children: ReactNode;
}

export const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <PageTransition className="min-h-screen">
      {children}
    </PageTransition>
  );
};
