import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private isBrowser: boolean = false;
  private defaultSEOData: SEOData = {
    title: 'Tech Solutions - Transformamos Ideas en Realidad Digital',
    description: 'Creamos experiencias digitales únicas que impulsan el crecimiento de tu empresa con tecnología de vanguardia y diseño excepcional.',
    keywords: 'desarrollo web, diseño UX/UI, aplicaciones móviles, e-commerce, marketing digital, tecnología',
    image: 'https://example.com/og-image.jpg',
    url: 'https://example.com',
    type: 'website',
    siteName: 'Tech Solutions',
    locale: 'es_ES'
  };

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  updateSEOData(data: Partial<SEOData>): void {
    const seoData: SEOData = { ...this.defaultSEOData, ...data };

    // Actualizar título de la página
    if (seoData.title) {
      this.title.setTitle(seoData.title);
    }

    // Meta tags básicos
    this.updateMetaTag('description', seoData.description);
    this.updateMetaTag('keywords', seoData.keywords);
    this.updateMetaTag('robots', 'index,follow');
    this.updateMetaTag('author', 'Tech Solutions Team');

    // Open Graph tags
    this.updateMetaTag('og:title', seoData.title, 'property');
    this.updateMetaTag('og:description', seoData.description, 'property');
    this.updateMetaTag('og:image', seoData.image, 'property');
    this.updateMetaTag('og:url', seoData.url, 'property');
    this.updateMetaTag('og:type', seoData.type, 'property');
    this.updateMetaTag('og:site_name', seoData.siteName, 'property');
    this.updateMetaTag('og:locale', seoData.locale, 'property');

    // Twitter Card tags
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:title', seoData.title);
    this.updateMetaTag('twitter:description', seoData.description);
    this.updateMetaTag('twitter:image', seoData.image);

    // Structured Data (JSON-LD)
    this.updateStructuredData(seoData);
  }

  private updateMetaTag(name: string, content?: string, attribute: string = 'name'): void {
    if (content) {
      if (this.meta.getTag(`${attribute}="${name}"`)) {
        this.meta.updateTag({ [attribute]: name, content });
      } else {
        this.meta.addTag({ [attribute]: name, content });
      }
    }
  }

  private updateStructuredData(seoData: SEOData): void {
    if (!this.isBrowser) return;

    // Remover structured data anterior
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Crear nuevo structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": seoData.siteName,
      "description": seoData.description,
      "url": seoData.url,
      "logo": seoData.image,
      "sameAs": [
        "https://facebook.com/techsolutions",
        "https://twitter.com/techsolutions", 
        "https://linkedin.com/company/techsolutions",
        "https://instagram.com/techsolutions"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service",
        "availableLanguage": ["Spanish", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1234 Calle Principal",
        "addressLocality": "Ciudad",
        "addressCountry": "País"
      },
      "service": [
        {
          "@type": "Service",
          "name": "Desarrollo Web",
          "description": "Aplicaciones web modernas y responsivas"
        },
        {
          "@type": "Service", 
          "name": "Diseño UI/UX",
          "description": "Interfaces intuitivas y experiencias de usuario excepcionales"
        },
        {
          "@type": "Service",
          "name": "Aplicaciones Móviles",
          "description": "Apps nativas e híbridas para iOS y Android"
        }
      ]
    };

    // Agregar al DOM
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  // Métodos específicos para diferentes páginas/secciones
  updateHomepageSEO(): void {
    this.updateSEOData({
      title: 'Tech Solutions - Transformamos Ideas en Realidad Digital',
      description: 'Somos expertos en desarrollo web, diseño UX/UI, aplicaciones móviles y marketing digital. Creamos soluciones tecnológicas que impulsan tu negocio.',
      keywords: 'desarrollo web, diseño UX/UI, aplicaciones móviles, e-commerce, marketing digital, transformación digital'
    });
  }

  updateServiceSEO(serviceName: string): void {
    this.updateSEOData({
      title: `${serviceName} - Servicios Profesionales | Tech Solutions`,
      description: `Servicios profesionales de ${serviceName}. Soluciones personalizadas con tecnología de vanguardia y resultados garantizados.`,
      keywords: `${serviceName}, servicios profesionales, desarrollo, tecnología`
    });
  }

  updateContactSEO(): void {
    this.updateSEOData({
      title: 'Contacto - Comienza tu Proyecto | Tech Solutions',
      description: 'Ponte en contacto con nuestro equipo de expertos. Evaluación gratuita de tu proyecto y propuesta personalizada en 24 horas.',
      keywords: 'contacto, cotización, proyecto, desarrollo, consultoría'
    });
  }

  updatePortfolioSEO(): void {
    this.updateSEOData({
      title: 'Portafolio - Nuestros Proyectos Exitosos | Tech Solutions',
      description: 'Descubre nuestros proyectos más exitosos. Casos de estudio de desarrollo web, apps móviles y soluciones digitales innovadoras.',
      keywords: 'portafolio, proyectos, casos de estudio, desarrollo web, apps móviles'
    });
  }

  // Método para analytics y tracking
  updateCanonicalUrl(url: string): void {
    if (!this.isBrowser) return;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  // Método para preconnect a recursos externos
  addPreconnectLinks(): void {
    if (!this.isBrowser) return;

    const preconnectUrls = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://images.unsplash.com',
      'https://www.google-analytics.com'
    ];

    preconnectUrls.forEach(url => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        if (url.includes('gstatic')) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      }
    });
  }
}