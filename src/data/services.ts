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
  ClipboardCheck,
  FileCheck,
  Handshake,
  IdCard,
  Paintbrush,
  RefreshCw,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory =
  | "company-registration"
  | "ngo-services"
  | "tender-services"
  | "gst-taxation"
  | "government-licenses"
  | "iso-services"
  | "trademark-services";

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
  "ngo-services": "NGO Services",
  "tender-services": "Tender Services",
  "gst-taxation": "GST & Tax Services",
  "government-licenses": "License & Government Certification",
  "iso-services": "ISO Services",
  "trademark-services": "Trademark Services",
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
    slug: "income-tax-return-filing",
    title: "Income Tax Return Filing",
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
    title: "ISO 9001:2015 Certification",
    short:
      "Quality management system certification support for businesses improving process control and credibility.",
    category: "iso-services",
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
    category: "trademark-services",
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
  {
    slug: "startup-india-registration",
    title: "Startup India Registration (DPIIT Recognition)",
    short: "DPIIT recognition support for eligible startups seeking credibility, scheme access and tax-benefit readiness.",
    category: "company-registration",
    icon: Sprout,
    suitableFor: "Innovative startups, founders and early-stage private companies or LLPs.",
    benefits: ["DPIIT recognition", "Startup scheme readiness", "Improved investor credibility", "IPR and tender benefit support"],
    eligibility: ["Entity should be a Private Limited Company, LLP or registered partnership", "Age and turnover limits must meet Startup India rules", "Business should work toward innovation, improvement or scalable employment creation"],
    documents: ["Entity registration certificate", "PAN details", "Founder details", "Website or pitch deck", "Brief note on innovation"],
    process: ["Eligibility review", "Document and profile preparation", "Startup India portal filing", "Clarification support", "Recognition certificate guidance"],
    faqs: [{ q: "Is DPIIT recognition available for proprietorships?", a: "DPIIT recognition is generally available for eligible companies, LLPs and registered partnerships, not ordinary proprietorships." }],
  },
  {
    slug: "sole-proprietorship-registration",
    title: "Sole Proprietorship Registration",
    short: "Simple business setup guidance for individual owners using suitable tax, shop, MSME and local registrations.",
    category: "company-registration",
    icon: UserCheck,
    suitableFor: "Solo business owners, traders, consultants and small local enterprises.",
    benefits: ["Easy to start", "Single-owner control", "Lower compliance burden", "Useful for small operations"],
    eligibility: ["Individual owner with valid PAN and Aadhaar", "Business address proof", "Activity-specific registrations may apply"],
    documents: ["PAN and Aadhaar", "Photograph", "Business address proof", "Bank details", "Utility bill or rent proof"],
    process: ["Business activity review", "Registration combination planning", "MSME, Shop Act, GST or tax setup where applicable", "Certificate and next-step guidance"],
    faqs: [{ q: "Is there one certificate for proprietorship registration?", a: "A proprietorship is usually established through supporting registrations such as MSME, Shop Act, GST, professional tax or bank documentation." }],
  },
  {
    slug: "partnership-firm-registration",
    title: "Partnership Firm Registration",
    short: "Draft and register a partnership firm with clear partner roles, capital contribution and business terms.",
    category: "company-registration",
    icon: Handshake,
    suitableFor: "Two or more owners running a traditional partnership business.",
    benefits: ["Clear partner rights", "Simple structure", "Shared ownership", "Banking and vendor credibility"],
    eligibility: ["Minimum two partners", "Valid partner identity and address proof", "Registered office or business address", "Partnership deed terms"],
    documents: ["PAN and Aadhaar of partners", "Photographs", "Address proof", "Business address proof", "Partnership deed details"],
    process: ["Partner consultation", "Deed drafting support", "Document notarisation guidance", "Registrar filing where applicable", "PAN and compliance guidance"],
    faqs: [{ q: "Is partnership registration mandatory?", a: "Registration is strongly recommended because an unregistered firm can face legal and banking limitations." }],
  },
  {
    slug: "section-8-microfinance-company-registration",
    title: "Section 8 Microfinance Company Registration",
    short: "Non-profit microfinance structure support for social-impact lending and community finance initiatives.",
    category: "company-registration",
    icon: Wallet,
    suitableFor: "Social entrepreneurs, NGOs and community finance initiatives.",
    benefits: ["Social-impact structure", "Limited liability", "Organised governance", "Community finance credibility"],
    eligibility: ["Non-profit objectives must be defined", "Promoters and directors must provide KYC", "Registered office in India", "Microfinance activity must follow applicable restrictions"],
    documents: ["Director PAN and Aadhaar", "Photographs", "Office proof", "Draft objects", "Projected financials"],
    process: ["Suitability review", "Objective drafting", "DSC and name process", "Section 8 licence filing", "Incorporation and compliance guidance"],
    faqs: [{ q: "Is this the same as an NBFC?", a: "No. A Section 8 microfinance structure is different from an RBI-regulated NBFC and must operate within applicable legal limits." }],
  },
  {
    slug: "society-registration",
    title: "Society Registration",
    short: "Registration support for charitable, educational, cultural and welfare societies with clear governing documents.",
    category: "ngo-services",
    icon: Users,
    suitableFor: "NGO founders, community groups, educational bodies and social welfare initiatives.",
    benefits: ["Formal NGO identity", "Member-based governance", "Banking and grant readiness", "State-level recognition"],
    eligibility: ["Minimum member requirements as per state law", "Defined charitable or social objectives", "Registered address and member KYC"],
    documents: ["Member PAN and Aadhaar", "Address proof", "Photographs", "Memorandum and rules", "Office proof"],
    process: ["Objective review", "Member document collection", "Drafting support", "Registrar submission", "Certificate guidance"],
    faqs: [{ q: "Can a society apply for 12A and 80G later?", a: "Yes, after registration it may apply separately subject to Income Tax Department eligibility and documentation." }],
  },
  {
    slug: "12a-80g-registration",
    title: "12A & 80G Registration",
    short: "Income tax exemption and donor deduction registration assistance for eligible NGOs and non-profit entities.",
    category: "ngo-services",
    icon: HeartHandshake,
    suitableFor: "Trusts, societies and Section 8 companies seeking tax exemption and donor credibility.",
    benefits: ["Income tax exemption readiness", "Donor deduction eligibility", "Improved fundraising credibility", "NGO compliance clarity"],
    eligibility: ["Registered non-profit entity", "Charitable objects and activity records", "Financial and compliance documents available"],
    documents: ["Registration certificate", "PAN", "MoA/trust deed", "Financial statements", "Activity reports"],
    process: ["Eligibility review", "Document preparation", "Income tax portal filing", "Query response support", "Order and compliance guidance"],
    faqs: [{ q: "Are 12A and 80G automatic after NGO registration?", a: "No. They require separate application and approval from the Income Tax Department." }],
  },
  {
    slug: "csr-registration",
    title: "CSR Registration",
    short: "CSR-1 registration support for eligible NGOs seeking to receive CSR project funding.",
    category: "ngo-services",
    icon: FileCheck,
    suitableFor: "Eligible NGOs, trusts, societies and Section 8 companies working with corporate CSR donors.",
    benefits: ["CSR funding eligibility", "Corporate donor readiness", "MCA filing support", "Institutional credibility"],
    eligibility: ["Eligible registered NGO", "Valid PAN", "12A and 80G details where applicable", "Professional certification requirements"],
    documents: ["NGO registration proof", "PAN", "12A and 80G certificates", "Board details", "DSC where required"],
    process: ["Eligibility check", "Document review", "CSR-1 preparation", "Professional certification coordination", "MCA filing guidance"],
    faqs: [{ q: "Is CSR-1 required to receive CSR funds?", a: "For covered CSR activities, CSR-1 registration is generally required for implementing agencies." }],
  },
  {
    slug: "ngo-darpan-registration",
    title: "NITI Aayog Registration / NGO Darpan",
    short: "NGO Darpan profile creation and unique ID assistance for NGOs working with government schemes and grants.",
    category: "ngo-services",
    icon: Landmark,
    suitableFor: "NGOs, trusts, societies and Section 8 companies applying for government-linked programs.",
    benefits: ["NITI Aayog unique ID", "Government grant readiness", "Organisation profile credibility", "Scheme application support"],
    eligibility: ["Registered NGO", "Valid PAN", "Office bearers' Aadhaar/PAN details", "Accurate activity information"],
    documents: ["Registration certificate", "PAN", "Office bearer details", "MoA or deed", "Contact and address details"],
    process: ["NGO profile review", "Document collection", "Portal profile creation", "Verification support", "Unique ID guidance"],
    faqs: [{ q: "Is NGO Darpan a replacement for NGO registration?", a: "No. It is a portal registration for already registered NGOs and helps with government-linked applications." }],
  },
  {
    slug: "csr-exchange-registration",
    title: "CSR Exchange Registration",
    short: "CSR exchange and donor-discovery profile assistance for NGOs presenting projects to corporate funders.",
    category: "ngo-services",
    icon: Handshake,
    suitableFor: "NGOs and social impact organisations seeking CSR visibility and project presentation support.",
    benefits: ["CSR project visibility", "Donor profile readiness", "Structured project information", "Funding conversation support"],
    eligibility: ["Registered NGO", "Clear project details", "Compliance certificates where applicable", "Impact and financial information"],
    documents: ["NGO registration proof", "PAN", "12A/80G/CSR-1 if available", "Project note", "Financial and activity reports"],
    process: ["Profile readiness review", "Project detail collection", "Document upload guidance", "Profile submission", "Follow-up support"],
    faqs: [{ q: "Does registration guarantee CSR funding?", a: "No. It improves profile readiness and visibility, but funding decisions remain with corporate donors." }],
  },
  {
    slug: "lei-registration",
    title: "LEI Registration",
    short: "Legal Entity Identifier application support for eligible entities involved in regulated financial transactions.",
    category: "ngo-services",
    icon: IdCard,
    suitableFor: "Companies, LLPs, trusts and entities needing LEI for banking or financial compliance.",
    benefits: ["Global entity identification", "Banking compliance support", "Transaction readiness", "Renewal guidance"],
    eligibility: ["Registered legal entity", "Authorised signatory details", "Entity documents and address proof", "LEI requirement from bank or counterparty"],
    documents: ["Registration certificate", "PAN", "Address proof", "Authorisation letter", "Signatory KYC"],
    process: ["Requirement review", "Document collection", "LEI application", "Verification coordination", "LEI issuance or renewal guidance"],
    faqs: [{ q: "Does LEI need renewal?", a: "Yes. LEI records generally require annual renewal to keep entity data active and current." }],
  },
  {
    slug: "gst-annual-return-filing-gstr-9",
    title: "GST Annual Return Filing - GSTR-9",
    short: "Annual GST return preparation with turnover, tax liability and ITC reconciliation for eligible taxpayers.",
    category: "gst-taxation",
    icon: ClipboardCheck,
    suitableFor: "GST-registered businesses required to file annual return GSTR-9.",
    benefits: ["Annual compliance closure", "ITC reconciliation", "Mismatch reduction", "Better GST record hygiene"],
    eligibility: ["Active GST registration", "Annual filing applicability as per GST rules", "Sales, purchase and return data availability"],
    documents: ["GSTR-1 and GSTR-3B records", "Sales and purchase data", "ITC ledgers", "Financial statements", "GST login access or authorisation"],
    process: ["Applicability check", "Data collection", "Reconciliation", "GSTR-9 preparation", "Review and filing"],
    faqs: [{ q: "Is GSTR-9 mandatory for every GST taxpayer?", a: "Applicability depends on turnover, taxpayer type and current GST notifications." }],
  },
  {
    slug: "gst-lut-filing",
    title: "GST LUT Filing",
    short: "Letter of Undertaking filing support for eligible exporters supplying goods or services without IGST payment.",
    category: "gst-taxation",
    icon: Globe2,
    suitableFor: "Exporters of goods or services and businesses making zero-rated supplies.",
    benefits: ["Export without upfront IGST", "Improved working capital", "Annual LUT compliance", "Portal-based filing support"],
    eligibility: ["Active GSTIN", "Exporter or zero-rated supply activity", "Valid authorised signatory", "No disqualifying prosecution conditions as applicable"],
    documents: ["GST certificate", "IEC where applicable", "Authorised signatory details", "Export invoice or business details", "Previous LUT if any"],
    process: ["Eligibility review", "Document check", "GST portal LUT filing", "Acknowledgement download", "Export compliance guidance"],
    faqs: [{ q: "How often is LUT filed?", a: "LUT is generally filed for a financial year and should be renewed as required." }],
  },
  {
    slug: "income-tax-return-filing-online",
    title: "Income Tax Return Filing Online",
    short: "Online ITR filing assistance for salaried individuals, professionals and taxpayers with multiple income sources.",
    category: "gst-taxation",
    icon: Receipt,
    suitableFor: "Individuals, professionals, freelancers and taxpayers needing online ITR filing.",
    benefits: ["Correct ITR form selection", "Deduction review", "Refund tracking", "E-verification guidance"],
    eligibility: ["PAN and Aadhaar linkage where applicable", "Income and deduction records", "Bank and tax payment details"],
    documents: ["PAN and Aadhaar", "Form 16 or income details", "AIS/Form 26AS", "Bank details", "Investment proofs"],
    process: ["Income profile review", "Document collection", "Tax computation", "ITR preparation", "E-filing and acknowledgement"],
    faqs: [{ q: "Can you help if I have salary and freelance income?", a: "Yes. We review all income heads and suggest the applicable ITR form." }],
  },
  {
    slug: "business-itr-filing",
    title: "Business ITR Filing",
    short: "Income tax return filing support for proprietorships, firms, LLPs and companies with business income.",
    category: "gst-taxation",
    icon: FileSignature,
    suitableFor: "Businesses, firms, LLPs, companies and self-employed professionals.",
    benefits: ["Business income computation", "Financial statement review", "Tax audit coordination", "Notice-risk reduction"],
    eligibility: ["Business income records", "Books or financial statements", "PAN and tax portal access", "Audit applicability review"],
    documents: ["Financial statements", "Bank statements", "Sales and purchase records", "GST data where applicable", "TDS and advance tax details"],
    process: ["Entity profile review", "Books and tax data check", "Computation", "Return preparation", "Filing and acknowledgement"],
    faqs: [{ q: "Is audit required for my business ITR?", a: "Audit applicability depends on turnover, profit declaration, entity type and tax provisions." }],
  },
  {
    slug: "professional-tax-registration",
    title: "Professional Tax Registration",
    short: "Professional tax employer and employee registration support for businesses with state-level compliance obligations.",
    category: "government-licenses",
    icon: Receipt,
    suitableFor: "Employers, establishments and professionals in states where professional tax applies.",
    benefits: ["State tax compliance", "Payroll readiness", "Avoidance of late fees", "Certificate and return guidance"],
    eligibility: ["Business operating in an applicable state", "Employee or professional income details", "Valid business and address proof"],
    documents: ["PAN and Aadhaar", "Business registration proof", "Address proof", "Employee details", "Bank details"],
    process: ["Applicability review", "Document collection", "State portal application", "Certificate guidance", "Filing calendar support"],
    faqs: [{ q: "Does professional tax apply in every state?", a: "No. Applicability, limits and return rules vary by state." }],
  },
  {
    slug: "ptec-registration",
    title: "PTEC Registration",
    short: "Professional Tax Enrolment Certificate assistance for business owners, professionals and entities.",
    category: "government-licenses",
    icon: IdCard,
    suitableFor: "Business owners, professionals, partners, directors and entities liable for enrolment.",
    benefits: ["Owner-level professional tax compliance", "State portal registration", "Penalty-risk reduction", "Payment guidance"],
    eligibility: ["Applicant must be liable under state professional tax law", "Valid PAN and address details", "Business or professional activity details"],
    documents: ["PAN and Aadhaar", "Photograph", "Business proof", "Address proof", "Mobile and email"],
    process: ["Liability check", "Document preparation", "PTEC portal application", "Certificate download", "Payment guidance"],
    faqs: [{ q: "Is PTEC different from PTRC?", a: "Yes. PTEC is generally enrolment for the owner/entity, while PTRC is registration for deducting professional tax from employees." }],
  },
  {
    slug: "duns-number-registration",
    title: "DUNS Number Registration",
    short: "D-U-N-S Number application guidance for businesses seeking global vendor, tender or partner identification.",
    category: "government-licenses",
    icon: Globe2,
    suitableFor: "Exporters, suppliers, tender vendors and businesses working with global partners.",
    benefits: ["Global business identity", "Vendor onboarding support", "Tender profile readiness", "Credibility for partners"],
    eligibility: ["Valid business identity", "Operational address", "Authorised contact details", "Verification information availability"],
    documents: ["Business registration proof", "PAN/GST details", "Address proof", "Authorised person details", "Website or business profile if available"],
    process: ["Requirement review", "Business profile preparation", "Application assistance", "Verification coordination", "Number guidance"],
    faqs: [{ q: "Is a DUNS Number a government registration?", a: "No. It is a business identification number used in many vendor and global compliance workflows." }],
  },
  {
    slug: "apeda-registration",
    title: "APEDA Registration",
    short: "Registration-cum-membership certificate assistance for eligible agricultural and processed food exporters.",
    category: "government-licenses",
    icon: Sprout,
    suitableFor: "Exporters of scheduled agricultural and processed food products.",
    benefits: ["Exporter recognition", "APEDA scheme readiness", "Export documentation support", "Buyer credibility"],
    eligibility: ["IEC is generally required", "Eligible scheduled product activity", "Valid business and bank details"],
    documents: ["IEC certificate", "PAN and GST details", "Bank certificate or cancelled cheque", "Business registration proof", "Product details"],
    process: ["Product eligibility check", "Document collection", "APEDA portal filing", "Payment and submission", "RCMC certificate guidance"],
    faqs: [{ q: "Is IEC needed before APEDA?", a: "IEC is generally required for export-related registrations including APEDA RCMC." }],
  },
  {
    slug: "mlwb-registration",
    title: "MLWB - Maharashtra Labour Welfare Board Registration",
    short: "Maharashtra Labour Welfare Board registration and contribution guidance for covered establishments.",
    category: "government-licenses",
    icon: Users,
    suitableFor: "Maharashtra establishments covered by labour welfare contribution rules.",
    benefits: ["State labour compliance", "Employee welfare contribution readiness", "Return and payment guidance", "Penalty-risk reduction"],
    eligibility: ["Establishment located in Maharashtra", "Employee count and coverage review", "Business and employee details available"],
    documents: ["Shop Act or entity proof", "PAN/GST details", "Employee details", "Address proof", "Authorised signatory details"],
    process: ["Coverage review", "Document preparation", "Portal registration", "Contribution guidance", "Compliance calendar setup"],
    faqs: [{ q: "Is MLWB only for Maharashtra?", a: "Yes. This service covers Maharashtra Labour Welfare Board requirements." }],
  },
  {
    slug: "manpower-supply-agency-license",
    title: "Manpower Supply Agency License",
    short: "Licensing and compliance support for agencies supplying contract labour or workforce services.",
    category: "government-licenses",
    icon: Users,
    suitableFor: "Manpower suppliers, staffing agencies, labour contractors and facility service providers.",
    benefits: ["Contract labour compliance", "Client onboarding credibility", "Tender eligibility support", "Structured workforce records"],
    eligibility: ["Business entity or proprietorship details", "Principal employer or contract details where applicable", "Worker and establishment details"],
    documents: ["Business proof", "PAN/GST details", "Address proof", "Work order or agreement where applicable", "Employee or worker details"],
    process: ["License applicability review", "Document checklist", "Application preparation", "Authority submission", "Renewal and register guidance"],
    faqs: [{ q: "Which labour license is needed?", a: "The exact licence depends on state rules, number of workers, contract model and work location." }],
  },
  {
    slug: "pasara-license-security-agency-license",
    title: "PASARA License - Security Agency License",
    short: "Security agency licence assistance for private security service providers and guard deployment businesses.",
    category: "government-licenses",
    icon: ShieldCheck,
    suitableFor: "Private security agencies, guard service providers and facility management businesses.",
    benefits: ["Legal security agency operations", "Tender and client eligibility", "Police verification guidance", "Renewal support"],
    eligibility: ["Eligible proprietor, firm or company", "Director or owner background requirements", "Office and training compliance as applicable"],
    documents: ["Entity documents", "Owner/director KYC", "Office proof", "Affidavits and declarations", "Police verification documents where required"],
    process: ["Eligibility screening", "Document preparation", "State application filing", "Verification coordination", "Licence and renewal guidance"],
    faqs: [{ q: "Is police verification required?", a: "Security agency licensing commonly includes background or police verification steps as per state requirements." }],
  },
  {
    slug: "iso-certification-all-types",
    title: "ISO Certification - All Types",
    short: "Guidance for ISO 9001, 14001, 45001, 27001, HACCP and other management system certifications.",
    category: "iso-services",
    icon: Award,
    suitableFor: "Manufacturers, service providers, exporters, IT companies and tender participants.",
    benefits: ["Multiple ISO standards", "Tender credibility", "Process improvement", "Audit coordination"],
    eligibility: ["Defined business scope", "Basic process records", "Management system readiness", "Certification body audit required"],
    documents: ["Business registration proof", "Scope of certification", "Process documents", "Organisation chart", "Site and employee details"],
    process: ["Standard selection", "Gap review", "Documentation support", "Implementation guidance", "Audit coordination", "Certificate guidance"],
    faqs: [{ q: "Which ISO standard should I choose?", a: "The right standard depends on your industry, tender requirement and operational goals." }],
  },
  {
    slug: "trademark-renewal",
    title: "Trademark Renewal",
    short: "Renew registered trademarks on time and keep your brand protection active without avoidable lapse risk.",
    category: "trademark-services",
    icon: RefreshCw,
    suitableFor: "Trademark owners, companies, proprietors, NGOs and brand managers.",
    benefits: ["Continued brand protection", "Avoidance of removal risk", "Renewal docket guidance", "Record update support"],
    eligibility: ["Existing trademark application or registration", "Renewal window or restoration eligibility", "Applicant or authorised signatory details"],
    documents: ["Trademark registration certificate", "Application number", "Applicant KYC", "Power of attorney where applicable", "Brand owner details"],
    process: ["Trademark status check", "Renewal eligibility review", "Document preparation", "Registry filing", "Acknowledgement and status guidance"],
    faqs: [{ q: "When should a trademark be renewed?", a: "A registered trademark is generally renewed every 10 years, with renewal and restoration windows governed by registry rules." }],
  },
  {
    slug: "logo-designing",
    title: "Logo Designing",
    short: "Professional logo design support for businesses preparing brand launch, registration and trademark filing.",
    category: "trademark-services",
    icon: Paintbrush,
    suitableFor: "Startups, small businesses, NGOs, product brands and service providers.",
    benefits: ["Professional brand identity", "Trademark filing readiness", "Consistent visual use", "Launch-friendly assets"],
    eligibility: ["Clear brand name or concept", "Business activity details", "Preferred style or usage requirements"],
    documents: ["Brand name", "Business description", "Preferred colours or references", "Target audience notes", "Usage requirements"],
    process: ["Brand brief", "Concept direction", "Logo design options", "Revision support", "Final files guidance"],
    faqs: [{ q: "Can the logo be used for trademark filing?", a: "Yes, final logo artwork can be prepared for trademark filing, subject to distinctiveness and registry examination." }],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === (SERVICE_SLUG_ALIASES[slug] || slug));
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

export const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "income-tax-return": "income-tax-return-filing",
};
