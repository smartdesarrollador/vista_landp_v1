import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LandingPageService } from '../../core/services/landing-page.service';
import { ContactInfo } from '../../core/models/landing-page.interface';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = false;
  private subscriptions: Subscription[] = [];
  
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  isLoading = true;

  // Información de contacto
  contactInfo: ContactInfo | null = null;

  // Servicios
  private landingPageService = new LandingPageService();

  // Información de contacto mock reemplazada por servicio
  oldContactInfo: ContactInfo = {
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

  // Servicios disponibles para el select
  services = [
    { value: 'web-development', label: 'Desarrollo Web' },
    { value: 'mobile-app', label: 'Aplicación Móvil' },
    { value: 'ecommerce', label: 'Tienda Online' },
    { value: 'landing-page', label: 'Landing Page' },
    { value: 'ui-ux-design', label: 'Diseño UI/UX' },
    { value: 'consultation', label: 'Consultoría' },
    { value: 'maintenance', label: 'Mantenimiento' },
    { value: 'other', label: 'Otro' }
  ];

  // Presupuestos estimados
  budgetRanges = [
    { value: 'under-5k', label: 'Menos de $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: 'over-50k', label: 'Más de $50,000' },
    { value: 'not-sure', label: 'No estoy seguro' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[\d\s\-\(\)]{10,}$/)]],
      company: [''],
      service: ['', Validators.required],
      budget: ['', Validators.required],
      timeline: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      acceptPrivacy: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.loadContactInfo();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadContactInfo(): void {
    const contactSub = this.landingPageService.getContactInfo().subscribe({
      next: (contactInfo) => {
        this.contactInfo = contactInfo;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contact info:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.push(contactSub);
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitError = false;
      this.submitSuccess = false;

      // Simular envío de formulario
      setTimeout(() => {
        // Aquí iría la lógica real de envío (API call)
        console.log('Formulario enviado:', this.contactForm.value);
        
        // Simular respuesta exitosa
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        
        // Resetear estado después de mostrar mensaje
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
        
      }, 2000); // Simular delay de red
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (field.errors['email']) {
        return 'Por favor ingresa un email válido';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Mínimo ${requiredLength} caracteres requeridos`;
      }
      if (field.errors['pattern']) {
        return 'Por favor ingresa un número de teléfono válido';
      }
    }
    
    return '';
  }

  copyToClipboard(text: string, type: string): void {
    if (this.isBrowser && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        // Aquí podrías mostrar una notificación de éxito
        console.log(`${type} copiado al portapapeles: ${text}`);
      }).catch(err => {
        console.error('Error al copiar al portapapeles:', err);
      });
    }
  }

  openSocialMedia(platform: string): void {
    if (this.isBrowser && this.contactInfo?.socialMedia) {
      const url = this.contactInfo.socialMedia[platform as keyof typeof this.contactInfo.socialMedia];
      if (url) {
        window.open(url, '_blank');
      }
    }
  }
}