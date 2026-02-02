'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

type NavLink = {
  label: string;
  href: string;
};

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const navLinks: NavLink[] = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }
  ];

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Brand */}
          <Box sx={{ flexGrow: { xs: 1, md: 0 }, mr: { md: 4 } }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                AI Resume Builder
              </Typography>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              gap: 1
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                sx={{
                  color: 'text.primary',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Desktop Auth Actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {status === 'loading' ? null : session ? (
              <>
                <Button
                  component={Link}
                  href="/dashboard"
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Dashboard
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  sx={{ textTransform: 'none' }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/signin"
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Sign in
                </Button>

                <Button
                  component={Link}
                  href="/signup"
                  variant="contained"
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Get started free
                </Button>
              </>
            )}
            <ThemeToggle />
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
            <ThemeToggle />
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile Menu */}
          <Menu
            id="mobile-menu"
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {navLinks.map((link) => (
              <MenuItem
                key={link.label}
                component="a"
                href={link.href}
                onClick={handleMobileMenuClose}
              >
                {link.label}
              </MenuItem>
            ))}
            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', my: 1 }} />
            {status === 'loading' ? null : session ? (
              <>
                <MenuItem
                  component={Link}
                  href="/dashboard"
                  onClick={handleMobileMenuClose}
                >
                  Dashboard
                </MenuItem>
                <MenuItem onClick={() => {
                  handleMobileMenuClose();
                  signOut({ callbackUrl: '/' });
                }}>
                  Sign out
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  component={Link}
                  href="/signin"
                  onClick={handleMobileMenuClose}
                >
                  Sign in
                </MenuItem>
                <MenuItem
                  component={Link}
                  href="/signup"
                  onClick={handleMobileMenuClose}
                >
                  Get started free
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}