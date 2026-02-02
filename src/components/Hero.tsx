'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Image from 'next/image';

export default function Hero() {
  return (
    <Box component="section" py={{ xs: 8, md: 14 }} bgcolor="background.paper">
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 5, md: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Copy */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack spacing={2}>
              <Chip
                label="ATS-friendly • Developer-first"
                size="small"
                sx={{ alignSelf: 'flex-start' }}
              />

              <Typography
                variant="h2"
                component="h1"
                fontWeight={900}
                lineHeight={1.1}
              >
                Build resumes & portfolios that{' '}
                <Box component="span" color="primary.main">
                  get interviews
                </Box>
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                maxWidth={560}
              >
                AI-assisted resumes, live preview, and deployable portfolios.
                Built for developers who want results—not fluff.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 3 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href="/signup"
                  sx={{
                    px: 3.5,
                    py: 1.4,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 1.5,
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4
                    }
                  }}
                >
                  Get started free
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="/docs"
                  sx={{
                    px: 3.5,
                    py: 1.4,
                    fontWeight: 500,
                    textTransform: 'none',
                    borderRadius: 1.5
                  }}
                >
                  View docs
                </Button>
              </Stack>


              <Typography
                variant="caption"
                color="text.secondary"
              >
                No credit card • Export PDF • Deploy portfolio
              </Typography>
            </Stack>
          </Box>

          {/* Visual */}
          <Box
            sx={{
              width: { xs: '100%', md: 520 },
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 6,
              bgcolor: 'background.default'
            }}
            aria-hidden
          >
            <Image
              src="/hero-preview.png"
              alt="Resume and portfolio preview"
              width={1040}
              height={720}
              priority
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
