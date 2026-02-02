'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box component="footer" py={6} bgcolor="background.paper" mt={8}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Built with Next.js and MUI — <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
        </Typography>
      </Container>
    </Box>
  );
}
