import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LandingPageService } from '../../core/services/landing-page.service';
import { Service } from '../../core/models/landing-page.interface';

@Component({
  selector: 'app-services-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-grid.component.html',
  styleUrl: './services-grid.component.css',
})
export class ServicesGridComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = false;
  private subscriptions: Subscription[] = [];

  // Datos de servicios
  services: Service[] = [];
  isLoading = true;

  // Servicios
  private landingPageService = new LandingPageService();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Cargar servicios
    this.loadServices();

    if (this.isBrowser) {
      // Inicializar efectos específicos del navegador si es necesario
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadServices(): void {
    const servicesSub = this.landingPageService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.push(servicesSub);
  }

  getServiceIcon(iconType: string): string {
    const icons = {
      'code': 'M10 20l4-16m-4 4l4 4-4 4M6 16l-4-4 4-4',
      'design': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2V3z',
      'marketing': 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
      'shop': 'M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z',
      'mobile': 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM9 9a1 1 0 000 2v3a1 1 0 001 1h4a1 1 0 001-1v-3a1 1 0 100-2H9z',
      'consulting': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    };
    
    return icons[iconType as keyof typeof icons] || icons['code'];
  }

  scrollToContact(): void {
    if (!this.isBrowser) return;

    const element = document.getElementById('contact');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}