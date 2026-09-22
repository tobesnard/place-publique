// hooks/useThemeColors.ts
// Custom hook : combine useEffect + useConfig, ne retourne pas de JSX.
import { useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { useConfig } from '../context/ConfigContext';

interface ColorScheme {
    background: string;
    surface: string;
    error: string;
    onPrimary: string;
    onPrimaryVariant: string;
    onSecondary: string;
    onBackground: string;
    onSurface: string;
    onError: string;
}

interface ThemeColorsConfig {
    primary: string;
    primaryVariant: string;
    secondary: string;
    secondaryVariant: string;
    error: string;
    light: ColorScheme;
    dark: ColorScheme & Pick<ThemeColorsConfig, 'primary' | 'secondary'>;
}

interface ThemeTypographyConfig {
    fontFamily: string;
    fontSizeBase: string;
    borderRadius: string;
}

const DEFAULT_COLORS: ThemeColorsConfig = {
    primary: '#F07167',
    primaryVariant: '#C84B42',
    secondary: '#7BAF9E',
    secondaryVariant: '#548877',
    error: '#B00020',
    light: {
        background: '#FAF8F5',
        surface: '#FFFFFF',
        error: '#B00020',
        onPrimary: '#000000',
        onPrimaryVariant: '#B0B0B0',
        onSecondary: '#000000',
        onBackground: '#3D4852',
        onSurface: '#3D4852',
        onError: '#FFFFFF',
    },
    dark: {
        primary: '#FF9E95',
        secondary: '#A8DCD0',
        background: '#121212',
        surface: '#1E1E1E',
        error: '#CF6679',
        onPrimary: '#000000',
        onPrimaryVariant: '#B0B0B0',
        onSecondary: '#000000',
        onBackground: '#FAF8F5',
        onSurface: '#FAF8F5',
        onError: '#000000',
    },
};

function getPalette(colors: ThemeColorsConfig, mode: 'light' | 'dark') {
    return mode === 'dark'
        ? colors.dark
        : { ...colors.light, primary: colors.primary, secondary: colors.secondary, onPrimaryVariant: colors.light.onPrimaryVariant };
}

// Applique les couleurs de la config comme variables CSS sur la racine du document.
export function useThemeColors() {
    const { getValue, loading } = useConfig();
    const colors = getValue<ThemeColorsConfig>('ui.theme.colors') ?? DEFAULT_COLORS;
    const typography = getValue<ThemeTypographyConfig>('ui.theme.typography');
    const mode = getValue<'light' | 'dark'>('ui.theme.defaultMode') ?? 'dark';
    const palette = getPalette(colors, mode);

    // Theme MUI basé sur les couleurs et la typographie de la config.
    const MuiTheme = createTheme({
        palette: {
            primary: {
                main: palette.primary,
                dark: colors.primaryVariant,
                contrastText: palette.onPrimary,
            },
            secondary: {
                main: palette.secondary,
                dark: colors.secondaryVariant,
                contrastText: palette.onSecondary,
            },
            error: {
                main: palette.error,
                contrastText: palette.onError,
            },
            background: {
                default: palette.background,
                paper: palette.surface,
            },
            text: {
                primary: palette.onBackground,
                secondary: palette.onSurface,
            },
        },
        typography: {
            fontFamily: typography?.fontFamily ?? 'Roboto, system-ui, sans-serif',
        },
        shape: {
            borderRadius: Number.parseInt(typography?.borderRadius ?? '8px', 10),
        },
    });

    // Manipulation directe du DOM = effet de bord, donc dans un useEffect.
    useEffect(() => {
        if (loading) return;

        const activePalette = getPalette(colors, mode);
        const root = document.documentElement.style;

        if (typography?.fontFamily) {
            root.setProperty('--font-app', typography.fontFamily);
        }
        root.setProperty('--font-size-base', typography?.fontSizeBase ?? '16px');
        root.setProperty('--border-radius', typography?.borderRadius ?? '8px');
        root.setProperty('--color-primary', activePalette.primary);
        root.setProperty('--color-primary-variant', colors.primaryVariant);
        root.setProperty('--color-on-primary-variant', activePalette.onPrimaryVariant);
        root.setProperty('--color-secondary', activePalette.secondary);
        root.setProperty('--color-error', activePalette.error);
        root.setProperty('--color-background', activePalette.background);
        root.setProperty('--color-surface', activePalette.surface);
        root.setProperty('--color-on-primary', activePalette.onPrimary);
        root.setProperty('--color-on-secondary', activePalette.onSecondary);
        root.setProperty('--color-on-background', activePalette.onBackground);
        root.setProperty('--color-on-surface', activePalette.onSurface);
        root.setProperty('--color-on-error', activePalette.onError);
        root.setProperty('--color-light-background', colors.light.background);
        root.setProperty('--color-light-surface', colors.light.surface);
        root.setProperty('--color-light-text', colors.light.onBackground);
        root.setProperty('--color-dark-background', colors.dark.background);
        root.setProperty('--color-dark-surface', colors.dark.surface);
        root.setProperty('--color-dark-text', colors.dark.onBackground);
    }, [colors, loading, mode, typography]);

    return MuiTheme;
}
