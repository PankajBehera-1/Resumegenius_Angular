import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private themeKey = 'user-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const savedTheme = (localStorage.getItem(this.themeKey) as 'light' | 'dark') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme: 'light' | 'dark') {
    const body = document.body;
    console.log(`Applying theme: ${theme}`); // Debugging log
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      this.renderer.addClass(body, 'dark-theme');
      console.log('dark-theme class added to body');
    } else {
      this.renderer.removeClass(body, 'dark-theme');
      console.log('dark-theme class removed from body');
    }
    localStorage.setItem(this.themeKey, theme);
  }
  toggleTheme(): 'light' | 'dark' {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }

  getCurrentTheme(): 'light' | 'dark' {
    return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  }
}
