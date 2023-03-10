import { extendTheme } from '@chakra-ui/react';

export const myTheme = extendTheme({
  colors: {
    brand: '#3182ce',
    secondary: '#f0f0f0',
    titleLight: '#e1e1e1',
    titleDark: '#2a4365',
    subtitleDark: '#bee3f8',
    subtitleLight: '#2c5282',
    textDark: '#1b1b1b',
    textLight: '#e4e4e4',
  },
  breakpoints: {
    sm: '40rem', //640px
    md: '48rem', //768px
    lg: '64rem', //1024px
    xl: '80rem', //1280px
    '2xl': '96rem', //1536px
  },
});
