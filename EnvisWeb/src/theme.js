import { createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

// color design tokens export
export const tokens = (mode) => ({
	...(mode === 'dark'
		? {
				grey: {
					100: '#e0e0e0',
					200: '#c2c2c2',
					300: '#a3a3a3',
					400: '#858585',
					500: '#666666',
					600: '#525252',
					700: '#3d3d3d',
					800: '#292929',
					900: '#141414',
				},
				primary: {
					100: '#310145',
					200: '#310145',
					300: '#797a7c',
					400: '#4d4d50',
					500: '#202124',
					600: '#1a1a1d',
					700: '#131416',
					800: '#0d0d0e',
					900: '#060707',
				},
				greenAccent: {
					100: '#cfebde',
					200: '#9fd8bc',
					300: '#6fc49b',
					400: '#3fb179',
					500: '#0f9d58',
					600: '#0c7e46',
					700: '#095e35',
					800: '#063f23',
					900: '#031f12',
				},
				redAccent: {
					100: '#f8dad7',
					200: '#f1b4af',
					300: '#e98f87',
					400: '#e2695f',
					500: '#db4437',
					600: '#af362c',
					700: '#832921',
					800: '#581b16',
					900: '#2c0e0b',
				},
				blueAccent: {
					100: '#d9e7fd',
					200: '#b3cefb',
					300: '#8eb6f8',
					400: '#689df6',
					500: '#4285f4',
					600: '#356ac3',
					700: '#285092',
					800: '#1a3562',
					900: '#0d1b31',
				},
		  }
		: {
				grey: {
					100: '#141414',
					200: '#292929',
					300: '#3d3d3d',
					400: '#525252',
					500: '#666666',
					600: '#858585',
					700: '#a3a3a3',
					800: '#c2c2c2',
					900: '#e0e0e0',
				},
				primary: {
					100: '#310145',
					200: '#310145',
					300: '#0c101b',
					400: '#f2f0f0', // manually changed
					500: '#141b2d',
					600: '#1F2A40',
					700: '#727681',
					800: '#a1a4ab',
					900: '#d0d1d5',
				},
				greenAccent: {
					100: '#031f12',
					200: '#063f23',
					300: '#095e35',
					400: '#0c7e46',
					500: '#0f9d58',
					600: '#3fb179',
					700: '#6fc49b',
					800: '#9fd8bc',
					900: '#cfebde',
				},
				redAccent: {
					100: '#2c0e0b',
					200: '#581b16',
					300: '#832921',
					400: '#af362c',
					500: '#db4437',
					600: '#e2695f',
					700: '#e98f87',
					800: '#f1b4af',
					900: '#f8dad7',
				},
				blueAccent: {
					100: '#0d1b31',
					200: '#1a3562',
					300: '#285092',
					400: '#356ac3',
					500: '#4285f4',
					600: '#689df6',
					700: '#8eb6f8',
					800: '#b3cefb',
					900: '#d9e7fd',
				},
		  }),
});

// mui theme settings
export const themeSettings = (mode) => {
	const colors = tokens(mode);
	return {
		palette: {
			mode: mode,
			...(mode === 'dark'
				? {
						// palette values for dark mode
						primary: {
							main: colors.primary[500],
						},
						secondary: {
							main: colors.greenAccent[500],
						},
						neutral: {
							dark: colors.grey[700],
							main: colors.grey[500],
							light: colors.grey[100],
						},
						background: {
							default: colors.primary[500],
						},
				  }
				: {
						// palette values for light mode
						primary: {
							main: colors.primary[100],
						},
						secondary: {
							main: colors.greenAccent[500],
						},
						neutral: {
							dark: colors.grey[700],
							main: colors.grey[500],
							light: colors.grey[100],
						},
						background: {
							default: '#fcfcfc',
						},
				  }),
		},
		typography: {
			fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
			fontSize: 12,
			h1: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 40,
			},
			h2: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 32,
			},
			h3: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 24,
			},
			h4: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 20,
			},
			h5: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 16,
			},
			h6: {
				fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
				fontSize: 14,
			},
		},
	};
};

// context for color mode
export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

export const useMode = () => {
	const [mode, setMode] = useState('light');

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () =>
				setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
		}),
		[]
	);

	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return [theme, colorMode];
};
