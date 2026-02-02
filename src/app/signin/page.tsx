'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Link,
  Checkbox,
  FormControlLabel,
  IconButton,
  keyframes
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string | null;
}

interface FormData {
  email: string;
  password: string;
}

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function SignInPage() {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field change
  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (touched[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Handle field blur
  const handleFieldBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // Handle email sign-in
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        setErrors((prev: FormErrors) => ({
          ...prev,
          general:
            result.error === 'CredentialsSignin'
              ? 'Invalid email or password'
              : result.error
        }));
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'An error occurred. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  // Handle social sign-in
  const handleSocialSignIn = (provider: string) => {
    setSocialLoading(provider);
    signIn(provider, { callbackUrl: '/dashboard' });
  };

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
                AI Resume
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ maxWidth: 280 }}
              >
                Developer-first resumes & portfolios that actually convert
              </Typography>
            </Stack>

            {/* Tabs */}
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              centered
              sx={{
                mb: 3,
                borderBottom: 'none',
                '& .MuiTabs-flexContainer': {
                  borderBottom: 'none',
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                  bgcolor: 'primary.main',
                  transition: 'all 0.3s ease',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    color: 'primary.main'
                  },
                  '&:hover': {
                    color: 'primary.light',
                    transform: 'translateY(-2px)'
                  }
                }
              }}
            >
              <Tab label="Social login" />
              <Tab label="Email" />
            </Tabs>

            {/* General Error Alert */}
            {errors.general && (
              <Alert
                severity="error"
                icon={<ErrorIcon />}
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
                {errors.general}
              </Alert>
            )}

            {/* Social Login Tab */}
            {tab === 0 && (
              <Stack spacing={2}>
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  endIcon={
                    socialLoading === 'github' ? (
                      <CircularProgress size={20} />
                    ) : (
                      <ArrowForwardIcon />
                    )
                  }
                  disabled={socialLoading !== null}
                  onClick={() => handleSocialSignIn('github')}
                  sx={{
                    justifyContent: 'space-between',
                    textTransform: 'none',
                    py: 1.6,
                    borderRadius: 2,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    border: '2px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      bgcolor: theme => theme.palette.mode === 'dark'
                        ? 'rgba(25, 103, 210, 0.1)'
                        : 'rgba(25, 103, 210, 0.05)',
                      transition: 'left 0.3s ease'
                    },
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateX(4px)',
                      '&::before': {
                        left: 0
                      }
                    },
                    '&:disabled': {
                      borderColor: 'divider'
                    }
                  }}
                >
                  Continue with GitHub
                </Button>

                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  endIcon={
                    socialLoading === 'github' ? (
                      <CircularProgress size={20} />
                    ) : (
                      <ArrowForwardIcon />
                    )
                  }
                  disabled={socialLoading !== null}
                  onClick={() => handleSocialSignIn('linkedin')}
                  sx={{
                    justifyContent: 'space-between',
                    textTransform: 'none',
                    py: 1.6,
                    borderRadius: 2,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    border: '2px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      bgcolor: theme => theme.palette.mode === 'dark'
                        ? 'rgba(25, 103, 210, 0.1)'
                        : 'rgba(25, 103, 210, 0.05)',
                      transition: 'left 0.3s ease'
                    },
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateX(4px)',
                      '&::before': {
                        left: 0
                      }
                    },
                    '&:disabled': {
                      borderColor: 'divider'
                    }
                  }}
                >
                  Continue with LinkedIn 
                </Button>

                <Divider sx={{ my: 1 }} />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"
                  sx={{ fontSize: '0.8rem' }}
                >
                  By continuing, you agree to our{' '}
                  <Link
                    href="/terms"
                    underline="hover"
                    sx={{
                      cursor: 'pointer',
                      color: 'primary.main',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: 'primary.dark'
                      }
                    }}
                  >
                    Terms
                  </Link>
                  {' '}&{' '}
                  <Link
                    href="/privacy"
                    underline="hover"
                    sx={{
                      cursor: 'pointer',
                      color: 'primary.main',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: 'primary.dark'
                      }
                    }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              </Stack>
            )}

            {/* Email Sign-in Tab */}
            {tab === 1 && (
              <form onSubmit={handleEmailSignIn}>
                <Stack spacing={2.5}>
                  {/* Email Field */}
                  <Box>
                    <TextField
                      fullWidth
                      label="Email address"
                      type="email"
                      value={formData.email}
                      onChange={e => handleFieldChange('email', e.target.value)}
                      onBlur={() => handleFieldBlur('email')}
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      placeholder="you@example.com"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon
                              sx={{
                                color: touched.email && !errors.email
                                  ? 'success.main'
                                  : 'text.secondary',
                                transition: 'all 0.3s ease'
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: touched.email && !errors.email && (
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
                  </Box>

                  {/* Password Field */}
                  <Box>
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={e => handleFieldChange('password', e.target.value)}
                      onBlur={() => handleFieldBlur('password')}
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      placeholder="••••••••"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              sx={{
                                color: touched.password && !errors.password
                                  ? 'success.main'
                                  : 'text.secondary',
                                transition: 'all 0.3s ease'
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{
                                color: 'text.secondary',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  color: 'primary.main',
                                  transform: 'scale(1.1)'
                                }
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
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
                  </Box>

                  {/* Remember Me & Forgot Password */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          size="small"
                          sx={{
                            color: 'text.secondary',
                            transition: 'all 0.2s ease',
                            '&.Mui-checked': {
                              color: 'primary.main',
                              transform: 'scale(1.1)'
                            },
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          Remember me
                        </Typography>
                      }
                    />
                    <Link
                      href="/forgot-password"
                      underline="hover"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -2,
                          left: 0,
                          width: 0,
                          height: 2,
                          bgcolor: 'primary.dark',
                          transition: 'width 0.3s ease'
                        },
                        '&:hover': {
                          color: 'primary.dark',
                          '&::after': {
                            width: '100%'
                          }
                        }
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  {/* Sign In Button */}
                  <Button
                    fullWidth
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={20} /> : null}
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
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 32px rgba(25, 103, 210, 0.4)',
                        '&::before': {
                          left: '100%'
                        }
                      },
                      '&:active': {
                        transform: 'translateY(0)'
                      },
                      '&:disabled': {
                        bgcolor: 'primary.main',
                        opacity: 0.8
                      }
                    }}
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Button>

                  {/* Divider */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ my: 1 }}
                  >
                    <Divider sx={{ flex: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      or continue with
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                  </Stack>

                  {/* Social Quick Links */}
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleSocialSignIn('github')}
                      disabled={socialLoading !== null}
                      sx={{
                        py: 1.4,
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: 'divider',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: theme =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(25, 103, 210, 0.08)'
                              : 'rgba(25, 103, 210, 0.05)',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <GitHubIcon />
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleSocialSignIn('linkedin')}
                      disabled={socialLoading !== null}
                      sx={{
                        py: 1.4,
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: 'divider',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: theme =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(25, 103, 210, 0.08)'
                              : 'rgba(25, 103, 210, 0.05)',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <LinkedInIcon />
                    </Button>
                  </Stack>
                </Stack>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'center', sm: 'center' }}
          justifyContent="center"
          spacing={0.5}
          mt={3}
        >
          <Typography variant="body2" color="text.secondary">
            New here?
          </Typography>
          <Link
            href="/signup"
            underline="hover"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -2,
                left: 0,
                width: 0,
                height: 2,
                bgcolor: 'primary.dark',
                transition: 'width 0.3s ease'
              },
              '&:hover': {
                color: 'primary.dark',
                '&::after': {
                  width: '100%'
                }
              }
            }}
          >
            Get started
          </Link>
        </Stack>

        {/* Security Badge */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
          mt={2}
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
