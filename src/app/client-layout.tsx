'use client';

import Box from '@mui/material/Box';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <Box component="main">{children}</Box>;
}
