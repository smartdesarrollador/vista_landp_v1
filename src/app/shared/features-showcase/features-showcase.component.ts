import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LandingPageService } from '../../core/services/landing-page.service';
import { Feature } from '../../core/models/landing-page.interface';

@Component({
  selector: 'app-features-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features-showcase.component.html',
  styleUrl: './features-showcase.component.css',
})
export class FeaturesShowcaseComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = false;
  private subscriptions: Subscription[] = [];

  // Datos de características
  features: Feature[] = [];
  isLoading = true;

  // Servicios
  private landingPageService = new LandingPageService();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadFeatures();
    if (this.isBrowser) {
      // Inicializar animaciones específicas del navegador
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadFeatures(): void {
    const featuresSub = this.landingPageService.getFeatures().subscribe({
      next: (features) => {
        this.features = features;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading features:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.push(featuresSub);
  }

  // Datos mock reemplazados por servicio
  oldFeatures: Feature[] = [
    {
      id: 1,
      title: "Tecnología Avanzada",
      description: "Utilizamos las últimas tecnologías y frameworks para garantizar rendimiento óptimo y escalabilidad futura",
      icon: "rocket",
      highlight: true,
      stats: {
        value: "99.9%",
        label: "Uptime garantizado"
      }
    },
    {
      id: 2,
      title: "Diseño Responsivo",
      description: "Todos nuestros proyectos se adaptan perfectamente a cualquier dispositivo, desde móviles hasta pantallas 4K",
      icon: "responsive",
      stats: {
        value: "100%",
        label: "Mobile Friendly"
      }
    },
    {
      id: 3,
      title: "Optimización SEO",
      description: "Implementamos las mejores prácticas de SEO para asegurar que tu sitio sea encontrado por tu audiencia objetivo",
      icon: "search",
      stats: {
        value: "+150%",
        label: "Incremento en tráfico"
      }
    },
    {
      id: 4,
      title: "Seguridad Robusta",
      description: "Protección avanzada contra amenazas cibernéticas con certificados SSL, encriptación y monitoreo 24/7",
      icon: "shield",
      stats: {
        value: "256-bit",
        label: "Encriptación SSL"
      }
    },
    {
      id: 5,
      title: "Velocidad Optimizada",
      description: "Tiempos de carga ultrarrápidos mediante optimización de código, CDN global y técnicas de cache avanzadas",
      icon: "speed",
      highlight: true,
      stats: {
        value: "<2s",
        label: "Tiempo de carga"
      }
    },
    {
      id: 6,
      title: "Soporte 24/7",
      description: "Equipo técnico disponible las 24 horas para resolver cualquier inconveniente y mantener tu proyecto funcionando",
      icon: "support",
      stats: {
        value: "24/7",
        label: "Disponibilidad"
      }
    }
  ];

  getFeatureIcon(iconType: string): string {
    const icons = {
      'rocket': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      'responsive': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      'shield': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      'speed': 'M13 10V3L4 14h7v7l9-11h-7z',
      'support': 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944a11.955 11.955 0 00-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016A11.955 11.955 0 0012 2.944z'
    };
    
    return icons[iconType as keyof typeof icons] || icons['rocket'];
  }
}