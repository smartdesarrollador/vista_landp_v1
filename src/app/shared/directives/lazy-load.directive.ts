import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  @Input() appLazyLoad: string = '';
  @Input() placeholder: string = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"%3E%3Cdefs%3E%3ClinearGradient id="shimmer" x1="0%25" y1="0%25" x2="100%25" y2="0%25"%3E%3Cstop offset="0%25" style="stop-color:%23f3f4f6;stop-opacity:1" /%3E%3Cstop offset="50%25" style="stop-color:%23e5e7eb;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f3f4f6;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="600" height="400" fill="url(%23shimmer)"%3E%3CanimateTransform attributeName="transform" type="translate" values="-600,0;600,0;-600,0" dur="2s" repeatCount="indefinite"/%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="18"%3ECargando imagen...%3C/text%3E%3C/svg%3E';
  
  private observer?: IntersectionObserver;
  private isBrowser: boolean = false;

  constructor(
    private elementRef: ElementRef<HTMLImageElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    const img = this.elementRef.nativeElement;
    
    if (!this.isBrowser) {
      // En el servidor, cargar la imagen inmediatamente
      this.loadImage();
      return;
    }

    // Configurar placeholder inicial
    img.src = this.placeholder;
    img.classList.add('lazy-loading');
    img.style.opacity = '0.7';
    img.style.transition = 'opacity 0.3s ease';

    // Configurar Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
        threshold: 0.01
      }
    );

    this.observer.observe(img);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private loadImage(): void {
    const img = this.elementRef.nativeElement;
    
    if (this.appLazyLoad) {
      if (!this.isBrowser) {
        // En el servidor, establecer la imagen directamente
        img.src = this.appLazyLoad;
        return;
      }
      
      // Crear una nueva imagen para precargar (solo en el navegador)
      const imageLoader = new Image();
      
      imageLoader.onload = () => {
        img.src = this.appLazyLoad;
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        img.style.opacity = '1';
      };

      imageLoader.onerror = () => {
        console.error('Error loading image:', this.appLazyLoad);
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-error');
        img.alt = 'Error al cargar imagen';
        // Set a fallback image
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="24"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
        img.style.opacity = '1';
      };

      imageLoader.src = this.appLazyLoad;
    } else {
      // If no image URL is provided, show placeholder
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23f3f4f6"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%236b7280" font-size="24"%3ESin imagen%3C/text%3E%3C/svg%3E';
      img.style.opacity = '1';
    }
  }
}