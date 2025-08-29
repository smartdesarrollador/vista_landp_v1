import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LandingPageService } from '../../core/services/landing-page.service';
import { Testimonial } from '../../core/models/landing-page.interface';
import { LazyLoadDirective } from '../directives/lazy-load.directive';


@Component({
  selector: 'app-testimonials-carousel',
  standalone: true,
  imports: [CommonModule, LazyLoadDirective],
  templateUrl: './testimonials-carousel.component.html',
  styleUrl: './testimonials-carousel.component.css',
})
export class TestimonialsCarouselComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = false;
  private subscriptions: Subscription[] = [];
  private intervalId: any;
  
  currentIndex = 0;
  isTransitioning = false;
  isLoading = true;

  // Datos de testimonios
  testimonials: Testimonial[] = [];

  // Servicios
  private landingPageService = new LandingPageService();

  // Datos mock reemplazados por servicio
  oldTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "María González",
      position: "Directora de Marketing",
      company: "TechCorp Solutions",
      content: "El equipo superó todas nuestras expectativas. La landing page que desarrollaron aumentó nuestras conversiones en un 340%. Su atención al detalle y profesionalismo es excepcional.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c96ed3b4?w=150&h=150&fit=crop&crop=face",
      featured: true
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      position: "CEO",
      company: "Innovate Digital",
      content: "Trabajar con este equipo fue una experiencia fantástica. No solo entregaron a tiempo, sino que la calidad del código y el diseño superaron nuestras expectativas completamente.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ana Martínez",
      position: "Product Manager",
      company: "StartupXYZ",
      content: "La velocidad de carga y la optimización SEO que lograron para nuestro sitio web ha sido increíble. Nuestro tráfico orgánico se triplicó en solo 3 meses.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Diego Fernández",
      position: "CTO",
      company: "E-commerce Plus",
      content: "Su enfoque en la experiencia del usuario es excepcional. La interfaz que diseñaron es intuitiva y nuestros clientes comentan constantemente lo fácil que es navegar en nuestro sitio.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      featured: true
    },
    {
      id: 5,
      name: "Lucía Herrera",
      position: "Marketing Director",
      company: "Global Services",
      content: "El soporte post-lanzamiento ha sido excepcional. Siempre están disponibles para resolver cualquier duda y las actualizaciones son rápidas y eficientes.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Roberto Silva",
      position: "Founder",
      company: "Tech Innovations",
      content: "La integración de funcionalidades avanzadas que implementaron transformó completamente nuestra propuesta de valor. Definitivamente los recomendaría a cualquier empresa.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadTestimonials();
    if (this.isBrowser) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private loadTestimonials(): void {
    const testimonialsSub = this.landingPageService.getTestimonials().subscribe({
      next: (testimonials) => {
        this.testimonials = testimonials;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading testimonials:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.push(testimonialsSub);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    if (this.isTransitioning || !this.testimonials.length) return;
    
    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  prevSlide(): void {
    if (this.isTransitioning || !this.testimonials.length) return;
    
    this.isTransitioning = true;
    this.currentIndex = this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  goToSlide(index: number): void {
    if (this.isTransitioning || index === this.currentIndex) return;
    
    this.isTransitioning = true;
    this.currentIndex = index;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  onMouseEnter(): void {
    this.stopAutoSlide();
  }

  onMouseLeave(): void {
    if (this.isBrowser) {
      this.startAutoSlide();
    }
  }

  generateStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getVisibleTestimonials(): Testimonial[] {
    if (!this.testimonials || this.testimonials.length === 0) {
      return [];
    }
    
    const visible = [];
    const totalItems = this.testimonials.length;
    
    // Mostrar 3 testimonios en desktop, 1 en mobile
    const itemsToShow = this.isBrowser && typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (this.currentIndex + i) % totalItems;
      const testimonial = this.testimonials[index];
      if (testimonial) {
        visible.push(testimonial);
      }
    }
    
    return visible;
  }
}