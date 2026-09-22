// hooks/useThemeColors.ts
// Custom hook : combine useEffect + useConfig, ne retourne pas de JSX.
import { useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { useConfig } from '../context/ConfigContext';

interface ColorScheme {
    background: string;
    surface: string;
    text: string;
    border: string;
}

interface ThemeColorsConfig {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    info: string;
    light: ColorScheme;
    dark: ColorScheme;
}

interface ThemeTypographyConfig {
    fontFamily: string;
}

const DEFAULT_COLORS: ThemeColorsConfig = {
    primary: '#c42222',
    secondary: '#64748B',
    accent: '#F59E0B',
    success: '#10B981',
    warning: '#EF4444',
    info: '#06B6D4',
    light: {
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#0F172A',
        border: '#E2E8F0',
    },
    dark: {
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F8FAFC',
        border: '#334155',
    },
};

// Applique les couleurs de la config comme variables CSS sur la racine du document.
export function useThemeColors() {
    const { getValue, loading } = useConfig();
    const colors = getValue<ThemeColorsConfig>('ui.theme.colors') ?? DEFAULT_COLORS;
    const typography = getValue<ThemeTypographyConfig>('ui.theme.typography');

    // Theme MUI basé sur les couleurs et la typographie de la config.
    const MuiTheme = createTheme({
        palette: {
            primary: {
                main: colors.primary,
            },
            secondary: {
                main: colors.secondary,
            }
        },
        typography: {
            fontFamily: typography?.fontFamily ?? 'Roboto, system-ui, sans-serif',
        },
    });

    // Manipulation directe du DOM = effet de bord, donc dans un useEffect.
    useEffect(() => {
        if (loading) return;

        const root = document.documentElement.style;

        if (typography?.fontFamily) {
            root.setProperty('--font-app', typography.fontFamily);
        }
        root.setProperty('--color-primary', colors.primary);
        root.setProperty('--color-secondary', colors.secondary);
        root.setProperty('--color-accent', colors.accent);
        root.setProperty('--color-success', colors.success);
        root.setProperty('--color-warning', colors.warning);
        root.setProperty('--color-info', colors.info);
        root.setProperty('--color-light-background', colors.light.background);
        root.setProperty('--color-light-surface', colors.light.surface);
        root.setProperty('--color-light-text', colors.light.text);
        root.setProperty('--color-light-border', colors.light.border);
        root.setProperty('--color-dark-background', colors.dark.background);
        root.setProperty('--color-dark-surface', colors.dark.surface);
        root.setProperty('--color-dark-text', colors.dark.text);
        root.setProperty('--color-dark-border', colors.dark.border);
    }, [colors, loading, typography]);

    return MuiTheme;
}
