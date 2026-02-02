'use client';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import ErrorIcon from '@mui/icons-material/Error';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
  keyframes
} from '@mui/material';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import {
  getPasswordStrengthColor,
  getPasswordStrengthPercentage,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateUsername
} from './validation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  general?: string;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
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
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    'weak' | 'medium' | 'strong' | undefined
  >(undefined);

  // Handle field change
  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Real-time validation for password strength
    if (field === 'password') {
      const result = validatePassword(value);
      setPasswordStrength(result.strength);
    }

    // Clear error for this field when user starts typing
    if (touched[field]) {
      const validationResult = getFieldValidation(field, value);
      if (validationResult.valid) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined
        }));
      }
    }
  };

  // Handle field blur
  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));

    // Validate on blur
    const validationResult = getFieldValidation(field, formData[field as keyof FormData]);
    if (!validationResult.valid && validationResult.error) {
      setErrors((prev) => ({
        ...prev,
        [field]: validationResult.error
      }));
    }
  };

  // Get validation for a specific field
  const getFieldValidation = (
    field: string,
    value: string
  ): { valid: boolean; error?: string } => {
    switch (field) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return validatePasswordMatch(formData.password, value);
      case 'username':
        return validateUsername(value);
      default:
        return { valid: true };
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate email
    const emailResult = validateEmail(formData.email);
    if (!emailResult.valid) {
      newErrors.email = emailResult.error;
    }

    // Validate username
    const usernameResult = validateUsername(formData.username);
    if (!usernameResult.valid) {
      newErrors.username = usernameResult.error;
    }

    // Validate password
    const passwordResult = validatePassword(formData.password);
    if (!passwordResult.valid) {
      newErrors.password = passwordResult.error;
    }

    // Validate password match
    const matchResult = validatePasswordMatch(formData.password, formData.confirmPassword);
    if (!matchResult.valid) {
      newErrors.confirmPassword = matchResult.error;
    }

    // Check terms agreement
    if (!agreeToTerms) {
      newErrors.general = 'You must agree to the terms and privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle signup
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Call your signup API here
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.username
        })
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors((prev) => ({
          ...prev,
          general: data.message || 'An error occurred during signup'
        }));
      } else {
        // Redirect to signin or dashboard
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/dashboard',
        });
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: 'An error occurred. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.username &&
    agreeToTerms &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    !errors.username;

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
                  animation: `${float} 3s ease-in-out infinite`,
                  transition: 'all 0.3s ease-in-out',
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
                Get Started
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ maxWidth: 300 }}
              >
                Create your account and start building your AI-powered resume
              </Typography>
            </Stack>

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

            {/* Form */}
            <form onSubmit={handleSignUp}>
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

                {/* Username Field */}
                <Box>
                  <TextField
                    fullWidth
                    label="Username"
                    value={formData.username}
                    onChange={e => handleFieldChange('username', e.target.value)}
                    onBlur={() => handleFieldBlur('username')}
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    placeholder="john_doe"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon
                            sx={{
                              color: touched.username && !errors.username
                                ? 'success.main'
                                : 'text.secondary',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: touched.username && !errors.username && (
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
                  {formData.password && (
                    <Box sx={{ mt: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Password strength:
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: getPasswordStrengthColor(passwordStrength),
                            fontWeight: 600,
                            textTransform: 'capitalize',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {passwordStrength || 'N/A'}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={getPasswordStrengthPercentage(passwordStrength)}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'divider',
                          overflow: 'hidden',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            bgcolor: getPasswordStrengthColor(passwordStrength),
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
                    value={formData.confirmPassword}
                    onChange={e => handleFieldChange('confirmPassword', e.target.value)}
                    onBlur={() => handleFieldBlur('confirmPassword')}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    placeholder="••••••••"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon
                            sx={{
                              color: touched.confirmPassword && !errors.confirmPassword
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
                            {showConfirmPassword ? (
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

                {/* Terms & Conditions */}
                <Tooltip
                  title={
                    !agreeToTerms
                      ? 'You must agree to the terms and privacy policy'
                      : ''
                  }
                  placement="top"
                >
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreeToTerms}
                          onChange={e => setAgreeToTerms(e.target.checked)}
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
                        <Typography variant="body2">
                          I agree to the{' '}
                          <Link
                            href="/terms"
                            sx={{
                              color: 'primary.main',
                              fontWeight: 500,
                              cursor: 'pointer',
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                              position: 'relative',
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -1,
                                left: 0,
                                width: 0,
                                height: 1,
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
                            Terms of Service
                          </Link>
                          {' '}and{' '}
                          <Link
                            href="/privacy"
                            sx={{
                              color: 'primary.main',
                              fontWeight: 500,
                              cursor: 'pointer',
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                              position: 'relative',
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -1,
                                left: 0,
                                width: 0,
                                height: 1,
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
                            Privacy Policy
                          </Link>
                        </Typography>
                      }
                    />
                  </Box>
                </Tooltip>

                {/* Sign Up Button */}
                <Button
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={loading || !isFormValid}
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
                      transform: isFormValid ? 'translateY(-2px)' : 'none',
                      boxShadow: isFormValid
                        ? '0 12px 32px rgba(25, 103, 210, 0.4)'
                        : 'none',
                      '&::before': {
                        left: isFormValid ? '100%' : '-100%'
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
                  {loading ? 'Creating account...' : 'Sign up'}
                </Button>
              </Stack>
            </form>

            {/* Divider */}
            <Divider sx={{ my: 3 }} />

            {/* Login Link */}
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
              <Link
                href="/signin"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
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
                Sign in
              </Link>
            </Stack>
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