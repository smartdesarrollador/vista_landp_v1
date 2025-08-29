import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LandingPageService } from '../../core/services/landing-page.service';
import { HeroContent } from '../../core/models/landing-page.interface';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = false;
  private subscriptions: Subscription[] = [];
  
  // Datos del hero section
  heroContent: HeroContent | null = null;
  isLoading = true;

  // Servicios
  private landingPageService = inject(LandingPageService);
  private cdr = inject(ChangeDetectorRef);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Cargar datos del hero section
    this.loadHeroContent();

    // Inicializar efectos de parallax solo en el navegador
    if (this.isBrowser) {
      this.initParallaxEffect();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadHeroContent(): void {
    const heroSub = this.landingPageService.getHeroContent().subscribe({
      next: (content) => {
        this.heroContent = content;
        this.isLoading = false;
        this.cdr.markForCheck(); // Necesario con OnPush
      },
      error: (error) => {
        console.error('Error loading hero content:', error);
        this.isLoading = false;
        this.cdr.markForCheck(); // Necesario con OnPush
      }
    });

    this.subscriptions.push(heroSub);
  }

  private initParallaxEffect(): void {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroElement = document.querySelector('.hero-background') as HTMLElement;
      if (heroElement) {
        heroElement.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;

    const targetId = sectionId.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Ajustar por navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}