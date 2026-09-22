import { RouterOutlet } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ConfigService } from '../services/config.service';


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

interface ThemeColors {
  primary: string;
  primaryVariant: string;
  secondary: string;
  secondaryVariant: string;
  error: string;
  light: ColorScheme;
  dark: ColorScheme & Pick<ThemeColors, 'primary' | 'secondary'>;
}

interface ThemeTypography {
  fontFamily: string;
  fontSizeBase: string;
  borderRadius: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './app.css',
  host: {
    '[style.color-scheme]': 'mode()',
    '[style.--font-app]': 'typography().fontFamily',
    '[style.--font-size-base]': 'typography().fontSizeBase',
    '[style.--border-radius]': 'typography().borderRadius',
    '[style.--color-primary]': 'palette().primary',
    '[style.--color-primary-variant]': 'colors().primaryVariant',
    '[style.--color-secondary]': 'palette().secondary',
    '[style.--color-secondary-variant]': 'colors().secondaryVariant',
    '[style.--color-error]': 'palette().error',
    '[style.--color-background]': 'palette().background',
    '[style.--color-surface]': 'palette().surface',
    '[style.--color-on-primary]': 'palette().onPrimary',
    '[style.--color-on-primary-variant]': 'palette().onPrimaryVariant',
    '[style.--color-on-secondary]': 'palette().onSecondary',
    '[style.--color-on-background]': 'palette().onBackground',
    '[style.--color-on-surface]': 'palette().onSurface',
    '[style.--color-on-error]': 'palette().onError',
    '[style.--color-light-background]': 'colors().light.background',
    '[style.--color-light-surface]': 'colors().light.surface',
    '[style.--color-light-text]': 'colors().light.onBackground',
    '[style.--color-dark-background]': 'colors().dark.background',
    '[style.--color-dark-surface]': 'colors().dark.surface',
    '[style.--color-dark-text]': 'colors().dark.onBackground'
  }
})
export class App {
  private readonly configService = inject(ConfigService);

  readonly colors = toSignal(this.configService.getValue<ThemeColors>('ui.theme.colors').pipe(
    filter((colors): colors is ThemeColors => colors !== undefined)
  ), {
    initialValue: {
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
        onPrimaryVariant: '#FF0000',
        onSecondary: '#000000',
        onBackground: '#3D4852',
        onSurface: '#3D4852',
        onError: '#FFFFFF'
      },
      dark: {
        primary: '#FF9E95',
        secondary: '#A8DCD0',
        background: '#121212',
        surface: '#1E1E1E',
        error: '#CF6679',
        onPrimary: '#000000',
        onPrimaryVariant: '#FF0000',
        onSecondary: '#000000',
        onBackground: '#FAF8F5',
        onSurface: '#FAF8F5',
        onError: '#000000'
      }
    }
  });

  readonly mode = toSignal(this.configService.getValue<'light' | 'dark'>('ui.theme.defaultMode'), {
    initialValue: 'dark'
  });

  readonly typography = toSignal(this.configService.getValue<ThemeTypography>('ui.theme.typography').pipe(
    filter((typography): typography is ThemeTypography => typography !== undefined)
  ), {
    initialValue: {
      fontFamily: 'Roboto, system-ui, sans-serif',
      fontSizeBase: '16px',
      borderRadius: '8px'
    }
  });

  readonly palette = computed(() => {
    const colors = this.colors();
    return this.mode() === 'dark'
      ? colors.dark
      : { ...colors.light, primary: colors.primary, secondary: colors.secondary };
  });
}
