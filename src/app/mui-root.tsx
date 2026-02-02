'use client';

import ThemeRegistry from '@/components/ThemeRegistry';
import ClientLayout from './client-layout';

export default function MuiRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <ClientLayout>{children}</ClientLayout>
    </ThemeRegistry>
  );
}
