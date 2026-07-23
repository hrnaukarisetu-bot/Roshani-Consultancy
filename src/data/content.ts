export const FAQS = [
  {
    q: "Which company registration is suitable for my business?",
    a: "It depends on your goals — Private Limited works best for startups seeking investors, LLP for professional firms, OPC for solo founders and Section 8 for non-profits. We recommend the right structure during your free consultation.",
  },
  {
    q: "What documents are required for company registration?",
    a: "Typically PAN, Aadhaar and address proof of directors, passport-size photographs and registered office proof (rent agreement / utility bill with NOC). Additional documents depend on the entity type.",
  },
  {
    q: "How long does GST registration take?",
    a: "Usually 5–10 working days after successful application, subject to department processing and verification.",
  },
  {
    q: "Can you help with government tenders?",
    a: "Yes. We assist with GeM registration, Maharashtra e-Tender, e-Procurement, contractor registration, DSC, technical / financial bid preparation and filing.",
  },
  {
    q: "Do you provide Digital Signature Certificates?",
    a: "Yes, we issue Class 3 DSCs for individuals and organisations with 1 or 2 year validity.",
  },
  {
    q: "Do you assist with FSSAI and Shop Act registrations?",
    a: "Yes, we handle FSSAI (Basic / State / Central) and Shop Act / Gumasta licenses across Maharashtra and pan-India.",
  },
  {
    q: "Can I get a free initial consultation?",
    a: "Absolutely. Our first consultation is free — call or WhatsApp us to schedule a call with an expert.",
  },
  {
    q: "Do you provide ongoing GST and compliance support?",
    a: "Yes. We offer monthly, quarterly and annual GST filing, ITR filing, audit support and full compliance retainerships.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Rohit Deshmukh",
    role: "Founder, Deshmukh Infra Pvt Ltd",
    quote:
      "Roshani IT Consultancy handled our Private Limited incorporation and PWD contractor registration seamlessly. Their team is prompt, transparent and highly knowledgeable.",
  },
  {
    name: "Sneha Kulkarni",
    role: "Director, Aarambh Foods",
    quote:
      "From FSSAI to GST filings, everything is now managed under one roof. The team explains every step and there are no hidden charges.",
  },
  {
    name: "Amit Rane",
    role: "Proprietor, Rane Enterprises",
    quote:
      "We won our first government tender with their guidance on GeM registration and bid preparation. Highly recommended for MSMEs.",
  },
  {
    name: "Priya Shah",
    role: "Partner, Shah Advisory Services",
    quote:
      "Their compliance support made our GST returns, DSC renewal and annual filings much easier to manage. The follow-up was consistent and professional.",
  },
  {
    name: "Nilesh Patil",
    role: "Owner, Patil Engineering Works",
    quote:
      "The team helped us complete MSME registration and tender documentation quickly. We always received clear updates and practical guidance.",
  },
  {
    name: "Meera Joshi",
    role: "Founder, Green Spoon Foods",
    quote:
      "Our FSSAI license and Shop Act registration were completed without confusion. They explained the requirements clearly and handled the paperwork end to end.",
  },
];

export interface Resource {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  cover: string;
  content: { heading?: string; body: string }[];
}

