export interface Testimonial {
  id: string;
  quoteKey: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  rating?: number;
}

export interface CaseStudy {
  id: string;
  slug: string;
  companyName: string;
  logoUrl: string;
  industryKey: string;
  headlineKey: string;
  metricValue: string;
  metricLabelKey: string;
  challengeKey: string;
  solutionKey: string;
  resultsKey: string;
  fullContent?: string;
}

export const CUSTOMER_LOGOS = [
  { name: 'Aura', logo: '/logos/aura.svg' },
  { name: 'Nexus', logo: '/logos/nexus.svg' },
  { name: 'Quantum', logo: '/logos/quantum.svg' },
  { name: 'Hyperion', logo: '/logos/hyperion.svg' },
  { name: 'Stark', logo: '/logos/stark.svg' },
  { name: 'Wayne', logo: '/logos/wayne.svg' },
  { name: 'Mono', logo: '/logos/mono.svg' },
  { name: 'Orbit', logo: '/logos/orbit.svg' },
  { name: 'Flux', logo: '/logos/flux.svg' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quoteKey: 'socialProof.testimonials.1.quote',
    name: 'Sarah Chen',
    title: 'Head of E-commerce',
    company: 'Luxe Fashion',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5,
  },
  {
    id: '2',
    quoteKey: 'socialProof.testimonials.2.quote',
    name: 'Marcus Thorne',
    title: 'Digital Marketing Director',
    company: 'TechGear',
    avatarUrl: 'https://i.pravatar.cc/150?u=marcus',
    rating: 5,
  },
  {
    id: '3',
    quoteKey: 'socialProof.testimonials.3.quote',
    name: 'Elena Rodriguez',
    title: 'Customer Experience Lead',
    company: 'HomeBloom',
    avatarUrl: 'https://i.pravatar.cc/150?u=elena',
    rating: 5,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    slug: 'luxe-fashion',
    companyName: 'Luxe Fashion',
    logoUrl: '/logos/aura.svg',
    industryKey: 'socialProof.caseStudies.1.industry',
    headlineKey: 'socialProof.caseStudies.1.headline',
    metricValue: '32%',
    metricLabelKey: 'socialProof.caseStudies.1.metricLabel',
    challengeKey: 'socialProof.caseStudies.1.challenge',
    solutionKey: 'socialProof.caseStudies.1.solution',
    resultsKey: 'socialProof.caseStudies.1.results',
  },
  {
    id: 'cs-2',
    slug: 'tech-gear',
    companyName: 'TechGear',
    logoUrl: '/logos/nexus.svg',
    industryKey: 'socialProof.caseStudies.2.industry',
    headlineKey: 'socialProof.caseStudies.2.headline',
    metricValue: '3x',
    metricLabelKey: 'socialProof.caseStudies.2.metricLabel',
    challengeKey: 'socialProof.caseStudies.2.challenge',
    solutionKey: 'socialProof.caseStudies.2.solution',
    resultsKey: 'socialProof.caseStudies.2.results',
  },
  {
    id: 'cs-3',
    slug: 'home-bloom',
    companyName: 'HomeBloom',
    logoUrl: '/logos/quantum.svg',
    industryKey: 'socialProof.caseStudies.3.industry',
    headlineKey: 'socialProof.caseStudies.3.headline',
    metricValue: '45%',
    metricLabelKey: 'socialProof.caseStudies.3.metricLabel',
    challengeKey: 'socialProof.caseStudies.3.challenge',
    solutionKey: 'socialProof.caseStudies.3.solution',
    resultsKey: 'socialProof.caseStudies.3.results',
  },
];
