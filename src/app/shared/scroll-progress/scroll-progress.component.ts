import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-progress.component.html',
  styleUrl: './scroll-progress.component.css',
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = false;
  private subscriptions: Subscription[] = [];
  
  scrollPercentage = 0;
  isVisible = false;

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Suscribirse a los cambios de scroll
      const scrollSub = this.scrollService.scrollPosition$.subscribe(scrollPosition => {
        this.scrollPercentage = this.scrollService.getScrollPercentage();
        this.isVisible = scrollPosition > 100; // Mostrar después de 100px de scroll
      });

      this.subscriptions.push(scrollSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}