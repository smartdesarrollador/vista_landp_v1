import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css',
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = false;
  private subscriptions: Subscription[] = [];
  
  isVisible: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scrollService: ScrollService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Suscribirse a los cambios de scroll
      const scrollSub = this.scrollService.scrollPosition$.subscribe(scrollPosition => {
        this.isVisible = scrollPosition > 300; // Mostrar después de 300px de scroll
      });

      this.subscriptions.push(scrollSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Método para hacer scroll suave hacia arriba usando ScrollService
  scrollToTop(): void {
    if (!this.isBrowser) return;
    this.scrollService.scrollToTop();
  }
}