import { browser } from '$app/environment';

class ThemeStore {
  isDark = $state(false);

  constructor() {
    if (browser) {
      const stored = localStorage.getItem('bakebuddy-dark');
      if (stored !== null) {
        this.isDark = stored === 'true';
      } else {
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      this.applyTheme();
    }
  }

  toggle() {
    this.isDark = !this.isDark;
    this.applyTheme();
    if (browser) {
      localStorage.setItem('bakebuddy-dark', String(this.isDark));
    }
  }

  private applyTheme() {
    if (browser) {
      document.documentElement.classList.toggle('dark', this.isDark);
    }
  }
}

export const themeStore = new ThemeStore();
