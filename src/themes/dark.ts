import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  status: {
    danger: 'orange',
  },
  palette: {
    mode: 'dark',
    neutral: {
      main: grey[900]
    }
  },
});

export default theme;