import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ConfigService } from '../services/config.service';


interface ColorScheme {
  background: string;
  surface: string;
  text: string;
  border: string;
}

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  info: string;
  light: ColorScheme;
  dark: ColorScheme;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
  styleUrl: './app.css',
  host: {
    '[style.--color-primary]': 'colors().primary',
    '[style.--color-secondary]': 'colors().secondary',
    '[style.--color-accent]': 'colors().accent',
    '[style.--color-success]': 'colors().success',
    '[style.--color-warning]': 'colors().warning',
    '[style.--color-info]': 'colors().info',
    '[style.--color-light-background]': 'colors().light.background',
    '[style.--color-light-surface]': 'colors().light.surface',
    '[style.--color-light-text]': 'colors().light.text',
    '[style.--color-light-border]': 'colors().light.border',
    '[style.--color-dark-background]': 'colors().dark.background',
    '[style.--color-dark-surface]': 'colors().dark.surface',
    '[style.--color-dark-text]': 'colors().dark.text',
    '[style.--color-dark-border]': 'colors().dark.border'
  }
})
export class App {
  private readonly configService = inject(ConfigService);

  readonly colors = toSignal(this.configService.getValue<ThemeColors>('ui.theme.colors').pipe(
    filter((colors): colors is ThemeColors => colors !== undefined)
  ), {
    initialValue: {
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
        border: '#E2E8F0'
      },
      dark: {
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F8FAFC',
        border: '#334155'
      }
    }
  });
}
