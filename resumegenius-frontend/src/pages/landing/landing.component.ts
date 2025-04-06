import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  themeIcon: string = 'bi-moon-fill'; // Bootstrap icon class
  isScrolled = false;
  isNavbarCollapsed: boolean = true; // <-- Add this line

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    const currentTheme = this.themeService.getCurrentTheme();
    this.updateIcon(currentTheme);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll(): void {
    this.isScrolled = window.scrollY > 0;
    console.log('Scrolled:', this.isScrolled);
  }

  toggleTheme(): void {
    const newTheme = this.themeService.toggleTheme();
    this.updateIcon(newTheme);
  }

  updateIcon(theme: 'light' | 'dark'): void {
    this.themeIcon = theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill';
  }
}

