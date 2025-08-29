import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LandingPageService } from '../../core/services/landing-page.service';
import { ProjectItem } from '../../core/models/landing-page.interface';
import { LazyLoadDirective } from '../directives/lazy-load.directive';


@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [CommonModule, LazyLoadDirective],
  templateUrl: './gallery-grid.component.html',
  styleUrl: './gallery-grid.component.css',
})
export class GalleryGridComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = false;
  private subscriptions: Subscription[] = [];
  
  selectedCategory: string = 'all';
  filteredProjects: ProjectItem[] = [];
  isLoading = true;

  // Categorías disponibles
  categories = [
    { id: 'all', name: 'Todos los Proyectos', count: 0 },
    { id: 'web', name: 'Aplicaciones Web', count: 0 },
    { id: 'mobile', name: 'Apps Móviles', count: 0 },
    { id: 'ecommerce', name: 'E-commerce', count: 0 },
    { id: 'landing', name: 'Landing Pages', count: 0 }
  ];

  // Datos de proyectos
  projects: ProjectItem[] = [];

  // Servicios
  private landingPageService = new LandingPageService();

  // Datos mock reemplazados por servicio
  oldProjects: ProjectItem[] = [
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadGalleryItems();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadGalleryItems(): void {
    const gallerySub = this.landingPageService.getGalleryItems().subscribe({
      next: (projects) => {
        console.log('Gallery items loaded:', projects);
        this.projects = projects && projects.length > 0 ? projects : this.oldProjects;
        this.updateCategoryCounts();
        this.filterProjects('all');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading gallery items:', error);
        // Fall back to mock data if service fails
        this.projects = this.oldProjects;
        this.updateCategoryCounts();
        this.filterProjects('all');
        this.isLoading = false;
      }
    });

    this.subscriptions.push(gallerySub);
  }

  updateCategoryCounts(): void {
    this.categories.forEach(category => {
      if (category.id === 'all') {
        category.count = this.projects.length;
      } else {
        category.count = this.projects.filter(p => p.category === category.id).length;
      }
    });
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
  }

  getTechnologyColor(tech: string): string {
    const colors: { [key: string]: string } = {
      'Angular': 'bg-red-100 text-red-800',
      'React': 'bg-blue-100 text-blue-800',
      'Vue.js': 'bg-green-100 text-green-800',
      'Node.js': 'bg-green-100 text-green-800',
      'Laravel': 'bg-red-100 text-red-800',
      'Express': 'bg-gray-100 text-gray-800',
      'MongoDB': 'bg-green-100 text-green-800',
      'MySQL': 'bg-blue-100 text-blue-800',
      'PostgreSQL': 'bg-blue-100 text-blue-800',
      'Firebase': 'bg-yellow-100 text-yellow-800',
      'Next.js': 'bg-black text-white',
      'Flutter': 'bg-blue-100 text-blue-800',
      'TailwindCSS': 'bg-cyan-100 text-cyan-800',
      'Stripe': 'bg-purple-100 text-purple-800',
      'D3.js': 'bg-orange-100 text-orange-800',
      'Python': 'bg-yellow-100 text-yellow-800',
      'Redis': 'bg-red-100 text-red-800',
      'Elasticsearch': 'bg-yellow-100 text-yellow-800'
    };
    
    return colors[tech] || 'bg-gray-100 text-gray-800';
  }

  openProject(project: ProjectItem): void {
    if (project.url && this.isBrowser) {
      window.open(project.url, '_blank');
    }
  }
}