export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
  highlight?: boolean;
  isPopular?: boolean;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
  stats?: {
    value: string;
    label: string;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  featured?: boolean;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  url?: string;
  featured?: boolean;
  completedDate: string;
  stats?: {
    performance: string;
    users: string;
    conversion: string;
  };
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

export interface CompanyInfo {
  name: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  foundedYear: number;
  teamSize: number;
}