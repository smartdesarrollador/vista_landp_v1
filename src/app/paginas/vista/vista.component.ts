import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ScrollToTopComponent } from '../../shared/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-vista',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollToTopComponent],
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.css',
})
export class VistaComponent {}
