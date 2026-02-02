'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Brand */}
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" fontWeight={700}>
                AI Resume
              </Typography>
            </Link>
          </Box>

          {/* Auth actions */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {status === 'loading' ? null : session ? (
              <>
                <Button
                  component={Link}
                  href="/dashboard"
                  variant="outlined"
                  size="small"
                >
                  Dashboard
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/signin"
                  variant="outlined"
                  size="small"
                >
                  Sign in
                </Button>

                <Button
                  component={Link}
                  href="/signup"
                  variant="contained"
                  size="small"
                >
                  Get started
                </Button>
              </>
            )}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
