'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ThemeToggle from '@/components/ThemeToggle';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box
        component="header"
        sx={{
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            py: 1
          }}
        >
          <ThemeToggle />
        </Container>
      </Box>

      <Box component="main">{children}</Box>
    </>
  );
}
