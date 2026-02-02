'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Alert,
  Link,
  CircularProgress,
  keyframes
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !isEmailValid) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        py: 4,
        px: 2,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: theme => theme.palette.mode === 'dark'
            ? 'rgba(25, 103, 210, 0.03)'
            : 'rgba(25, 103, 210, 0.02)',
          animation: `${pulse} 4s ease-in-out infinite`,
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={12}
          sx={{
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: theme =>
              theme.palette.mode === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                : '0 20px 60px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
            animation: `${fadeIn} 0.6s ease-out`,
            '&:hover': {
              boxShadow: theme =>
                theme.palette.mode === 'dark'
                  ? '0 25px 70px rgba(0, 0, 0, 0.5)'
                  : '0 25px 70px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-4px)'
            }
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            {/* Brand */}
            <Stack spacing={1.5} alignItems="center" mb={4}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 20,
                  boxShadow: '0 8px 24px rgba(25, 103, 210, 0.3)',
                  transition: 'all 0.3s ease-in-out',
                  animation: `${float} 3s ease-in-out infinite`,
                  '&:hover': {
                    transform: 'scale(1.1) rotate(5deg)',
                    boxShadow: '0 12px 32px rgba(25, 103, 210, 0.4)'
                  }
                }}
              >
                AR
              </Box>

              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: 'primary.main',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 3,
                    bgcolor: 'secondary.main',
                    transition: 'width 0.3s ease',
                    borderRadius: 2
                  },
                  '&:hover::after': {
                    width: '100%'
                  }
                }}
              >
                {success ? 'Check Your Email' : 'Forgot Password?'}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ maxWidth: 320 }}
              >
                {success
                  ? "We've sent a password reset link to your email address"
                  : "No worries! Enter your email and we'll send you a reset link"}
              </Typography>
            </Stack>

            {/* Success State */}
            {success ? (
              <Stack spacing={3} sx={{ animation: `${fadeIn} 0.5s ease-out` }}>
                <Alert
                  severity="success"
                  icon={<CheckCircleIcon />}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'success.light',
                    bgcolor: theme =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(76, 175, 80, 0.1)'
                        : 'rgba(76, 175, 80, 0.05)'
                  }}
                >
                  Password reset link sent successfully! Please check your inbox and spam folder.
                </Alert>

                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  href="/signin"
                  sx={{
                    py: 1.6,
                    borderRadius: 2,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    border: '2px solid',
                    borderColor: 'divider',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: theme =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(25, 103, 210, 0.08)'
                          : 'rgba(25, 103, 210, 0.05)',
                      transform: 'translateX(-4px)'
                    }
                  }}
                >
                  Back to Sign In
                </Button>
              </Stack>
            ) : (
              <>
                {/* Error Alert */}
                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 2.5,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'error.light',
                      bgcolor: theme =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(244, 67, 54, 0.1)'
                          : 'rgba(244, 67, 54, 0.05)',
                      animation: `${fadeIn} 0.3s ease-out`
                    }}
                  >
                    {error}
                  </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Email address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched(true)}
                      error={touched && !email && !isEmailValid}
                      helperText={
                        touched && email && !isEmailValid
                          ? 'Please enter a valid email address'
                          : ''
                      }
                      placeholder="you@example.com"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon
                              sx={{
                                color: touched && isEmailValid
                                  ? 'success.main'
                                  : 'text.secondary',
                                transition: 'all 0.3s ease'
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: touched && isEmailValid && (
                          <InputAdornment position="end">
                            <CheckCircleIcon
                              sx={{
                                color: 'success.main',
                                animation: `${fadeIn} 0.3s ease-out`
                              }}
                            />
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          transition: 'all 0.2s ease',
                          fontSize: '0.95rem',
                          '&:hover': {
                            borderColor: 'primary.main'
                          },
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 3px rgba(25, 103, 210, 0.1)',
                            borderColor: 'primary.main',
                            transform: 'translateY(-2px)'
                          }
                        },
                        '& .MuiOutlinedInput-input': {
                          py: 1.6
                        }
                      }}
                    />

                    <Button
                      fullWidth
                      type="submit"
                      size="large"
                      variant="contained"
                      disabled={loading || !email || !isEmailValid}
                      endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                      sx={{
                        py: 1.6,
                        borderRadius: 2,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        bgcolor: 'primary.main',
                        color: 'white',
                        boxShadow: '0 8px 24px rgba(25, 103, 210, 0.3)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transition: 'left 0.5s ease'
                        },
                        '&:hover': {
                          bgcolor: 'primary.dark',
                          transform: email && isEmailValid ? 'translateY(-2px)' : 'none',
                          boxShadow: email && isEmailValid
                            ? '0 12px 32px rgba(25, 103, 210, 0.4)'
                            : '0 8px 24px rgba(25, 103, 210, 0.3)',
                          '&::before': {
                            left: email && isEmailValid ? '100%' : '-100%'
                          }
                        },
                        '&:active': {
                          transform: 'translateY(0)'
                        },
                        '&:disabled': {
                          bgcolor: 'primary.main',
                          opacity: 0.6
                        }
                      }}
                    >
                      {loading ? 'Sending...' : 'Send reset link'}
                    </Button>

                    <Button
                      fullWidth
                      size="large"
                      variant="text"
                      startIcon={<ArrowBackIcon />}
                      href="/signin"
                      sx={{
                        py: 1.2,
                        borderRadius: 2,
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: 'text.secondary',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: theme =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(25, 103, 210, 0.08)'
                              : 'rgba(25, 103, 210, 0.05)',
                          transform: 'translateX(-4px)'
                        }
                      }}
                    >
                      Back to Sign In
                    </Button>
                  </Stack>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        {/* Security Badge */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
          mt={3}
          sx={{
            typography: 'caption',
            color: 'text.secondary'
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              bgcolor: 'success.main',
              animation: `${pulse} 2s ease-in-out infinite`
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Your data is encrypted and secure
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}