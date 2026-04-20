export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pavy.ai",
    "url": "https://pavy.ai",
    "logo": "https://pavy.ai/pavy.ai-logo.svg",
    "sameAs": ["https://twitter.com/pavyai", "https://linkedin.com/company/pavyai"]
  };
}

export function getSoftwareApplicationSchema(name: string, description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description || "AI-powered product recommendation chatbot",
    "applicationCategory": "BusinessApplication",
    "offers": { 
      "@type": "Offer", 
      "price": "0", 
      "priceCurrency": "USD" 
    }
  };
}

export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
