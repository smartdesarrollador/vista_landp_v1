import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  HeroContent, 
  Service, 
  Feature, 
  Testimonial, 
  ProjectItem, 
  ContactInfo, 
  CompanyInfo 
} from '../models/landing-page.interface';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor() { }

  getHeroContent(): Observable<HeroContent> {
    const heroData: HeroContent = {
      title: "Transformamos Ideas en Realidad Digital",
      subtitle: "Soluciones Innovadoras para tu Negocio",
      description: "Creamos experiencias digitales únicas que impulsan el crecimiento de tu empresa con tecnología de vanguardia y diseño excepcional.",
      ctaButton: {
        text: "Comenzar Proyecto",
        link: "#contact"
      },
      backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
    };

    return of(heroData).pipe(delay(300));
  }

  getServices(): Observable<Service[]> {
    const services: Service[] = [
      {
        id: 1,
        name: "Desarrollo Web",
        description: "Aplicaciones web modernas y responsivas construidas con las últimas tecnologías",
        icon: "code",
        features: ["React/Angular", "Node.js", "Base de datos", "APIs REST", "Hosting incluido", "SSL Gratuito"],
        price: "Desde $2,999",
        highlight: true
      },
      {
        id: 2,
        name: "Diseño UI/UX",
        description: "Interfaces intuitivas y atractivas que mejoran la experiencia del usuario",
        icon: "design",
        features: ["Wireframes", "Prototipos", "Design System", "User Testing", "Responsive Design", "Iteraciones ilimitadas"],
        price: "Desde $1,499"
      },
      {
        id: 3,
        name: "E-commerce",
        description: "Tiendas online completas con sistema de pagos y gestión de inventario",
        icon: "shopping",
        features: ["Catálogo de productos", "Pagos seguros", "Gestión de pedidos", "Dashboard admin", "SEO optimizado", "Analytics incluido"],
        price: "Desde $3,999"
      },
      {
        id: 4,
        name: "Aplicaciones Móviles",
        description: "Apps nativas e híbridas para iOS y Android con rendimiento óptimo",
        icon: "mobile",
        features: ["iOS y Android", "Push notifications", "APIs integradas", "Offline mode", "App Store deployment", "Mantenimiento incluido"],
        price: "Desde $4,999",
        highlight: true
      },
      {
        id: 5,
        name: "Consultoría Digital",
        description: "Asesoría especializada para optimizar tu presencia digital y estrategia tecnológica",
        icon: "consultation",
        features: ["Auditoría técnica", "Estrategia digital", "Optimización SEO", "Performance audit", "Roadmap tecnológico", "Training incluido"],
        price: "Desde $999"
      },
      {
        id: 6,
        name: "Mantenimiento y Soporte",
        description: "Soporte continuo y actualizaciones para mantener tu proyecto siempre funcionando",
        icon: "support",
        features: ["Monitoreo 24/7", "Updates de seguridad", "Backups automáticos", "Soporte técnico", "Reportes mensuales", "SLA garantizado"],
        price: "Desde $299/mes"
      }
    ];

    return of(services).pipe(delay(500));
  }

  getFeatures(): Observable<Feature[]> {
    const features: Feature[] = [
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

    return of(features).pipe(delay(400));
  }

  getTestimonials(): Observable<Testimonial[]> {
    const testimonials: Testimonial[] = [
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

    return of(testimonials).pipe(delay(600));
  }

  getGalleryItems(): Observable<ProjectItem[]> {
    const projects: ProjectItem[] = [
      {
        id: 1,
        title: "Plataforma E-commerce Avanzada",
        category: "ecommerce",
        description: "Sistema completo de comercio electrónico con panel administrativo, gestión de inventario y pagos integrados",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        technologies: ["Angular", "Node.js", "MongoDB", "Stripe"],
        url: "#",
        featured: true,
        completedDate: "2024-01",
        stats: {
          performance: "98%",
          users: "10K+",
          conversion: "+245%"
        }
      },
      {
        id: 2,
        title: "Dashboard Analítico Empresarial",
        category: "web",
        description: "Panel de control con visualizaciones interactivas y reportes en tiempo real para análisis de datos empresariales",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        technologies: ["React", "D3.js", "Python", "PostgreSQL"],
        url: "#",
        completedDate: "2024-02",
        stats: {
          performance: "95%",
          users: "5K+",
          conversion: "+180%"
        }
      },
      {
        id: 3,
        title: "App Móvil de Fitness",
        category: "mobile",
        description: "Aplicación móvil para seguimiento de ejercicios, nutrición y objetivos de fitness con integración de wearables",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
        technologies: ["Flutter", "Firebase", "Health API", "ML Kit"],
        url: "#",
        featured: true,
        completedDate: "2023-12",
        stats: {
          performance: "99%",
          users: "25K+",
          conversion: "+320%"
        }
      },
      {
        id: 4,
        title: "Landing Page SaaS",
        category: "landing",
        description: "Página de aterrizaje optimizada para conversión con A/B testing y analytics integrados",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        technologies: ["Next.js", "TailwindCSS", "Vercel", "Analytics"],
        url: "#",
        completedDate: "2024-03",
        stats: {
          performance: "100%",
          users: "50K+",
          conversion: "+156%"
        }
      },
      {
        id: 5,
        title: "Sistema de Gestión Hospitalaria",
        category: "web",
        description: "Plataforma integral para gestión hospitalaria con módulos de citas, historial médico y facturación",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
        technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
        url: "#",
        completedDate: "2023-11",
        stats: {
          performance: "97%",
          users: "2K+",
          conversion: "+200%"
        }
      },
      {
        id: 6,
        title: "Marketplace B2B",
        category: "ecommerce",
        description: "Plataforma B2B para conectar proveedores y compradores con sistema de cotizaciones automatizadas",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop",
        technologies: ["Angular", "Express", "Redis", "Elasticsearch"],
        url: "#",
        featured: true,
        completedDate: "2024-01",
        stats: {
          performance: "96%",
          users: "8K+",
          conversion: "+275%"
        }
      }
    ];

    return of(projects).pipe(delay(700));
  }

  getContactInfo(): Observable<ContactInfo> {
    const contactInfo: ContactInfo = {
      email: "contacto@empresa.com",
      phone: "+1 (555) 123-4567",
      address: "1234 Calle Principal, Ciudad, País 12345",
      workingHours: "Lun - Vie: 9:00 AM - 6:00 PM",
      socialMedia: {
        facebook: "https://facebook.com/empresa",
        twitter: "https://twitter.com/empresa",
        linkedin: "https://linkedin.com/company/empresa",
        instagram: "https://instagram.com/empresa"
      }
    };

    return of(contactInfo).pipe(delay(200));
  }

  getCompanyInfo(): Observable<CompanyInfo> {
    const companyInfo: CompanyInfo = {
      name: "Tech Solutions",
      description: "Somos un equipo de expertos dedicados a transformar ideas innovadoras en soluciones digitales excepcionales.",
      mission: "Creemos en el poder de la tecnología para impulsar el crecimiento empresarial. Nuestro enfoque se centra en entender las necesidades únicas de cada cliente y desarrollar soluciones personalizadas que generen resultados medibles.",
      vision: "Ser líderes en la transformación digital, creando soluciones innovadoras que impulsen el éxito de nuestros clientes",
      values: [
        "Innovación constante",
        "Excelencia en el servicio", 
        "Resultados orientados al cliente",
        "Transparencia y comunicación",
        "Trabajo en equipo colaborativo"
      ],
      foundedYear: 2020,
      teamSize: 25
    };

    return of(companyInfo).pipe(delay(300));
  }

  // Métodos adicionales para futuras integraciones con API
  
  // Método para simular llamadas HTTP reales (preparado para API)
  private simulateHttpCall<T>(data: T, delayMs: number = 500): Observable<T> {
    return of(data).pipe(delay(delayMs));
  }

  // Método para manejo de errores (preparado para API)
  private handleError(operation = 'operation') {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      throw error;
    };
  }
}