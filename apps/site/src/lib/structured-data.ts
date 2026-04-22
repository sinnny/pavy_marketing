const BASE_URL = 'https://pavy.ai';

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pavy.ai",
    "url": BASE_URL,
    "logo": `${BASE_URL}/pavy.ai-logo.svg`,
    "sameAs": ["https://twitter.com/pavyai", "https://linkedin.com/company/pavyai"]
  };
}

export function getSoftwareApplicationSchema(
  name: string,
  description?: string,
  url?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description || "AI-powered product recommendation chatbot",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    ...(url ? { "url": url } : {}),
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

export function getArticleSchema(params: {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": params.headline,
    "description": params.description,
    "image": params.image ? (params.image.startsWith('http') ? params.image : `${BASE_URL}${params.image}`) : undefined,
    "datePublished": params.datePublished,
    "author": {
      "@type": "Organization",
      "name": params.authorName || "Pavy AI Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pavy.ai",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/pavy.ai-logo.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": params.url.startsWith('http') ? params.url : `${BASE_URL}${params.url}`
    }
  };
}
