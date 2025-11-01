'use client';

import { AdminLayout } from './components/layout/AdminLayout';
import type { ReactNode } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';

export default function AdminLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const segments = useSelectedLayoutSegments();
  const firstSegment = segments[0];

  // Exclude /admin/admin-login from AdminLayout
  if (firstSegment === 'admin-login') {
    return <>{children}</>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
