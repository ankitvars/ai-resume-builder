'use client';

import { signIn } from 'next-auth/react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function SignInPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Stack spacing={3} width="100%">
          <Typography variant="h4" fontWeight={700}>
            Sign in
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Sign in to access your dashboard and manage resumes.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          >
            Continue with GitHub
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
