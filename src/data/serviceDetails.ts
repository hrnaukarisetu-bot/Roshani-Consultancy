import { CATEGORY_LABELS, type Service, type ServiceCategory } from "@/data/services";

export interface BenefitDetail {
  title: string;
  description: string;
}

export interface DocumentGroup {
  title: string;
  items: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceDetailContent {
  slug: string;
  category: ServiceCategory;
  title: string;
  shortTitle: string;
  tagline: string;
  shortDescription: string;
  overview: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  benefits: BenefitDetail[];
  whoShouldApply: string[];
  eligibility: string[];
  documentGroups: DocumentGroup[];
  processSteps: ProcessStep[];
  estimatedTimeline: string;
  supportType: string;
  deliverables: string[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
}

const note =
  "Exact document requirements may vary depending on the applicant type, business structure and applicable authority.";
const feeNote =
  "Government fees and professional charges may vary based on the application type.";

const step = (title: string, description: string): ProcessStep => ({ title, description });

export const SERVICE_DETAILS: Record<string, ServiceDetailContent> = {
  "private-limited-company": {
    slug: "private-limited-company",
    category: "company-registration",
    title: "Private Limited Company",
    shortTitle: "Private Limited",
    tagline: "Build a scalable company structure for growth, credibility and investment readiness.",
    shortDescription:
      "Get assisted Private Limited Company incorporation with name review, DSC/DIN guidance, MCA filing support and post-incorporation compliance orientation.",
    overview: [
      "A Private Limited Company is a separate legal entity that allows founders to run a business with limited liability, defined shareholding and a structured management framework.",
      "It is commonly preferred by startups and growing businesses because it supports multiple shareholders, employee equity planning and a more investor-friendly governance structure.",
      "Roshani Consultancy assists with name selection, director documentation, DSC coordination, SPICe+ filing support, PAN and TAN steps where applicable, and practical guidance after incorporation.",
    ],
    metaTitle: "Private Limited Company Registration in India | Roshani Consultancy",
    metaDescription:
      "Get expert assistance for Private Limited Company registration, including eligibility review, document preparation, MCA filing support and compliance guidance from Roshani Consultancy.",
    keywords: ["private limited company registration", "pvt ltd registration", "company incorporation india"],
    benefits: [
      { title: "Separate Legal Identity", description: "The company can own assets, enter contracts and operate independently from its shareholders." },
      { title: "Limited Liability Protection", description: "Shareholder liability is generally limited to unpaid share capital, subject to applicable law." },
      { title: "Funding Friendly Structure", description: "A clear shareholding model is preferred by many investors, lenders and startup programs." },
      { title: "Improved Business Credibility", description: "A registered company can strengthen trust with vendors, customers and institutions." },
      { title: "Continuity of Business", description: "The company can continue even if directors or shareholders change." },
      { title: "Organised Compliance", description: "Defined filings and registers create a disciplined foundation for future growth." },
    ],
    whoShouldApply: ["Startups planning to raise funds", "Founders building a scalable brand", "Businesses with two or more promoters", "Companies needing structured ownership", "Service, trading and technology ventures"],
    eligibility: ["Minimum 2 directors and 2 shareholders", "At least one director must be resident in India", "Registered office address in India", "Valid identity and address proof for directors", "Proposed name must satisfy MCA naming rules"],
    documentGroups: [
      { title: "Director Documents", items: ["PAN card", "Aadhaar card", "Photograph", "Mobile number and email", "Address proof"] },
      { title: "Registered Office Proof", items: ["Latest utility bill", "Rent agreement or ownership proof", "NOC from owner, if rented"] },
      { title: "Company Details", items: ["Proposed company names", "Business activity details", "Shareholding pattern", "Authorised capital details"] },
    ],
    processSteps: [
      step("Initial Consultation", "We review founder details, business activity, shareholding and suitability of a Private Limited Company."),
      step("Name and Requirement Review", "Proposed names and MCA requirements are checked before filing."),
      step("DSC and Director Details", "Digital signature and director information are coordinated for the incorporation application."),
      step("Document Preparation", "MoA, AoA and incorporation documents are prepared based on the proposed structure."),
      step("MCA Application Filing", "The SPICe+ linked forms are filed on the MCA portal after applicant confirmation."),
      step("Query Support", "If MCA raises a query, we assist with clarification and corrected documentation."),
      step("Incorporation Completion", "Certificate, PAN/TAN details where applicable and next compliance checklist are shared."),
    ],
    estimatedTimeline: "Usually 7-15 working days, subject to name approval, document readiness and MCA processing",
    supportType: "End-to-End Incorporation Assistance",
    deliverables: ["Name availability guidance", "DSC coordination assistance", "MoA and AoA preparation support", "MCA incorporation filing support", "Certificate and PAN/TAN guidance where applicable", "Post-incorporation compliance checklist"],
    faqs: [
      { q: "How many people are required to start a Private Limited Company?", a: "A minimum of two directors and two shareholders is required. The same individuals may act as both directors and shareholders." },
      { q: "Is minimum capital mandatory?", a: "There is no mandatory minimum paid-up capital under the Companies Act, but practical capital should match the business plan." },
      { q: "Can a salaried person become a director?", a: "Generally yes, but employment terms should be reviewed before becoming a director or shareholder." },
      { q: "Does registration include GST?", a: "GST registration is a separate service and depends on business activity, turnover and other applicability rules." },
      { q: "How long does incorporation take?", a: "It usually takes 7-15 working days when documents are ready, but MCA processing and name approval timelines may vary." },
      { q: "What compliance is needed after incorporation?", a: "Common next steps include bank account opening, statutory registers, auditor appointment and annual MCA and tax filings." },
    ],
    relatedServices: ["digital-signature-certificate", "gst-registration", "trademark-registration"],
  },
  "one-person-company": {
    slug: "one-person-company",
    category: "company-registration",
    title: "One Person Company - OPC",
    shortTitle: "OPC",
    tagline: "A corporate structure for solo founders who want limited liability and formal recognition.",
    shortDescription:
      "Get guided OPC incorporation support with nominee documentation, DSC coordination, MCA filing assistance and compliance orientation.",
    overview: [
      "A One Person Company allows an individual entrepreneur to operate through a company structure while retaining single-member ownership.",
      "It offers separate legal identity and limited liability, making it more formal than a proprietorship while staying suitable for solo founders.",
      "Roshani Consultancy helps review eligibility, nominee requirements, director documents, incorporation forms and conversion considerations as the business grows.",
    ],
    metaTitle: "One Person Company Registration in India | Roshani Consultancy",
    metaDescription:
      "Get expert OPC registration assistance, including nominee requirement review, document preparation, MCA filing support and compliance guidance.",
    keywords: ["opc registration", "one person company registration", "single founder company india"],
    benefits: [
      { title: "Single Owner Control", description: "One individual can own and manage the company subject to OPC rules." },
      { title: "Limited Liability", description: "Personal exposure is generally limited compared with an unregistered business structure." },
      { title: "Separate Legal Identity", description: "The OPC can operate as a distinct legal entity." },
      { title: "Professional Credibility", description: "A registered company profile can improve trust with customers and vendors." },
      { title: "Structured Growth Path", description: "Conversion options may be considered when the business expands." },
    ],
    whoShouldApply: ["Solo entrepreneurs", "Independent consultants", "Single-founder digital businesses", "Small service providers", "Professionals wanting corporate identity"],
    eligibility: ["Only one member/shareholder", "Nominee details and consent required", "Resident individual conditions apply as per current law", "Registered office address in India", "Proposed name must satisfy MCA rules"],
    documentGroups: [
      { title: "Promoter Documents", items: ["PAN card", "Aadhaar card", "Photograph", "Address proof", "Mobile number and email"] },
      { title: "Nominee Documents", items: ["Nominee PAN and Aadhaar", "Nominee consent", "Address proof"] },
      { title: "Office and Business Details", items: ["Utility bill", "Rent agreement or ownership proof", "NOC from owner", "Business activity details"] },
    ],
    processSteps: [
      step("Suitability Review", "We confirm whether OPC is suitable compared with proprietorship, LLP or Private Limited Company."),
      step("Nominee Planning", "Nominee details and consent requirements are reviewed."),
      step("DSC Coordination", "Digital signature requirements for the applicant are coordinated."),
      step("Name and Document Preparation", "Company name, object clause and supporting documents are prepared."),
      step("MCA Filing", "Incorporation forms are filed on the MCA portal after confirmation."),
      step("Clarification Support", "Department queries, if any, are handled with applicant coordination."),
      step("Completion Guidance", "Incorporation records and post-registration steps are shared."),
    ],
    estimatedTimeline: "Usually 7-15 working days, subject to document readiness and MCA processing",
    supportType: "OPC Incorporation Assistance",
    deliverables: ["OPC eligibility review", "Nominee documentation checklist", "Incorporation document preparation", "MCA filing support", "Certificate guidance", "Compliance and conversion notes"],
    faqs: [
      { q: "Who can start an OPC?", a: "An eligible individual can form an OPC subject to the current Companies Act and MCA rules." },
      { q: "Is a nominee mandatory for OPC?", a: "Yes, nominee details and consent are required as part of OPC incorporation." },
      { q: "Can OPC have more than one shareholder?", a: "No. OPC is designed for one shareholder. A different structure may be needed for multiple owners." },
      { q: "Can OPC be converted later?", a: "Conversion may be possible subject to applicable rules and business circumstances." },
      { q: "Are government fees included?", a: feeNote },
      { q: "Does OPC need annual compliance?", a: "Yes. OPCs have annual MCA and tax compliance requirements." },
    ],
    relatedServices: ["digital-signature-certificate", "gst-registration", "income-tax-return-filing"],
  },
  "llp-registration": {
    slug: "llp-registration",
    category: "company-registration",
    title: "LLP Registration",
    shortTitle: "LLP",
    tagline: "A flexible partnership model with limited liability for professionals and service businesses.",
    shortDescription:
      "Get LLP incorporation assistance including partner documentation, DPIN/DSC coordination, LLP agreement support and MCA filing guidance.",
    overview: [
      "A Limited Liability Partnership combines operational flexibility with limited liability for partners.",
      "It is widely used by consultants, agencies, professionals and small businesses that need a formal entity without a company-style shareholding structure.",
      "Roshani Consultancy assists with name reservation, designated partner documentation, FiLLiP filing, LLP agreement preparation and annual compliance orientation.",
    ],
    metaTitle: "LLP Registration in India | Roshani Consultancy",
    metaDescription:
      "Get expert LLP registration assistance, including partner eligibility review, document preparation, LLP agreement support and MCA filing guidance.",
    keywords: ["llp registration", "limited liability partnership", "llp agreement filing"],
    benefits: [
      { title: "Limited Liability for Partners", description: "Partners receive liability protection subject to LLP law and agreement terms." },
      { title: "Flexible Internal Agreement", description: "The LLP agreement can define profit sharing, duties and management rules." },
      { title: "Lower Compliance Burden", description: "Compliance is generally simpler than many company structures." },
      { title: "No Minimum Capital", description: "Partners can decide contribution based on business needs." },
      { title: "Professional Credibility", description: "A registered LLP improves formal recognition with clients and institutions." },
    ],
    whoShouldApply: ["Professional firms", "Consultants and agencies", "Small service businesses", "Partnerships seeking limited liability", "Businesses with two or more partners"],
    eligibility: ["Minimum 2 designated partners", "At least one designated partner resident in India", "Registered office address in India", "Valid partner identity and address proof", "LLP agreement must be filed after incorporation"],
    documentGroups: [
      { title: "Partner Documents", items: ["PAN card", "Aadhaar card", "Photograph", "Address proof", "Mobile number and email"] },
      { title: "Office Proof", items: ["Utility bill", "Rent agreement or ownership proof", "NOC from owner"] },
      { title: "LLP Details", items: ["Proposed LLP names", "Business activity", "Contribution details", "Profit-sharing terms"] },
    ],
    processSteps: [
      step("Consultation", "We review partner roles, contribution and business activity."),
      step("Name Reservation", "Suitable names are checked and reserved through the MCA process."),
      step("DSC and DPIN Coordination", "Designated partner digital signature and identification requirements are coordinated."),
      step("FiLLiP Filing", "LLP incorporation forms are prepared and filed."),
      step("LLP Agreement Drafting", "Core commercial terms are captured for the LLP agreement."),
      step("Form 3 Filing", "The LLP agreement is filed within the applicable timeline."),
      step("Compliance Handover", "Annual filing and record-maintenance guidance is shared."),
    ],
    estimatedTimeline: "Usually 10-18 working days, subject to name approval and MCA processing",
    supportType: "LLP Incorporation and Agreement Support",
    deliverables: ["Name reservation assistance", "FiLLiP filing support", "LLP agreement preparation support", "Form 3 filing guidance", "Incorporation records", "Annual compliance checklist"],
    faqs: [
      { q: "How many partners are needed for an LLP?", a: "An LLP requires at least two partners, with at least two designated partners." },
      { q: "Is an LLP agreement mandatory?", a: "Yes. The LLP agreement defines partner rights, contribution, profit sharing and duties." },
      { q: "Is audit mandatory for every LLP?", a: "Audit applicability depends on turnover and contribution thresholds under applicable rules." },
      { q: "Can an LLP do business across India?", a: "Yes, subject to registrations and compliance required for the business activity." },
      { q: "Are government fees included?", a: feeNote },
      { q: "Can Roshani Consultancy assist with annual filing?", a: "Yes, annual return and statement of accounts filing support can be provided." },
    ],
    relatedServices: ["digital-signature-certificate", "gst-registration", "income-tax-return-filing"],
  },
  "section-8-company": {
    slug: "section-8-company",
    category: "company-registration",
    title: "Section 8 Company",
    shortTitle: "Section 8",
    tagline: "A credible company structure for non-profit, charity and social-impact objectives.",
    shortDescription:
      "Get assisted Section 8 Company registration with objective review, licence documentation, MCA filing support and compliance guidance.",
    overview: [
      "A Section 8 Company is formed for charitable or non-profit objectives such as education, social welfare, art, science, sports, environment or similar purposes.",
      "Its income and profits must be applied toward its stated objects and cannot be distributed as dividends to members.",
      "Roshani Consultancy assists with objective drafting, director documents, licence application coordination, incorporation filing and future compliance considerations.",
    ],
    metaTitle: "Section 8 Company Registration in India | Roshani Consultancy",
    metaDescription:
      "Get expert assistance for Section 8 Company registration, including non-profit objective review, licence documents, MCA filing support and compliance guidance.",
    keywords: ["section 8 company registration", "ngo company registration", "non profit company india"],
    benefits: [
      { title: "Credible Non-Profit Structure", description: "A company format can strengthen governance and institutional trust." },
      { title: "Defined Social Objectives", description: "Objects are formally captured in constitutional documents." },
      { title: "Limited Liability", description: "Members receive liability protection subject to applicable law." },
      { title: "Structured Governance", description: "Director-led management improves accountability and reporting." },
      { title: "Grant and CSR Readiness", description: "A formal entity can support future funding applications, subject to eligibility." },
    ],
    whoShouldApply: ["NGOs and foundations", "Education and social welfare initiatives", "Charity and community projects", "Art, science and environment programs", "Impact-led founders"],
    eligibility: ["Non-profit objectives must be clearly stated", "Income must be used for stated objects", "Minimum directors and members as applicable", "Registered office address in India", "Licence and incorporation approval are required"],
    documentGroups: [
      { title: "Promoter Documents", items: ["PAN and Aadhaar", "Photographs", "Address proofs", "Director contact details"] },
      { title: "Non-Profit Documents", items: ["Draft objects", "Projected income and expenditure", "Declaration and licence documents"] },
      { title: "Office Proof", items: ["Utility bill", "Rent agreement or ownership proof", "NOC from property owner"] },
    ],
    processSteps: [
      step("Objective Review", "We understand the proposed non-profit purpose and check Section 8 suitability."),
      step("Name and Document Planning", "Name, objects and supporting declarations are prepared."),
      step("DSC and Director Details", "Digital signature and director information are coordinated."),
      step("Licence Application", "Section 8 licence documents are prepared and filed through the applicable MCA process."),
      step("Incorporation Filing", "Incorporation forms and constitutional documents are submitted after approval workflow requirements are met."),
      step("Query Support", "Clarifications from the authority are handled with proper documents."),
      step("Compliance Orientation", "Post-registration record keeping and filing obligations are explained."),
    ],
    estimatedTimeline: "Usually 15-30 working days, subject to licence review and MCA processing",
    supportType: "Licence and Incorporation Assistance",
    deliverables: ["Objective review", "Licence documentation support", "MoA/AoA preparation support", "MCA filing assistance", "Incorporation guidance", "Non-profit compliance checklist"],
    faqs: [
      { q: "Can Section 8 Company distribute profit?", a: "No. Income or surplus must be applied toward the stated non-profit objectives." },
      { q: "Is Section 8 the same as a trust?", a: "No. A Section 8 Company is incorporated under company law, while trusts and societies follow different legal frameworks." },
      { q: "Can it receive CSR funds?", a: "It may be eligible subject to applicable CSR, registration and compliance conditions." },
      { q: "How long does registration take?", a: "Timelines vary because licence review and MCA processing are involved." },
      { q: "Are government fees included?", a: feeNote },
      { q: "Does it need annual compliance?", a: "Yes. Section 8 Companies must maintain statutory records and complete annual filings." },
    ],
    relatedServices: ["digital-signature-certificate", "income-tax-return-filing", "trademark-registration"],
  },
  "nidhi-company": {
    slug: "nidhi-company",
    category: "company-registration",
    title: "Nidhi Company",
    shortTitle: "Nidhi",
    tagline: "A member-based mutual benefit company for savings and lending among members.",
    shortDescription:
      "Get guided Nidhi Company incorporation support with member requirements, MCA filing assistance and regulatory compliance orientation.",
    overview: [
      "A Nidhi Company is a mutual benefit company created to encourage savings and lending among its members.",
      "It can accept deposits and lend only within its member base, and regulatory conditions under Nidhi rules must be followed carefully.",
      "Roshani Consultancy helps with incorporation planning, member and director documentation, MCA filing support and compliance considerations after registration.",
    ],
    metaTitle: "Nidhi Company Registration in India | Roshani Consultancy",
    metaDescription:
      "Get expert assistance for Nidhi Company registration, including member eligibility review, documentation, MCA filing support and compliance guidance.",
    keywords: ["nidhi company registration", "mutual benefit company", "nidhi company compliance"],
    benefits: [
      { title: "Member-Based Model", description: "Designed for savings and lending activity among registered members." },
      { title: "Formal Company Structure", description: "Operates as a company with defined governance and records." },
      { title: "Community Financial Discipline", description: "Supports mutual benefit activities within a closed membership framework." },
      { title: "Limited Liability", description: "Members receive liability protection subject to company law." },
      { title: "Clear Compliance Framework", description: "Nidhi rules provide specific operating and filing requirements." },
    ],
    whoShouldApply: ["Member-based savings groups", "Community mutual benefit initiatives", "Promoters planning member-only lending", "Local financial self-help structures", "Groups ready for ongoing compliance"],
    eligibility: ["Minimum members and directors as required for incorporation", "Member-only deposit and lending activity", "Registered office address in India", "Nidhi rules and post-incorporation conditions apply", "Regulatory requirements must be monitored continuously"],
    documentGroups: [
      { title: "Member and Director Documents", items: ["PAN and Aadhaar", "Photographs", "Address proofs", "Mobile number and email"] },
      { title: "Office Proof", items: ["Utility bill", "Rent agreement or ownership proof", "NOC from owner"] },
      { title: "Business Details", items: ["Proposed names", "Member details", "Capital and objective details", "Compliance declarations"] },
    ],
    processSteps: [
      step("Regulatory Suitability Review", "We explain Nidhi restrictions and confirm whether the structure fits the planned activity."),
      step("Member and Director Planning", "Promoter, member and director information is collected and checked."),
      step("Name and DSC Coordination", "Name availability and digital signature requirements are coordinated."),
      step("Incorporation Filing", "Company incorporation documents are prepared and filed on MCA."),
      step("Certificate Guidance", "Incorporation output and basic statutory records are explained."),
      step("Post-Incorporation Conditions", "Nidhi-specific milestones, forms and member requirements are reviewed."),
      step("Ongoing Compliance Support", "Periodic filing and regulatory coordination can be planned separately."),
    ],
    estimatedTimeline: "Usually 15-25 working days for incorporation, subject to MCA processing; Nidhi conditions continue after incorporation",
    supportType: "Incorporation and Compliance Guidance",
    deliverables: ["Suitability review", "Member and director checklist", "MCA incorporation support", "Certificate guidance", "Nidhi rules orientation", "Post-incorporation compliance checklist"],
    faqs: [
      { q: "Can a Nidhi Company accept deposits from the public?", a: "No. Deposits and lending are restricted to members, subject to Nidhi rules." },
      { q: "Are regulatory conditions applicable?", a: "Yes. Nidhi Companies must follow specific membership, deposit, lending and filing conditions." },
      { q: "Is it an NBFC?", a: "A Nidhi Company is not the same as a regular NBFC, but it is subject to specific mutual benefit company rules." },
      { q: "How many members are required?", a: "Minimum incorporation and post-incorporation member requirements apply as per current rules." },
      { q: "Are government fees included?", a: feeNote },
      { q: "Can Roshani Consultancy help after registration?", a: "Yes, we can assist with post-registration filings and compliance planning." },
    ],
    relatedServices: ["digital-signature-certificate", "income-tax-return-filing", "gst-registration"],
  },
  "farmer-producer-company": {
    slug: "farmer-producer-company",
    category: "company-registration",
    title: "Farmer Producer Company",
    shortTitle: "Producer Company",
    tagline: "A collective company structure for primary producers to improve market access and value addition.",
    shortDescription:
      "Get Farmer Producer Company incorporation assistance with producer-member eligibility review, documentation, MCA filing and compliance guidance.",
    overview: [
      "A Farmer Producer Company enables primary producers to organise collectively for procurement, production, processing, marketing and value addition.",
      "It can improve bargaining power, shared infrastructure planning and market access while giving members a formal company structure.",
      "Roshani Consultancy helps verify member eligibility, prepare incorporation documents, coordinate DSC requirements and guide producer-company compliance after registration.",
    ],
    metaTitle: "Farmer Producer Company Registration in India | Roshani Consultancy",
    metaDescription:
      "Get expert Farmer Producer Company registration assistance, including member eligibility review, document preparation, MCA filing support and compliance guidance.",
    keywords: ["farmer producer company registration", "producer company india", "fpc registration"],
    benefits: [
      { title: "Collective Market Access", description: "Members can aggregate produce and negotiate more effectively." },
      { title: "Input Procurement Support", description: "Collective procurement may reduce friction in sourcing inputs and services." },
      { title: "Value Addition Opportunity", description: "The entity can support processing, packaging and allied producer activities." },
      { title: "Limited Liability", description: "Members receive liability protection under the company structure." },
      { title: "Formal Governance", description: "Defined records and management help organise producer operations." },
    ],
    whoShouldApply: ["Groups of farmers", "Primary producers", "Agri collectives", "Rural producer groups", "Producer-led value addition initiatives"],
    eligibility: ["Producer members must meet applicable eligibility conditions", "Minimum producer-member requirements apply", "Registered office address in India", "Producer activity details should be clear", "MCA approval and compliance rules apply"],
    documentGroups: [
      { title: "Producer Member Documents", items: ["PAN and Aadhaar", "Photographs", "Address proofs", "Producer or cultivation details"] },
      { title: "Office Proof", items: ["Utility bill", "Rent agreement or ownership proof", "NOC from owner"] },
      { title: "Company Details", items: ["Proposed names", "Producer activity description", "Member list", "Capital and director details"] },
    ],
    processSteps: [
      step("Producer Group Review", "We review member eligibility, producer activity and business purpose."),
      step("Name and Structure Planning", "Company name, objectives and shareholding are planned."),
      step("DSC and Director Details", "Digital signature and director documentation are coordinated."),
      step("Document Preparation", "Constitutional and incorporation documents are prepared."),
      step("MCA Filing", "Application is filed with MCA after review and confirmation."),
      step("Clarification Support", "Authority questions are addressed with appropriate supporting documents."),
      step("Post-Registration Guidance", "Member records and annual compliance expectations are explained."),
    ],
    estimatedTimeline: "Usually 15-25 working days, subject to member documentation and MCA processing",
    supportType: "Producer Company Incorporation Assistance",
    deliverables: ["Producer eligibility review", "Member document checklist", "MCA filing support", "Incorporation records guidance", "Member and compliance checklist", "Next-step registration guidance"],
    faqs: [
      { q: "Who can become a member of a Farmer Producer Company?", a: "Primary producers such as farmers and related producer groups can become members, subject to applicable law." },
      { q: "Can it help with marketing produce?", a: "Yes, marketing and value addition are common objectives, but commercial outcomes depend on operations and market conditions." },
      { q: "Is land proof always required?", a: note },
      { q: "How long does incorporation take?", a: "Timelines depend on member documentation, name approval and MCA processing." },
      { q: "Are government fees included?", a: feeNote },
      { q: "Does it require annual compliance?", a: "Yes, it must maintain records and complete company-law filings." },
    ],
    relatedServices: ["gst-registration", "msme-udyam-registration", "trademark-registration"],
  },
};

const remainingDetails: Record<string, Omit<ServiceDetailContent, "slug" | "category">> = {
  "gem-registration": {
    title: "GeM Registration",
    shortTitle: "GeM",
    tagline: "Register and prepare your business to sell products or services on Government e-Marketplace.",
    shortDescription: "Get GeM seller registration assistance with profile setup, tax and business document review, catalogue guidance and bid-readiness support.",
    overview: ["GeM registration helps eligible sellers list products or services for procurement by government buyers.", "A complete seller profile, accurate tax details and correct catalogue information are important for portal credibility.", "Roshani Consultancy assists with account setup, document checks, product or service listing guidance, vendor assessment coordination where applicable and bid participation orientation."],
    metaTitle: "GeM Registration in India | Roshani Consultancy",
    metaDescription: "Get expert assistance for GeM Registration, including seller profile setup, document preparation, listing support and bid participation guidance.",
    keywords: ["gem registration", "government e marketplace seller registration", "gem seller profile"],
    benefits: [{ title: "Government Buyer Access", description: "A GeM profile enables participation in government procurement opportunities." }, { title: "Structured Seller Profile", description: "Correct business, GST and bank details improve portal readiness." }, { title: "Catalogue Support", description: "Products or services can be organised with clearer listing information." }, { title: "Bid Readiness", description: "Understand basic tender and bid participation requirements before applying." }, { title: "Documentation Clarity", description: "Reduce avoidable portal issues caused by incomplete or mismatched documents." }],
    whoShouldApply: ["Manufacturers", "Traders", "Service providers", "MSMEs selling to government buyers", "Businesses preparing for tenders"],
    eligibility: ["Valid business identity", "PAN and bank details", "GST details where applicable", "Product or service category information", "Vendor assessment may apply for selected categories"],
    documentGroups: [{ title: "Applicant Details", items: ["PAN and Aadhaar", "Mobile number and email", "Authorised signatory details"] }, { title: "Business Documents", items: ["GST certificate where applicable", "Udyam certificate if available", "Business registration proof", "Address proof"] }, { title: "Seller Information", items: ["Bank details", "Product or service details", "Experience or OEM documents where applicable"] }],
    processSteps: [step("Seller Requirement Review", "We understand your product, service and buyer category."), step("Document Collection", "Business, tax and bank documents are reviewed."), step("GeM Profile Setup", "Seller profile information is prepared on the portal."), step("Category and Listing Guidance", "Product or service listing details are organised."), step("Verification and Assessment Support", "Applicable portal verification or vendor assessment requirements are explained."), step("Bid Participation Orientation", "Basic bid search and participation steps are explained."), step("Post-Registration Support", "Profile updates and related tender services can be planned.")],
    estimatedTimeline: "Depends on portal verification, category requirements and document readiness",
    supportType: "GeM Seller Onboarding Assistance",
    deliverables: ["GeM profile setup support", "Document checklist", "Catalogue listing guidance", "Vendor assessment coordination where applicable", "Bid-readiness orientation", "Profile update guidance"],
    faqs: [{ q: "Is GST mandatory for GeM registration?", a: "GST is generally required unless the goods or services are exempt or the seller category permits otherwise." }, { q: "Can services be listed on GeM?", a: "Yes, eligible services can be listed based on GeM categories and portal rules." }, { q: "What is vendor assessment?", a: "Some categories may require additional assessment or validation by an authorised agency or process." }, { q: "Can registration be completed online?", a: "Yes, most GeM onboarding steps are portal-based." }, { q: "Are government fees included?", a: feeNote }, { q: "Can Roshani Consultancy help with bids later?", a: "Yes, bid support can be handled as a separate or ongoing service." }],
    relatedServices: ["digital-signature-certificate", "msme-udyam-registration", "gst-registration"],
  },
  "digital-signature-certificate": {
    title: "Digital Signature Certificate",
    shortTitle: "DSC",
    tagline: "Secure digital signing support for tenders, MCA, GST, income tax and e-procurement portals.",
    shortDescription: "Get Class 3 DSC assistance for individuals and organisations with identity verification, application support and delivery coordination.",
    overview: ["A Digital Signature Certificate is used to digitally sign documents and authenticate identity on approved online portals.", "Class 3 DSC is commonly required for e-tendering, MCA filings, income tax filings and other secure transactions.", "Roshani Consultancy helps with DSC type selection, identity verification coordination, token or cloud-based delivery guidance depending on provider and portal usage support."],
    metaTitle: "Digital Signature Certificate in India | Roshani Consultancy",
    metaDescription: "Get expert Digital Signature Certificate assistance for tenders, MCA, GST and income tax use cases with KYC and issuance support.",
    keywords: ["digital signature certificate", "class 3 dsc", "dsc for tender"],
    benefits: [{ title: "Legally Recognised Signing", description: "Use DSC for secure authentication on supported portals." }, { title: "Tender and MCA Readiness", description: "Required for many e-tender and MCA filing workflows." }, { title: "Individual or Organisation Use", description: "Choose the right DSC type based on applicant and purpose." }, { title: "Verification Support", description: "KYC and identity verification steps are easier with guided assistance." }, { title: "Portal Usage Guidance", description: "Understand mapping and signing basics after issuance." }],
    whoShouldApply: ["Directors and partners", "Tender participants", "Contractors and vendors", "Tax professionals", "Businesses using MCA or e-procurement portals"],
    eligibility: ["Valid identity proof", "Valid address proof", "Mobile number and email for verification", "Organisation documents for organisation DSC", "Applicant must complete required KYC"],
    documentGroups: [{ title: "Identity Documents", items: ["PAN card", "Aadhaar card or address proof", "Photograph"] }, { title: "Contact and KYC", items: ["Mobile number", "Email address", "Video or OTP verification details"] }, { title: "Organisation Documents", items: ["Authorisation proof, if applicable", "Business registration proof, if applicable", "GST or entity details where required"] }],
    processSteps: [step("Use-Case Review", "We identify the correct DSC type based on tender, MCA, tax or other portal use."), step("Document Collection", "Identity and organisation documents are reviewed."), step("Application Preparation", "DSC application details are prepared for the certifying provider."), step("KYC Verification", "Video, OTP or other verification steps are completed by the applicant."), step("Issuance Coordination", "Token or cloud-based delivery is coordinated depending on provider."), step("Portal Mapping Guidance", "Basic usage and mapping steps are explained for relevant portals.")],
    estimatedTimeline: "Often 1-3 working days after successful KYC, depending on provider processing",
    supportType: "DSC Application and Verification Assistance",
    deliverables: ["DSC type guidance", "Application support", "KYC coordination", "Issuance status updates", "Token or cloud delivery guidance", "Portal usage checklist"],
    faqs: [{ q: "Which DSC is required for tenders?", a: "Class 3 DSC is commonly required for e-tendering and e-procurement portals." }, { q: "Can one DSC be used for multiple portals?", a: "Usually yes, if the DSC type and applicant details match the portal requirements." }, { q: "Is video KYC required?", a: "KYC requirements depend on the certifying provider and DSC type." }, { q: "How long is a DSC valid?", a: "Validity depends on the selected certificate period and provider options." }, { q: "Are government fees included?", a: feeNote }, { q: "Can Roshani Consultancy help map DSC to tender portals?", a: "Yes, portal mapping guidance can be provided where applicable." }],
    relatedServices: ["gem-registration", "private-limited-company", "gst-return-filing"],
  },
};



const extraDetails: Record<string, Omit<ServiceDetailContent, "slug" | "category">> = {
  "msme-udyam-registration": makeDetail("MSME / Udyam Registration", "Udyam", "Get formal MSME recognition for your micro, small or medium enterprise.", "Udyam Registration is the official MSME recognition system for eligible micro, small and medium enterprises in India.", "Registration may support scheme readiness and vendor onboarding, but loans, subsidies or benefits are never guaranteed.", ["Official MSME Recognition", "Business Credibility", "Scheme Readiness", "Tender Support", "Simple Digital Certificate"], ["Micro enterprises", "Small enterprises", "Medium enterprises", "Manufacturers and service providers", "Businesses preparing for tenders"], ["Enterprise must fit MSME classification criteria", "PAN details are required", "GST details may be linked where applicable", "Business activity and bank details should be accurate"], [["Applicant Details", ["Aadhaar", "PAN", "Mobile number", "Email address"]], ["Business Details", ["Business name", "Business activity", "Address", "Bank details"]], ["Linked Details", ["GSTIN where applicable", "Investment and turnover details", "Previous registration details, if any"]]], ["Classification Review", "Detail Collection", "Data Verification", "Udyam Filing", "Certificate Guidance", "Next-Step Advisory"], "Often completed quickly when details validate correctly; portal and linked-data checks may vary", "Udyam Registration Assistance", ["gem-registration", "gst-registration", "trademark-registration"]),
  "iso-certification": makeDetail("ISO Certification", "ISO", "Prepare your business for ISO certification with structured documentation and audit coordination.", "ISO certification shows that a business follows a recognised management system standard for quality, environment, safety or another defined scope.", "Roshani Consultancy supports gap assessment, documentation and audit coordination. Certification is issued by an eligible certification body; Roshani Consultancy is not an accreditation body.", ["Process Improvement", "Tender Credibility", "Customer Confidence", "Risk Control", "Recognised Standards"], ["Manufacturers", "Service providers", "Tender participants", "Export-oriented businesses", "Organisations improving quality, safety or environmental systems"], ["Defined business scope", "Basic process documentation", "Implementation readiness", "Internal records and responsibilities", "Audit by certification body required"], [["Business Documents", ["Registration proof", "Address proof", "Scope of certification", "Organisation chart"]], ["System Documents", ["Process details", "Quality or policy documents", "Records and formats"]], ["Audit Details", ["Site details", "Employee/process information", "Previous certificates, if any"]]], ["Standard Selection", "Gap Assessment", "Documentation", "Implementation Support", "Audit Coordination", "Certificate Guidance"], "Depends on standard, organisation readiness, audit scheduling and certification body review", "ISO Documentation and Audit Coordination", ["gem-registration", "trademark-registration", "msme-udyam-registration"]),
  "trademark-registration": makeDetail("Trademark Registration", "Trademark", "Protect your brand name, logo or slogan with guided trademark filing support.", "A trademark helps protect brand identifiers such as names, logos, taglines and labels for specific goods or services.", "Correct class selection and a pre-filing search are important because trademark approval depends on distinctiveness, availability and Trademark Registry examination.", ["Brand Protection", "Legal Identity for Brand Assets", "Deters Misuse", "Business Asset Value", "Licensing and Expansion Support"], ["Startups", "Manufacturers", "Service brands", "E-commerce sellers", "Businesses launching a name, logo or slogan"], ["Applicant identity and business details", "Clear brand name or logo", "Correct trademark class", "Goods or services description", "Approval depends on Trademark Registry examination"], [["Applicant Documents", ["PAN and Aadhaar", "Business registration proof", "Address proof", "Authorisation, if applicable"]], ["Brand Materials", ["Brand name", "Logo file, if applicable", "Tagline, if applicable", "Goods or services description"]], ["Supporting Documents", ["MSME/Udyam certificate, if claiming applicable fee benefit", "User affidavit or proof of use, if applicable"]]], ["Trademark Search", "Class Selection", "Document Preparation", "Application Filing", "Examination Monitoring", "Objection or Hearing Support", "Registration and Renewal Guidance"], "Filing can be completed quickly when documents are ready; registry examination and approval may take several months or longer", "Trademark Filing and Registry Coordination", ["private-limited-company", "msme-udyam-registration", "iso-certification"]),
  "gst-registration": makeDetail("GST Registration", "GST", "Get GSTIN registration support for businesses, professionals and e-commerce sellers.", "GST Registration provides a GSTIN to eligible businesses and professionals for collecting tax, claiming input tax credit and making compliant supplies.", "Applicability depends on turnover, business activity, interstate supply, e-commerce activity and other GST rules.", ["GSTIN for Legal Supply", "Input Tax Credit Access", "B2B and Interstate Readiness", "E-Commerce Enablement", "Professional Compliance Base"], ["Businesses crossing GST threshold", "Interstate suppliers", "E-commerce sellers", "Service professionals", "Businesses opting for voluntary registration"], ["PAN of applicant or entity", "Valid business address", "Bank details", "Authorised signatory details", "Aadhaar/OTP or department verification may apply"], [["Applicant Documents", ["PAN and Aadhaar", "Photograph", "Mobile number and email"]], ["Business Proof", ["Business registration proof", "Address proof", "Rent agreement or NOC", "Utility bill"]], ["Financial and Activity Details", ["Bank details", "Business activity", "Authorisation letter or board resolution where applicable"]]], ["Applicability Review", "Document Collection", "GST Portal Application", "Verification Support", "Clarification Response", "GSTIN Guidance"], "Usually 5-10 working days, subject to department review and verification", "GST Registration Assistance", ["gst-return-filing", "msme-udyam-registration", "income-tax-return-filing"]),
  "gst-return-filing": makeDetail("GST Return Filing", "GST Returns", "Monthly, quarterly and annual GST filing support with data review and reconciliation.", "GST return filing keeps a GST-registered business compliant by reporting outward supplies, tax liability, input tax credit and related data.", "Accurate sales and purchase reconciliation helps reduce mismatch issues, late fees and avoidable compliance risk.", ["Timely Compliance", "ITC Reconciliation", "Accurate Tax Reporting", "Pending Return Support", "Better Record Maintenance"], ["GST-registered businesses", "Traders and manufacturers", "Service providers", "E-commerce sellers", "Businesses with pending GST returns"], ["Active GSTIN", "Sales invoices", "Purchase records", "Expense and ITC details", "Payment and bank information where needed"], [["Sales Data", ["Sales invoices", "Credit/debit notes", "E-way bill details where applicable"]], ["Purchase and ITC Data", ["Purchase invoices", "Expense invoices", "GSTR-2A/2B details", "Input tax credit records"]], ["Filing Records", ["GST login access or authorisation", "Previous returns", "Tax payment challans", "Bank statements if required"]]], ["Data Collection", "Review and Reconciliation", "Return Preparation", "Tax Liability Review", "GST Portal Filing", "Acknowledgement Handover"], "Depends on data readiness, filing period and pending-return complexity", "GST Filing and Reconciliation Support", ["gst-registration", "income-tax-return-filing", "msme-udyam-registration"]),
  "income-tax-return-filing": makeDetail("Income Tax Return Filing", "ITR Filing", "Accurate income tax return preparation for individuals, professionals, firms and companies.", "Income Tax Return filing reports income, deductions, taxes paid and refund or tax-payable details to the Income Tax Department.", "The correct ITR form depends on income sources, business structure, books of account, capital gains and other facts. Notice response support can be provided separately where applicable.", ["Correct Form Selection", "Income and Deduction Review", "Tax Computation Support", "Filing Acknowledgement", "Compliance Continuity"], ["Salaried individuals", "Professionals and freelancers", "Firms and LLPs", "Companies", "Taxpayers with capital gains or multiple income sources"], ["PAN and Aadhaar details", "Income records", "Bank and tax payment details", "Deduction and investment proofs", "Business financials where applicable"], [["Personal and Income Records", ["PAN and Aadhaar", "Form 16", "Salary slips", "Interest certificates"]], ["Business and Professional Records", ["Financial statements", "Invoices", "Expense records", "GST data where applicable"]], ["Tax and Deduction Proofs", ["Form 26AS/AIS", "Bank statements", "Investment proofs", "TDS certificates", "Advance tax challans"]]], ["Taxpayer Profile Review", "Document Collection", "Computation", "Return Preparation", "Review and Confirmation", "E-Filing", "Acknowledgement Guidance"], "Depends on document readiness, income complexity and portal availability", "Tax Computation and ITR Filing Support", ["gst-return-filing", "gst-registration", "private-limited-company"]),
};

function makeDetail(title: string, shortTitle: string, tagline: string, overviewA: string, overviewB: string, benefits: string[], whoShouldApply: string[], eligibility: string[], documentTuples: Array<[string, string[]]>, stepTitles: string[], estimatedTimeline: string, supportType: string, relatedServices: string[]): Omit<ServiceDetailContent, "slug" | "category"> {
  return {
    title,
    shortTitle,
    tagline,
    shortDescription: `${tagline} Roshani Consultancy assists with eligibility review, document preparation, portal or authority coordination and practical compliance guidance.`,
    overview: [overviewA, overviewB, "Roshani Consultancy helps with requirement review, document preparation, application coordination and next-step guidance. Approval, certificate issuance and timelines depend on the relevant authority, portal or certification body."],
    metaTitle: `${title} in India | Roshani Consultancy`,
    metaDescription: `Get expert assistance for ${title}, including eligibility review, document preparation, application support and compliance guidance from Roshani Consultancy.`,
    keywords: [title, `${title} India`, "Roshani Consultancy"],
    benefits: benefits.map((benefit) => ({ title: benefit, description: `${benefit} helps make ${shortTitle} clearer, more reliable and easier to manage with professional guidance.` })),
    whoShouldApply,
    eligibility,
    documentGroups: documentTuples.map(([groupTitle, items]) => ({ title: groupTitle, items })),
    processSteps: stepTitles.map((processTitle) => step(processTitle, processDescription(processTitle))),
    estimatedTimeline,
    supportType,
    deliverables: ["Eligibility and requirement review", "Document checklist and document review", "Application or filing preparation assistance", "Portal or authority coordination", "Acknowledgement or certificate guidance where applicable", "Important next-step compliance checklist"],
    faqs: [
      { q: `Who should apply for ${title}?`, a: `This service is suitable for ${whoShouldApply.slice(0, 3).join(", ").toLowerCase()} and other eligible applicants.` },
      { q: `Which documents are required for ${title}?`, a: note },
      { q: `How long does ${title} take?`, a: `${estimatedTimeline}. Government or authority timelines may vary.` },
      { q: "Can the application be completed online?", a: "Most steps are portal-based, but verification, audit or authority review requirements may vary by service." },
      { q: "Are government fees included?", a: feeNote },
      { q: "Can Roshani Consultancy assist with future compliance?", a: "Yes, related filing, renewal and compliance support can be planned after the service is complete." },
    ],
    relatedServices,
  };
}

function processDescription(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("review") || lower.includes("assessment")) return "Requirements are reviewed so the application or filing starts with the right assumptions.";
  if (lower.includes("document") || lower.includes("data")) return "Documents and data are checked for consistency, completeness and portal readiness.";
  if (lower.includes("fil") || lower.includes("application") || lower.includes("portal")) return "The application or return is prepared and submitted through the relevant portal after confirmation.";
  if (lower.includes("verification") || lower.includes("clarification") || lower.includes("response")) return "Verification steps or authority queries are handled with applicant coordination.";
  if (lower.includes("certificate") || lower.includes("acknowledgement") || lower.includes("guidance")) return "Completion records, acknowledgements or next-step guidance are shared for your records.";
  return "This step is handled with clear status updates and practical guidance.";
}

export const getServiceDetail = (service: Service): ServiceDetailContent => {
  const detailed = SERVICE_DETAILS[service.slug] || remainingDetails[service.slug] || extraDetails[service.slug];
  if (detailed) {
    return {
      ...detailed,
      slug: service.slug,
      category: service.category,
    };
  }

  return {
    slug: service.slug,
    category: service.category,
    title: service.title,
    shortTitle: service.title,
    tagline: service.short,
    shortDescription: service.short,
    overview: [
      `${service.title} helps Indian businesses complete important registration, filing or compliance requirements with structured professional support.`,
      service.short,
      "Roshani Consultancy assists with requirement review, document preparation, portal coordination and practical next-step guidance. Processing timelines and approvals remain subject to the relevant authority or portal.",
    ],
    metaTitle: `${service.title} in India | Roshani Consultancy`,
    metaDescription: `Get expert assistance for ${service.title}, including eligibility review, document preparation, application support and compliance guidance from Roshani Consultancy.`,
    keywords: [service.title, CATEGORY_LABELS[service.category], "Roshani Consultancy", "India"],
    benefits: service.benefits.map((title) => ({
      title,
      description: "Clear guidance and documentation support help make this service easier to complete correctly.",
    })),
    whoShouldApply: [service.suitableFor],
    eligibility: service.eligibility || ["Valid applicant details", "Relevant business documents", "Authority-specific conditions may apply"],
    documentGroups: [{ title: "Documents Required", items: service.documents.length ? service.documents : [note] }],
    processSteps: service.process.map((title) => step(title, "This step is handled with clear guidance, document checks and status updates.")),
    estimatedTimeline: "Depends on document readiness and authority processing",
    supportType: "Professional Assistance",
    deliverables: ["Document checklist", "Application preparation support", "Portal coordination", "Status updates", "Completion guidance"],
    faqs: service.faqs.length
      ? service.faqs
      : [{ q: `Who should apply for ${service.title}?`, a: `This service is suitable for ${service.suitableFor.toLowerCase()}.` }],
    relatedServices: [],
  };
};
