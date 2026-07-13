import {
  Building2,
  FileSignature,
  Receipt,
  ShieldCheck,
  KeyRound,
  BadgeCheck,
  Landmark,
  Gavel,
  Wallet,
  Award,
  Globe2,
  Store,
  Utensils,
  Truck,
  Users,
  Factory,
  Sprout,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory =
  | "company-registration"
  | "tender-services"
  | "gst-taxation"
  | "government-licenses";

export interface Service {
  slug: string;
  title: string;
  short: string;
  category: ServiceCategory;
  icon: LucideIcon;
  suitableFor: string;
  benefits: string[];
  eligibility?: string[];
  documents: string[];
  process: string[];
  faqs: { q: string; a: string }[];
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  "company-registration": "Company Registration",
  "tender-services": "Tender Services",
  "gst-taxation": "GST & Taxation",
  "government-licenses": "Government Licenses",
};

export const SERVICES: Service[] = [
  {
    slug: "private-limited-company",
    title: "Private Limited Company",
    short:
      "The most preferred structure for startups seeking funding, credibility and limited liability.",
    category: "company-registration",
    icon: Building2,
    suitableFor: "Startups, growing businesses, and founders planning to raise investment.",
    benefits: [
      "Separate legal entity with limited liability",
      "Easier to raise equity funding",
      "Perpetual succession & brand credibility",
      "Preferred by banks and investors",
    ],
    eligibility: [
      "Minimum 2 directors and 2 shareholders",
      "At least one Indian resident director",
      "Registered office address in India",
    ],
    documents: [
      "PAN & Aadhaar of directors",
      "Passport-size photographs",
      "Address proof of directors",
      "Registered office proof (rent agreement / utility bill)",
      "NOC from the property owner",
    ],
    process: [
      "Consultation & name selection",
      "DSC & DIN for directors",
      "Name approval via SPICe+",
      "Drafting of MoA & AoA",
      "Filing with MCA & incorporation certificate",
    ],
    faqs: [
      {
        q: "How many directors are required?",
        a: "A Private Limited Company requires a minimum of 2 directors and can have up to 15.",
      },
      {
        q: "Is there a minimum capital requirement?",
        a: "There is no mandatory minimum paid-up capital as per the Companies Act.",
      },
    ],
  },
  {
    slug: "one-person-company",
    title: "One Person Company (OPC)",
    short:
      "Ideal for solo entrepreneurs who want a corporate structure with limited liability.",
    category: "company-registration",
    icon: Users,
    suitableFor: "Solo founders, consultants and small business owners.",
    benefits: [
      "Single owner with limited liability",
      "Separate legal identity",
      "Easier compliance than Pvt Ltd",
      "Better credibility than proprietorship",
    ],
    documents: [
      "PAN & Aadhaar of the promoter",
      "Passport-size photograph",
      "Address proof",
      "Registered office proof",
      "Nominee consent form",
    ],
    process: [
      "Consultation & name check",
      "DSC & DIN for the sole director",
      "Nominee appointment",
      "SPICe+ filing with MCA",
      "Certificate of Incorporation",
    ],
    faqs: [
      {
        q: "Can an NRI form an OPC?",
        a: "Yes, subject to conditions notified by the MCA — one Indian resident nominee is required.",
      },
    ],
  },
  {
    slug: "llp-registration",
    title: "LLP Registration",
    short:
      "A flexible partnership structure with limited liability and lower compliance.",
    category: "company-registration",
    icon: HeartHandshake,
    suitableFor: "Professional firms, service providers and small businesses.",
    benefits: [
      "Limited liability for partners",
      "Low compliance & audit cost",
      "Flexible internal structure",
      "No minimum capital requirement",
    ],
    documents: [
      "PAN & Aadhaar of partners",
      "Address proof of partners",
      "Registered office proof",
      "LLP agreement details",
    ],
    process: [
      "Name reservation via RUN-LLP",
      "DSC & DPIN for partners",
      "FiLLiP form filing",
      "LLP Agreement drafting & filing (Form 3)",
    ],
    faqs: [
      {
        q: "Is audit mandatory for LLPs?",
        a: "Audit is mandatory only if turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh.",
      },
    ],
  },
  {
    slug: "section-8-company",
    title: "Section 8 Company",
    short:
      "For non-profit organisations promoting education, charity, science, art or social welfare.",
    category: "company-registration",
    icon: ShieldCheck,
    suitableFor: "NGOs, foundations and non-profit initiatives.",
    benefits: [
      "Higher credibility than trust / society",
      "Tax exemptions under 12A & 80G (subject to approval)",
      "No minimum capital",
      "Can receive CSR funds",
    ],
    documents: [
      "PAN & Aadhaar of directors",
      "Address & photo proofs",
      "Registered office proof",
      "Draft MoA & AoA (Form INC-13)",
      "Projected income & expenditure",
    ],
    process: [
      "Name approval via SPICe+",
      "DSC & DIN for directors",
      "License application (Form INC-12)",
      "Certificate of Incorporation",
    ],
    faqs: [
      {
        q: "Are profits distributed to members?",
        a: "No. Profits, if any, must be applied only to promoting the objectives of the company.",
      },
    ],
  },
  {
    slug: "nidhi-company",
    title: "Nidhi Company",
    short:
      "A mutual benefit company registered to encourage savings among its members.",
    category: "company-registration",
    icon: Wallet,
    suitableFor: "Community savings groups and mutual benefit societies.",
    benefits: [
      "Regulated by MCA — trusted by members",
      "Simple lending & borrowing among members",
      "Lower regulatory burden than NBFC",
    ],
    documents: [
      "PAN & Aadhaar of 7 members / 3 directors",
      "Registered office proof",
      "Photographs & address proofs",
    ],
    process: [
      "Incorporate as Public Limited Company",
      "Meet Nidhi rules within 1 year",
      "File NDH-1 with MCA",
    ],
    faqs: [
      {
        q: "Can a Nidhi Company accept deposits from the public?",
        a: "No. It can accept deposits only from its own members.",
      },
    ],
  },
  {
    slug: "farmer-producer-company",
    title: "Farmer Producer Company",
    short:
      "A corporate structure for farmers to collectively access markets, credit and technology.",
    category: "company-registration",
    icon: Sprout,
    suitableFor: "Groups of farmers, agri-entrepreneurs and rural cooperatives.",
    benefits: [
      "Better bargaining power for produce",
      "Access to government schemes & credit",
      "Limited liability for members",
      "Professional management structure",
    ],
    documents: [
      "PAN & Aadhaar of 10+ producer members",
      "Land ownership / cultivation proof",
      "Registered office proof",
    ],
    process: [
      "Name reservation with MCA",
      "DSC & DIN for directors",
      "SPICe+ incorporation filing",
      "Certificate of Incorporation",
    ],
    faqs: [
      {
        q: "Who can become a member?",
        a: "Only primary producers such as farmers, artisans and pisciculturists can be members.",
      },
    ],
  },
  // Tenders
  {
    slug: "gem-registration",
    title: "GeM Registration",
    short:
      "List your business on the Government e-Marketplace and sell to government buyers.",
    category: "tender-services",
    icon: Landmark,
    suitableFor: "Manufacturers, traders and service providers.",
    benefits: [
      "Direct access to government buyers",
      "Transparent bidding process",
      "PAN-India visibility",
    ],
    documents: [
      "PAN & Aadhaar",
      "GST certificate",
      "MSME / Udyam certificate",
      "Bank account details",
      "Business address proof",
    ],
    process: [
      "Seller account creation",
      "Business & tax profile setup",
      "Catalogue & product listing",
      "Bid participation support",
    ],
    faqs: [
      {
        q: "Is GST mandatory for GeM?",
        a: "GST is generally required unless the product / service is exempt.",
      },
    ],
  },
  {
    slug: "maharashtra-e-tender",
    title: "Maharashtra E-Tender",
    short:
      "End-to-end registration and bid filing support on the Maharashtra e-Tendering portal.",
    category: "tender-services",
    icon: Gavel,
    suitableFor: "Contractors, suppliers and service providers in Maharashtra.",
    benefits: [
      "Access to state-wide tenders",
      "Guided bid submission",
      "Documentation support",
    ],
    documents: [
      "Digital Signature Certificate (Class 3)",
      "PAN, GST, Udyam",
      "Company / firm registration proof",
      "Past experience & work orders",
    ],
    process: [
      "Portal registration",
      "DSC mapping",
      "Category & class selection",
      "Bid submission support",
    ],
    faqs: [
      {
        q: "Do I need a DSC for e-tendering?",
        a: "Yes, a Class 3 Digital Signature Certificate is mandatory.",
      },
    ],
  },
  {
    slug: "e-procurement",
    title: "e-Procurement Registration",
    short:
      "Registration and bidding support across CPP, IREPS and other e-procurement portals.",
    category: "tender-services",
    icon: FileSignature,
    suitableFor: "Vendors supplying to Central & State Government departments.",
    benefits: [
      "Access to multi-department tenders",
      "Structured documentation",
      "Ongoing bidding assistance",
    ],
    documents: [
      "DSC (Class 3)",
      "PAN, GST, Udyam",
      "Company profile & experience proofs",
    ],
    process: [
      "Portal onboarding",
      "Profile verification",
      "Bid discovery & filing",
    ],
    faqs: [
      {
        q: "Which portals are covered?",
        a: "CPP Portal, IREPS, Defence portals and multiple state e-procurement portals.",
      },
    ],
  },
  {
    slug: "contractor-registration",
    title: "Government & PWD Contractor Registration",
    short:
      "Class-wise registration for Government Civil, PWD and other contractor categories.",
    category: "tender-services",
    icon: Award,
    suitableFor: "Civil contractors, infrastructure firms and works contractors.",
    benefits: [
      "Eligibility to bid in higher-value tenders",
      "Recognised contractor class",
      "Renewal & upgrade support",
    ],
    documents: [
      "PAN, GST, Udyam",
      "Firm registration proof",
      "Experience certificates & work orders",
      "Solvency certificate",
      "Machinery & manpower details",
    ],
    process: [
      "Category & class assessment",
      "Documentation & drafting",
      "Portal submission",
      "Follow-up with department",
    ],
    faqs: [
      {
        q: "Do you handle renewals?",
        a: "Yes — we handle new registration, class upgrades and periodic renewals.",
      },
    ],
  },
  {
    slug: "digital-signature-certificate",
    title: "Digital Signature Certificate",
    short:
      "Class 3 DSC issuance for tenders, MCA filings, income tax and e-signing.",
    category: "tender-services",
    icon: KeyRound,
    suitableFor: "Directors, professionals, contractors and vendors.",
    benefits: [
      "Legally valid digital signing",
      "Required for MCA, GST, ITR & tenders",
      "1 or 2 year validity options",
    ],
    documents: [
      "PAN card",
      "Aadhaar / address proof",
      "Passport-size photo",
      "Mobile number & email for eKYC",
    ],
    process: [
      "Application form filling",
      "Video KYC & verification",
      "DSC issuance on token",
    ],
    faqs: [
      {
        q: "How fast can I get a DSC?",
        a: "Typically issued within 1 working day after successful KYC.",
      },
    ],
  },
  // GST
  {
    slug: "gst-registration",
    title: "GST Registration",
    short:
      "GSTIN registration for businesses, freelancers and e-commerce sellers.",
    category: "gst-taxation",
    icon: Receipt,
    suitableFor: "All businesses crossing the threshold or opting voluntarily.",
    benefits: [
      "Legal recognition as a supplier",
      "Input tax credit eligibility",
      "Required for B2B & interstate trade",
    ],
    documents: [
      "PAN & Aadhaar",
      "Business address proof",
      "Bank account details",
      "Photograph & signature",
    ],
    process: [
      "Application on GST portal",
      "OTP-based verification",
      "ARN generation & GSTIN issuance",
    ],
    faqs: [
      {
        q: "How long does GST registration take?",
        a: "Typically 5–10 working days, subject to department processing timelines.",
      },
    ],
  },
  {
    slug: "gst-return-filing",
    title: "GST Return Filing",
    short:
      "Monthly, quarterly and annual GST return filing with reconciliation.",
    category: "gst-taxation",
    icon: FileSignature,
    suitableFor: "GST-registered businesses of all sizes.",
    benefits: [
      "Timely filing & penalty avoidance",
      "GSTR-1, 3B, 9 filing support",
      "Reconciliation with 2A / 2B",
    ],
    documents: [
      "Sales & purchase invoices",
      "Bank statements",
      "Previous return copies",
    ],
    process: [
      "Data collection & review",
      "Reconciliation",
      "Return preparation & filing",
    ],
    faqs: [
      {
        q: "What if I miss a return deadline?",
        a: "Late fees and interest apply. We help you file pending returns and minimise penalties.",
      },
    ],
  },
  {
    slug: "income-tax-return",
    title: "Income Tax Return",
    short:
      "ITR filing for individuals, professionals, firms and companies.",
    category: "gst-taxation",
    icon: Wallet,
    suitableFor: "Salaried, self-employed, businesses and companies.",
    benefits: [
      "Accurate return computation",
      "Refund tracking",
      "Notice & compliance support",
    ],
    documents: [
      "PAN & Aadhaar",
      "Form 16 / financials",
      "Bank statements",
      "Investment proofs",
    ],
    process: [
      "Data review",
      "Tax computation",
      "E-filing & acknowledgment",
    ],
    faqs: [
      {
        q: "Which ITR form applies to me?",
        a: "It depends on your income sources — we advise on the correct form during consultation.",
      },
    ],
  },
  // Licenses
  {
    slug: "msme-udyam-registration",
    title: "MSME / Udyam Registration",
    short:
      "Free Udyam registration to access MSME benefits, subsidies and priority lending.",
    category: "government-licenses",
    icon: BadgeCheck,
    suitableFor: "Micro, small and medium enterprises.",
    benefits: [
      "Priority sector lending",
      "Subsidies & government scheme access",
      "Protection against delayed payments",
    ],
    documents: ["Aadhaar", "PAN", "Business details", "Bank details"],
    process: [
      "Business classification",
      "Udyam portal filing",
      "Certificate download",
    ],
    faqs: [
      {
        q: "Is there any government fee?",
        a: "No, Udyam registration is free of cost on the government portal.",
      },
    ],
  },
  {
    slug: "shop-act-license",
    title: "Shop Act License",
    short:
      "Gumasta / Shop & Establishment license for retail and service businesses.",
    category: "government-licenses",
    icon: Store,
    suitableFor: "Shops, offices, workshops and commercial establishments.",
    benefits: [
      "Legal recognition of business",
      "Required for bank account & GST",
      "Simple renewal process",
    ],
    documents: [
      "PAN & Aadhaar",
      "Business address proof",
      "Photograph",
      "Utility bill of premises",
    ],
    process: ["Application", "Document upload", "License issuance"],
    faqs: [
      {
        q: "Is Shop Act mandatory?",
        a: "Yes, for most commercial establishments — rules vary by state.",
      },
    ],
  },
  {
    slug: "fssai-food-license",
    title: "FSSAI / Food License",
    short:
      "Basic, State and Central FSSAI licenses for food businesses.",
    category: "government-licenses",
    icon: Utensils,
    suitableFor:
      "Restaurants, cloud kitchens, manufacturers, traders and food exporters.",
    benefits: [
      "Consumer trust & legal compliance",
      "Enables B2B & e-commerce listing",
      "Brand credibility",
    ],
    documents: [
      "PAN & Aadhaar",
      "Business address proof",
      "Product list",
      "Photograph",
    ],
    process: [
      "License type assessment",
      "FSSAI portal filing",
      "License issuance",
    ],
    faqs: [
      {
        q: "Which FSSAI license do I need?",
        a: "Basic (up to ₹12L), State (₹12L–₹20Cr) or Central (>₹20Cr / import-export).",
      },
    ],
  },
  {
    slug: "import-export-code",
    title: "Import Export Code (IEC)",
    short:
      "10-digit code issued by DGFT — mandatory for import / export businesses.",
    category: "government-licenses",
    icon: Globe2,
    suitableFor: "Importers, exporters, e-commerce cross-border sellers.",
    benefits: [
      "Mandatory for customs clearance",
      "Access to DGFT benefits",
      "Lifetime validity (annual update required)",
    ],
    documents: [
      "PAN of business",
      "Aadhaar of proprietor / directors",
      "Bank certificate / cancelled cheque",
      "Address proof",
    ],
    process: ["Application on DGFT portal", "Verification", "IEC issuance"],
    faqs: [
      {
        q: "Do I need to renew IEC?",
        a: "IEC needs annual electronic updation on the DGFT portal.",
      },
    ],
  },
  {
    slug: "iso-certification",
    title: "ISO Certification",
    short:
      "ISO 9001, 14001, 45001 and other certifications to strengthen quality and credibility.",
    category: "government-licenses",
    icon: ShieldCheck,
    suitableFor: "Manufacturers, service providers and tender participants.",
    benefits: [
      "Improved processes & credibility",
      "Preferred by tender authorities",
      "International recognition",
    ],
    documents: [
      "Business registration proof",
      "Scope of certification",
      "Process documentation",
    ],
    process: [
      "Standard selection",
      "Gap analysis",
      "Audit & certification",
    ],
    faqs: [
      {
        q: "How long is ISO valid?",
        a: "Typically 3 years, with annual surveillance audits.",
      },
    ],
  },
  {
    slug: "trademark-registration",
    title: "Trademark Registration",
    short:
      "Protect your brand name, logo or slogan with a registered trademark.",
    category: "government-licenses",
    icon: Award,
    suitableFor:
      "Startups, brands, manufacturers and service providers of every size.",
    benefits: [
      "Exclusive rights to your brand",
      "Legal protection against misuse",
      "Adds asset value to the business",
    ],
    documents: [
      "Brand name / logo",
      "Business registration proof",
      "Applicant details",
      "MSME certificate (for discounted fee)",
    ],
    process: [
      "Trademark search",
      "Class selection & filing",
      "Examination & publication",
      "Registration certificate",
    ],
    faqs: [
      {
        q: "How long does trademark registration take?",
        a: "12–24 months if no objections; ™ symbol can be used from filing day.",
      },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const servicesByCategory = (c: ServiceCategory) =>
  SERVICES.filter((s) => s.category === c);

export const INDUSTRIES = [
  { name: "Startups", icon: Sprout },
  { name: "MSMEs", icon: BadgeCheck },
  { name: "Manufacturers", icon: Factory },
  { name: "Traders", icon: Store },
  { name: "Contractors", icon: Truck },
  { name: "NGOs", icon: HeartHandshake },
  { name: "Food Businesses", icon: Utensils },
  { name: "Exporters & Importers", icon: Globe2 },
  { name: "Service Businesses", icon: Users },
  { name: "Local Enterprises", icon: Landmark },
];
