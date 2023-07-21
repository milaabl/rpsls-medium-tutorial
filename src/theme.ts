import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
        common: {
          black: '#000000',
          white: '#FFF',
        },
        purple: {
            main: '#6564A9',
        },
        lavender: {
          muted: '#F1F1FE',
          light: '#DBDAFF',
          main: '#E5E5FE',
          dark: '#AEADE7',
        },
        green: {
          lightest: '#DEF1F2',
          light: '#198281',
          main: '#025559',
          contrastText: '#FFF',
        },
        peach: {
          light: '#FFECDB',
          main: '#F6AA8F',
        },
        yellow: {
          lightest: '#FFFAE3',
          light: '#FCEABE',
          main: '#F4C64F',
        },
        orange: {
          light: '#F97D52',
          main: '#F15A25'
        },
        blue: {
          light: '#E0EDFF',
          main: '#102049',
          contrastText: '#FFF',
        },
        success: {
          light: '#90EE90',
          main: '#4CAA5F',
        },
        error: {
          main: '#BF0202',
        },
        gray: {
          light: '#F5F4F8',
          inactive: '#C7C7C7',
          muted: '#818181',
          main: '#E9E9E9',
        },
        text: {
          primary: '#000',
          secondary: '#C7C7C7',
          disabled: '#C7C7C7',
        },
        action: {
          disabled: '#818181',
          hover: '#F1F1FE',
          selected: '#DBDAFF',
        },
      },
});

declare module '@mui/material/styles' {
    interface Theme {
    }
  
    interface ThemeOptions {
    }
  
    interface Palette {
      purple?: Palette['primary'];
      lavender?: Palette['primary'];
      green?: Palette['primary'];
      peach?: Palette['primary'];
      yellow?: Palette['primary'];
      orange?: Palette['primary'];
      blue?: Palette['primary'];
      gray?: Palette['primary'];
    }
  
    interface PaletteOptions {
      purple?: PaletteOptions['primary'];
      lavender?: PaletteOptions['primary'];
      green?: PaletteOptions['primary'];
      peach?: PaletteOptions['primary'];
      yellow?: PaletteOptions['primary'];
      orange?: PaletteOptions['primary'];
      blue?: PaletteOptions['primary'];
      gray?: PaletteOptions['primary'];
    }
  
    interface PaletteColor {
      lightest?: string;
      muted?: string;
      inactive?: string;
      border?: string;
    }
  
    interface SimplePaletteColorOptions {
      lightest?: string;
      muted?: string;
      inactive?: string;
      border?: string;
    }
  }