import { Component, OnInit, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BannerCarouselComponent } from '../../../shared/banner-carousel/banner-carousel.component';
import { HeroSectionComponent } from '../../../shared/hero-section/hero-section.component';
import { ServicesGridComponent } from '../../../shared/services-grid/services-grid.component';
import { FeaturesShowcaseComponent } from '../../../shared/features-showcase/features-showcase.component';
import { TestimonialsCarouselComponent } from '../../../shared/testimonials-carousel/testimonials-carousel.component';
import { GalleryGridComponent } from '../../../shared/gallery-grid/gallery-grid.component';
import { ContactFormComponent } from '../../../shared/contact-form/contact-form.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterOutlet, 
    BannerCarouselComponent, 
    HeroSectionComponent, 
    ServicesGridComponent,
    FeaturesShowcaseComponent,
    TestimonialsCarouselComponent,
    GalleryGridComponent,
    ContactFormComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  private seoService = inject(SeoService);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Configurar SEO para la página de inicio
    this.seoService.updateHomepageSEO();
    this.seoService.addPreconnectLinks();
    
    if (this.isBrowser) {
      this.seoService.updateCanonicalUrl(window.location.href);
    }
  }
}
