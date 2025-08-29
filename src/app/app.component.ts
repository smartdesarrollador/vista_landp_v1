import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import * as AOS from 'aos';
import { ScrollProgressComponent } from './shared/scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ScrollProgressComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'proy_test';
  private isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Inicializar AOS (Animate On Scroll)
      AOS.init({
        duration: 800,        // Duración de las animaciones
        delay: 100,           // Delay antes de empezar
        once: true,           // Solo animar una vez
        mirror: false,        // No animar al hacer scroll hacia arriba
        offset: 120,          // Offset desde el trigger point
        easing: 'ease-out-cubic'
      });

      // Refrescar AOS en cambios de ruta
      AOS.refresh();
    }
  }
}
