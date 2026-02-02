'use client';

import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from '@/theme';
import { ThemeProviderClient, useThemeContext } from '@/context/ThemeContext';

function InnerTheme({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeContext();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderClient>
      <InnerTheme>{children}</InnerTheme>
    </ThemeProviderClient>
  );
}
