import { nextui } from '@nextui-org/theme';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      layout: {
        fontSize: {
          tiny: '0.75rem',
          small: '0.875rem',
          medium: '1rem',
          large: '1.125rem',
        },
        lineHeight: {
          tiny: '1rem',
          small: '1.25rem',
          medium: '1.5rem',
          large: '1.75rem',
        },
        radius: {
          small: '0.25rem',
          medium: '0.5rem',
          large: '0.75rem',
        },
        borderWidth: {
          small: '1px',
          medium: '2px',
          large: '3px',
        },
      },
      themes: {
        light: {
          layout: {
            boxShadow: {
              small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              medium:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              large:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
          },
          colors: {
            background: '#FFFFFF',
            foreground: '#1D1D1F',
            primary: {
              50: '#E3F2FD',
              100: '#BBDEFB',
              200: '#90CAF9',
              300: '#64B5F6',
              400: '#42A5F5',
              500: '#2196F3', // macOS blue
              600: '#1E88E5',
              700: '#1976D2',
              800: '#1565C0',
              900: '#0D47A1',
            },
            secondary: {
              50: '#F3E5F5',
              100: '#E1BEE7',
              200: '#CE93D8',
              300: '#BA68C8',
              400: '#AB47BC',
              500: '#9C27B0', // macOS purple
              600: '#8E24AA',
              700: '#7B1FA2',
              800: '#6A1B9A',
              900: '#4A148C',
            },
            success: '#34C759', // macOS green
            warning: '#FF9500', // macOS orange
            danger: '#FF3B30', // macOS red
            focus: '#0070F3',
            divider: '#E5E5EA',
          },
        },
        dark: {
          layout: {
            boxShadow: {
              small: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
              medium:
                '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
              large:
                '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
            },
          },
          colors: {
            background: '#1D1D1F',
            foreground: '#F5F5F7',
            primary: {
              50: '#E3F2FD',
              100: '#BBDEFB',
              200: '#90CAF9',
              300: '#64B5F6',
              400: '#42A5F5',
              500: '#0A84FF', // macOS blue (dark mode)
              600: '#1E88E5',
              700: '#1976D2',
              800: '#1565C0',
              900: '#0D47A1',
            },
            secondary: {
              50: '#F3E5F5',
              100: '#E1BEE7',
              200: '#CE93D8',
              300: '#BA68C8',
              400: '#AB47BC',
              500: '#BF5AF2', // macOS purple (dark mode)
              600: '#8E24AA',
              700: '#7B1FA2',
              800: '#6A1B9A',
              900: '#4A148C',
            },
            success: '#30D158', // macOS green (dark mode)
            warning: '#FF9F0A', // macOS orange (dark mode)
            danger: '#FF453A', // macOS red (dark mode)
            focus: '#0070F3',
            divider: '#38383A',
          },
        },
      },
    }),
  ],
};