export const RESOURCES: Resource[] = [
  {
    slug: "private-limited-vs-llp",
    title: "Private Limited vs LLP: Which is Right for Your Business?",
    excerpt:
      "A side-by-side look at the two most popular business structures in India — liability, compliance, taxation and fundraising.",
    category: "Company Registration",
    readTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        body: "Choosing the right business structure is one of the most important decisions an entrepreneur makes. Two of the most popular options in India are the Private Limited Company (Pvt Ltd) and the Limited Liability Partnership (LLP).",
      },
      {
        heading: "Ownership & Liability",
        body: "Both structures offer limited liability, but a Pvt Ltd Company clearly separates ownership (shareholders) from management (directors), whereas an LLP treats partners as owners and managers.",
      },
      {
        heading: "Compliance",
        body: "LLPs typically have lighter compliance and lower audit thresholds than Private Limited Companies, making them attractive to service-based firms.",
      },
      {
        heading: "Fundraising",
        body: "Investors and VCs strongly prefer Pvt Ltd Companies because equity shares can be issued and transferred easily. LLPs cannot issue equity.",
      },
    ],
  },
  {
    slug: "gst-registration-guide",
    title: "GST Registration Guide for Indian Businesses",
    excerpt:
      "Thresholds, documents, process and common mistakes to avoid while applying for GSTIN.",
    category: "GST & Taxation",
    readTime: "5 min read",
    cover:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        body: "GST registration is mandatory for businesses exceeding the prescribed turnover threshold and for interstate suppliers, e-commerce operators and certain notified categories.",
      },
      {
        heading: "Documents Required",
        body: "PAN & Aadhaar of the proprietor / directors, business address proof, bank account details and photographs of the authorised signatory.",
      },
      {
        heading: "Timelines",
        body: "GSTINs are usually issued within 5–10 working days, subject to physical verification and department processing.",
      },
    ],
  },
  {
    slug: "how-to-register-on-gem",
    title: "How to Register on GeM (Government e-Marketplace)",
    excerpt:
      "Step-by-step walkthrough for sellers who want to supply to government departments through GeM.",
    category: "Tender Services",
    readTime: "7 min read",
    cover:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        body: "GeM is India's national procurement portal that allows government buyers to purchase directly from registered sellers.",
      },
      {
        heading: "Who Should Register",
        body: "Manufacturers, authorised resellers and service providers with valid PAN, GST (where applicable) and Udyam registration.",
      },
      {
        heading: "Registration Steps",
        body: "Create a seller account, complete the business profile, verify tax details, upload catalogue and start bidding on tenders.",
      },
    ],
  },
  {
    slug: "msme-documents-required",
    title: "Documents Required for MSME / Udyam Registration",
    excerpt:
      "Everything a micro, small or medium enterprise needs to register under Udyam.",
    category: "License & Government Certification",
    readTime: "4 min read",
    cover:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        body: "Udyam registration is a free, Aadhaar-based process that unlocks a wide range of MSME benefits including priority lending and government scheme access.",
      },
      {
        heading: "Documents Checklist",
        body: "Aadhaar of the proprietor, PAN of the business, bank details, business activity code and turnover / investment details.",
      },
    ],
  },
  {
    slug: "fssai-license-guide",
    title: "How to Apply for an FSSAI Food License",
    excerpt:
      "Basic, State and Central FSSAI licenses — eligibility, documents and turnaround times.",
    category: "License & Government Certification",
    readTime: "5 min read",
    cover:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        body: "Every food business operator (FBO) in India must obtain an FSSAI registration or license depending on turnover and scale of operations.",
      },
      {
        heading: "Choosing the Right License",
        body: "Basic (up to ₹12L turnover), State (₹12L–₹20Cr) and Central (>₹20Cr or import-export).",
      },
    ],
  },
  {
    slug: "importance-of-trademark",
    title: "Why Trademark Registration Matters for Every Brand",
    excerpt:
      "How a registered trademark protects your brand, builds trust and adds long-term business value.",
    category: "License & Government Certification",
    readTime: "5 min read",
    cover:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        body: "A trademark is one of the most valuable intangible assets a business can own. It legally protects your brand identity and prevents misuse by competitors.",
      },
    ],
  },
  {
    slug: "tender-filing-checklist",
    title: "Government Tender Filing Checklist",
    excerpt:
      "A practical checklist of documents, certifications and eligibility criteria to keep your bids competitive.",
    category: "Tender Services",
    readTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        body: "Successful tender participation demands attention to detail. Missing a single document can disqualify a bid.",
      },
      {
        heading: "Must-Have Documents",
        body: "PAN, GST, Udyam, DSC, contractor registration, experience certificates, solvency certificate and past work orders.",
      },
    ],
  },
  {
    slug: "iec-registration-guide",
    title: "IEC (Import Export Code) Registration Guide",
    excerpt:
      "Everything you need to obtain a 10-digit IEC from DGFT and start importing or exporting legally.",
    category: "License & Government Certification",
    readTime: "4 min read",
    cover:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80",
    content: [
      {
        body: "IEC is a mandatory registration for any person or business intending to import or export goods and services from India.",
      },
    ],
  },
];

export const getResource = (slug: string) => RESOURCES.find((r) => r.slug === slug);
