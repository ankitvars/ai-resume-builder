import { createTheme, PaletteMode } from '@mui/material/styles';

export function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#1967D2',
        light: '#4A90E2',
        dark: '#1551B0',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#388E3C',
        light: '#66BB6A',
        dark: '#2E7D32',
        contrastText: '#ffffff'
      },
      success: {
        main: '#4CAF50',
        light: '#81C784',
        dark: '#388E3C',
        contrastText: '#ffffff'
      },
      error: {
        main: '#F44336',
        light: '#EF5350',
        dark: '#D32F2F',
        contrastText: '#ffffff'
      },
      warning: {
        main: '#FF9800',
        light: '#FFB74D',
        dark: '#F57C00',
        contrastText: '#ffffff'
      },
      info: {
        main: '#2196F3',
        light: '#64B5F6',
        dark: '#1976D2',
        contrastText: '#ffffff'
      },
      background: {
        default: mode === 'dark' ? '#0b0b0b' : '#fafafa',
        paper: mode === 'dark' ? '#121212' : '#ffffff'
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#212121',
        secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
        disabled: mode === 'dark' ? 'rgba(255, 255, 255, 0.38)' : 'rgba(0, 0, 0, 0.38)'
      }
    },
    typography: {
      fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 900,
        lineHeight: 1.2,
        letterSpacing: '-0.5px'
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 800,
        lineHeight: 1.3,
        letterSpacing: '-0.3px'
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 800,
        lineHeight: 1.4,
        letterSpacing: '-0.2px'
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: 1.4,
        letterSpacing: '0px'
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: 1.5
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.6
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0.5px'
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0.5px'
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '0.4px'
      },
      button: {
        fontSize: '0.95rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.5px',
        textTransform: 'none'
      }
    },
    shape: {
      borderRadius: 8
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            borderRadius: 8,
            padding: '10px 24px',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          },
          contained: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)'
            },
            '&:active': {
              transform: 'translateY(0px)'
            }
          },
          outlined: {
            border: '2px solid',
            '&:hover': {
              borderWidth: '2px'
            }
          },
          sizeSmall: {
            fontSize: '0.8rem',
            padding: '6px 16px'
          },
          sizeMedium: {
            fontSize: '0.95rem',
            padding: '10px 24px'
          },
          sizeLarge: {
            fontSize: '1rem',
            padding: '12px 32px'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2
              }
            },
            '& .MuiOutlinedInput-input': {
              padding: '12px 14px',
              fontSize: '0.95rem'
            },
            '& .MuiInputBase-input::placeholder': {
              opacity: 0.7
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }
        }
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontSize: '0.95rem',
            fontWeight: 500
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease'
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease',
            borderRadius: 8
          }
        }
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            '& .MuiSvgIcon-root': {
              transition: 'color 0.2s ease'
            }
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid',
            borderColor: 'divider'
          },
          indicator: {
            height: 3,
            borderRadius: '3px 3px 0 0',
            transition: 'all 0.3s ease'
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            minWidth: 120,
            '&:hover': {
              color: 'primary.main'
            }
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: 'divider'
          }
        }
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 3,
            transition: 'all 0.3s ease'
          },
          bar: {
            borderRadius: 3,
            transition: 'all 0.3s ease'
          }
        }
      }
    }
  });
}

/**
 * Hook to get theme based on mode
 * Usage: const theme = useTheme();
 */
export const createResponsiveTheme = (mode: PaletteMode) => {
  const baseTheme = getTheme(mode);

  return {
    ...baseTheme,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920
      }
    }
  };
};
