import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private isBrowser: boolean = false;
  private scrollPositionSubject = new BehaviorSubject<number>(0);
  private activeSectionSubject = new BehaviorSubject<string>('hero');
  private isScrollingSubject = new BehaviorSubject<boolean>(false);

  public scrollPosition$ = this.scrollPositionSubject.asObservable();
  public activeSection$ = this.activeSectionSubject.asObservable();
  public isScrolling$ = this.isScrollingSubject.asObservable();

  private sections: string[] = ['hero', 'about', 'services', 'features', 'testimonials', 'gallery', 'contact'];
  private intersectionObserver?: IntersectionObserver;
  private scrollTimeout?: ReturnType<typeof setTimeout>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser) {
      this.initializeScrollTracking();
      this.initializeIntersectionObserver();
    }
  }

  private initializeScrollTracking(): void {
    if (!this.isBrowser) return;

    // Trackear posición de scroll
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(16), // 60fps
        distinctUntilChanged()
      )
      .subscribe(() => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.scrollPositionSubject.next(scrollPosition);
        
        // Indicar que se está haciendo scroll
        this.isScrollingSubject.next(true);
        
        // Limpiar timeout anterior y crear uno nuevo
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        
        this.scrollTimeout = setTimeout(() => {
          this.isScrollingSubject.next(false);
        }, 150);
      });
  }

  private initializeIntersectionObserver(): void {
    if (!this.isBrowser) return;

    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          if (sectionId && this.sections.includes(sectionId)) {
            this.activeSectionSubject.next(sectionId);
          }
        }
      });
    }, options);

    // Observar todas las secciones cuando estén disponibles
    setTimeout(() => {
      this.observeSections();
    }, 1000);
  }

  private observeSections(): void {
    if (!this.intersectionObserver) return;

    this.sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        this.intersectionObserver!.observe(element);
      }
    });
  }

  // Método para hacer scroll suave a una sección
  scrollToSection(sectionId: string, offset: number = 80): void {
    if (!this.isBrowser) return;

    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Actualizar sección activa inmediatamente para mejor UX
      setTimeout(() => {
        this.activeSectionSubject.next(sectionId);
      }, 300);
    }
  }

  // Scroll al inicio de la página
  scrollToTop(): void {
    if (!this.isBrowser) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Obtener porcentaje de scroll de la página
  getScrollPercentage(): number {
    if (!this.isBrowser) return 0;

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    return height > 0 ? (winScroll / height) * 100 : 0;
  }

  // Verificar si un elemento está visible en el viewport
  isElementInViewport(element: HTMLElement): boolean {
    if (!this.isBrowser) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Obtener la sección actual basada en la posición de scroll
  getCurrentSection(): string {
    if (!this.isBrowser) return 'hero';

    const scrollPosition = window.pageYOffset + 100;
    let currentSection = 'hero';

    for (const sectionId of this.sections) {
      const element = document.getElementById(sectionId);
      if (element && scrollPosition >= element.offsetTop) {
        currentSection = sectionId;
      }
    }

    return currentSection;
  }

  // Agregar una nueva sección para observar
  addSection(sectionId: string): void {
    if (!this.sections.includes(sectionId)) {
      this.sections.push(sectionId);
      
      if (this.intersectionObserver) {
        const element = document.getElementById(sectionId);
        if (element) {
          this.intersectionObserver.observe(element);
        }
      }
    }
  }

  // Remover observación de una sección
  removeSection(sectionId: string): void {
    const index = this.sections.indexOf(sectionId);
    if (index > -1) {
      this.sections.splice(index, 1);
      
      if (this.intersectionObserver) {
        const element = document.getElementById(sectionId);
        if (element) {
          this.intersectionObserver.unobserve(element);
        }
      }
    }
  }

  // Limpiar recursos al destruir el servicio
  destroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}