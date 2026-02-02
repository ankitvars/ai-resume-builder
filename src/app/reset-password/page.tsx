'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
  CircularProgress,
  IconButton,
  LinearProgress,
  keyframes
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';

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
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface PasswordStrength {
  level: 'weak' | 'medium' | 'strong';
  score: number;
}

export default function ResetPassword() {
  const router = useRouter();
  const token = useSearchParams()?.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false
  });

  // Calculate password strength
  const getPasswordStrength = (pwd: string): PasswordStrength => {
    let score = 0;

    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    let level: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 5) level = 'strong';
    else if (score >= 3) level = 'medium';

    return { level, score };
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = (level: string) => {
    switch (level) {
      case 'weak': return '#F44336';
      case 'medium': return '#FF9800';
      case 'strong': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getStrengthPercentage = (level: string) => {
    switch (level) {
      case 'weak': return 33;
      case 'medium': return 66;
      case 'strong': return 100;
      default: return 0;
    }
  };

  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    if (!isPasswordValid) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!doPasswordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'background.default',
          p: 2
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          Invalid or missing reset token. Please request a new password reset link.
        </Alert>
      </Box>
    );
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
                {success ? 'Password Reset!' : 'Reset Password'}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ maxWidth: 300 }}
              >
                {success
                  ? 'Your password has been successfully reset'
                  : 'Enter your new password below'}
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
                  Your password has been reset successfully! Redirecting to sign in...
                </Alert>

                <LinearProgress
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'divider',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      bgcolor: 'success.main'
                    }
                  }}
                />
              </Stack>
            ) : (
              <>
                {/* Error Alert */}
                {error && (
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
                    {error}
                  </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2.5}>
                    {/* Password Field */}
                    <Box>
                      <TextField
                        fullWidth
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                        error={touched.password && !isPasswordValid}
                        helperText={
                          touched.password && !isPasswordValid
                            ? 'Password must be at least 8 characters'
                            : ''
                        }
                        placeholder="••••••••"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon
                                sx={{
                                  color: touched.password && isPasswordValid
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
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
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

                      {/* Password Strength Indicator */}
                      {password && (
                        <Box sx={{ mt: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              Password strength:
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: getStrengthColor(passwordStrength.level),
                                fontWeight: 600,
                                textTransform: 'capitalize',
                                transition: 'color 0.3s ease'
                              }}
                            >
                              {passwordStrength.level}
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={getStrengthPercentage(passwordStrength.level)}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'divider',
                              overflow: 'hidden',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                bgcolor: getStrengthColor(passwordStrength.level),
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                '&::after': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                  animation: `${shimmer} 2s infinite`
                                }
                              }
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Confirm Password Field */}
                    <Box>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                        error={touched.confirmPassword && !doPasswordsMatch}
                        helperText={
                          touched.confirmPassword && !doPasswordsMatch
                            ? 'Passwords do not match'
                            : ''
                        }
                        placeholder="••••••••"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon
                                sx={{
                                  color: touched.confirmPassword && doPasswordsMatch
                                    ? 'success.main'
                                    : 'text.secondary',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              {doPasswordsMatch ? (
                                <CheckCircleIcon
                                  sx={{
                                    color: 'success.main',
                                    animation: `${fadeIn} 0.3s ease-out`,
                                    mr: 1
                                  }}
                                />
                              ) : (
                                <IconButton
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                              )}
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
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

                    {/* Submit Button */}
                    <Button
                      fullWidth
                      type="submit"
                      size="large"
                      variant="contained"
                      disabled={loading || !isPasswordValid || !doPasswordsMatch}
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
                          transform: isPasswordValid && doPasswordsMatch ? 'translateY(-2px)' : 'none',
                          boxShadow: isPasswordValid && doPasswordsMatch
                            ? '0 12px 32px rgba(25, 103, 210, 0.4)'
                            : '0 8px 24px rgba(25, 103, 210, 0.3)',
                          '&::before': {
                            left: isPasswordValid && doPasswordsMatch ? '100%' : '-100%'
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
                      {loading ? 'Resetting password...' : 'Reset password'}
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