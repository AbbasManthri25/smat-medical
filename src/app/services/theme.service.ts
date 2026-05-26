import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'smat-theme';
  isDark = signal(true);

  constructor() {
    const saved = localStorage.getItem(this.KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const startDark = saved ? saved === 'dark' : prefersDark;
    this.isDark.set(startDark);
    this.apply(startDark);
  }

  toggle() {
    const next = !this.isDark();
    this.isDark.set(next);
    this.apply(next);
    localStorage.setItem(this.KEY, next ? 'dark' : 'light');
  }

  private apply(dark: boolean) {
    if (dark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}
