import { createTheme, PaletteMode } from '@mui/material/styles';

export function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#0b0b0b' : '#fafafa',
        paper: mode === 'dark' ? '#121212' : '#ffffff'
      }
    },
    typography: {
      fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(',')
    }
  });
}
