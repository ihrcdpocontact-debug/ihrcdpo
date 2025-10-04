// SEO utility functions for dynamic meta tag management
export interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const updateSEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonicalUrl
}: SEOProps) => {
  // Update document title
  document.title = title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let metaTag = document.querySelector(selector) as HTMLMetaElement;
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (property) {
        metaTag.setAttribute('property', name);
      } else {
        metaTag.setAttribute('name', name);
      }
      document.head.appendChild(metaTag);
    }
    
    metaTag.setAttribute('content', content);
  };

  // Update basic meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);  // Update Open Graph tags
  updateMetaTag('og:title', ogTitle || title, true);
  updateMetaTag('og:description', ogDescription || description, true);
  updateMetaTag('og:image', ogImage || 'https://ihrcdpo.com/logo.png', true);
  updateMetaTag('og:url', canonicalUrl || window.location.href, true);

  // Update Twitter tags
  updateMetaTag('twitter:title', ogTitle || title);
  updateMetaTag('twitter:description', ogDescription || description);
  updateMetaTag('twitter:image', ogImage || 'https://ihrcdpo.com/logo.png');

  // Update canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl || window.location.href);
};

// Page-specific SEO configurations
export const pageSEOConfig = {
  home: {
    title: "IHRCDPO - International Human Rights Commission and Domestic Protection Organisation | Bhongir, Telangana",
    description: "International Human Rights Commission and Domestic Protection Organisation (IHRCDPO) led by Chairman working in Bhongir, Telangana. Providing human rights advocacy, domestic protection services, emergency relief, youth empowerment. Contact us to get involved or donate.",
    keywords: "IHRCDPO, International Human Rights Commission, Domestic Protection Organisation, Bhongir, Telangana, Yadadri Bhongir District, human rights, NGO, Chairman IHRCDPO, President IHRCDPO, humanitarian aid, domestic violence protection, emergency relief, youth empowerment, community education, donate, get involved",
    canonicalUrl: "https://ihrcdpo.com/"
  },
  
  about: {
    title: "About Us - IHRCDPO Leadership Team | Chairman & President | Bhongir, Telangana",
    description: "Meet the leadership team of IHRCDPO including our Chairman and President. Learn about our mission, vision, and commitment to human rights advocacy in Bhongir, Telangana and across India.",
    keywords: "IHRCDPO about us, Chairman IHRCDPO, President IHRCDPO, leadership team, human rights organization Bhongir, Telangana NGO leaders, International Human Rights Commission team, Domestic Protection Organisation management",
    canonicalUrl: "https://ihrcdpo.com/about-us"
  },
  
  whatWeDo: {
    title: "What We Do - IHRCDPO Services | Human Rights Advocacy | Domestic Protection | Bhongir",
    description: "IHRCDPO provides human rights advocacy, domestic protection services, emergency relief, youth empowerment, and community education in Bhongir, Telangana. Learn about our comprehensive humanitarian services.",
    keywords: "IHRCDPO services, human rights advocacy, domestic protection services, emergency relief, youth empowerment, community education, crisis management, legal aid, humanitarian support, Bhongir Telangana",
    canonicalUrl: "https://ihrcdpo.com/what-we-do"
  },
  
  gallery: {
    title: "Gallery - IHRCDPO Photo Gallery | Humanitarian Work | Community Impact | Bhongir",
    description: "View photos of IHRCDPO's humanitarian work, community impact, and outreach programs in Bhongir, Telangana. See our moments that matter and beacon of hope initiatives.",
    keywords: "IHRCDPO gallery, humanitarian work photos, community impact, Bhongir Telangana photos, human rights work, domestic protection images, emergency relief photos, youth empowerment gallery",
    canonicalUrl: "https://ihrcdpo.com/gallery"
  },
  
  contact: {
    title: "Contact Us - IHRCDPO | Get in Touch | Bhongir, Telangana | +91-8374892433",
    description: "Contact IHRCDPO for support, partnerships, or inquiries. Located in Bhongir, Yadadri Bhongir District, Telangana. Phone: +91-8374892433, Email: contact@ihrcdpo.com",
    keywords: "contact IHRCDPO, IHRCDPO Bhongir address, phone number +91-8374892433, email contact@ihrcdpo.com, Gayatri Co-Operative Urban Bank Railway Station Bhongir, Telangana contact, human rights organization contact",
    canonicalUrl: "https://ihrcdpo.com/contact"
  },
  
  getInvolved: {
    title: "Get Involved - Join IHRCDPO | Volunteer | Donate | Partner | Bhongir, Telangana",
    description: "Join IHRCDPO's mission through volunteering, donations, and partnerships. Help us defend human rights and provide domestic protection in Bhongir, Telangana and beyond.",
    keywords: "get involved IHRCDPO, volunteer opportunities, donate to IHRCDPO, partnerships, join human rights mission, volunteer Bhongir Telangana, humanitarian volunteering, support domestic protection",
    canonicalUrl: "https://ihrcdpo.com/get-involved"
  },
  
  beaconOfHope: {
    title: "Beacon of Hope - IHRCDPO Success Stories | Impact Stories | Bhongir, Telangana",
    description: "Read inspiring stories of hope and impact from IHRCDPO's humanitarian missions in Bhongir, Telangana. See how we're making a difference in vulnerable communities.",
    keywords: "IHRCDPO success stories, beacon of hope, impact stories, humanitarian missions, community success, Bhongir Telangana impact, human rights success, domestic protection stories, emergency relief impact",
    canonicalUrl: "https://ihrcdpo.com/beacon-of-hope"
  },
  
  certifications: {
    title: "Certifications - IHRCDPO Official Documents | Legal Status | Registration | Bhongir",
    description: "View IHRCDPO's official certifications, legal documents, and registration details. Verify our legitimate status as a human rights organization in Bhongir, Telangana.",
    keywords: "IHRCDPO certifications, official documents, legal registration, NGO certification, human rights organization verification, legitimate NGO Bhongir, Telangana registration, Udyam registration",
    canonicalUrl: "https://ihrcdpo.com/certifications"
  }
};
