export type ClientRecord = {
  id: string;
  companyName: string;
  slug: string;
  natureOfBusiness: string;
  city: string;
  services: string[];
  logo?: string;
  logoAltText?: string;
  shortDescription?: string;
  projectRequirement?: string;
  solutionProvided?: string;
  resultSummary?: string;
  testimonial?: string;
  testimonialPersonName?: string;
  testimonialPersonDesignation?: string;
  websiteUrl?: string;
  displayOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
};

const importedAt = "2026-07-25T00:00:00.000Z";
const seedRows: Array<[string, string, string, string[]]> = [
  ["Rekha E Store", "E-commerce", "Akola", ["GST Registration"]],
  ["Ambhore Guruji Sahityalay", "Book Store", "Washim", ["GST Registration"]],
  ["AI Lab", "Technology & Software", "Akola", ["GST Registration"]],
  ["Apaji Industries Pvt. Ltd.", "Contractor", "Vyala, Akola", ["Tender Services"]],
  [
    "M/s Shree Samarth Labour Suppliers and Contractor",
    "Contractor",
    "Akola",
    ["Maharashtra Labour Welfare Board Registration", "Tender Services"],
  ],
  ["Piyush Academy", "Education", "Akola", ["ISO Certification"]],
  ["Deva Mart", "Retail", "Akola", ["MSME/Udyam Registration"]],
  ["Dharamaji Gharde Bahuddeshiy Seva Sanstha", "Manpower", "Akola", ["Licence Services"]],
  [
    "Dr Babasaheb Ambedkar Centre for Excellence and Research",
    "Education",
    "Akola",
    ["Licence Services"],
  ],
  ["Seva Bahuuddeshiya Sanstha Washim", "Trust", "Washim", ["Licence Services"]],
  ["Seva Bahuuddeshiya Sanstha Washim", "Contractor", "Akola", []],
  ["Feel Secure", "CCTV & Security", "Akola", ["GeM Registration"]],
  ["PWD Contractor", "Contractor", "Chandrapur", ["Digital Signature Certificate"]],
  ["Gargi Enterprises", "Contractor", "Akola", ["Partnership Firm Registration"]],
  ["Proxy Flooring and Coating Business", "Contractor", "Akola", ["Licence Services"]],
  ["Golden Rize Private Limited", "Company", "Washim", ["Company Registration"]],
  ["NGO", "NGO", "Akola", ["Licence Services", "Tender Services"]],
  ["Kamal Trading Company", "Importer", "Washim", ["Tender Services"]],
  ["Amrita Prashant Kasbe", "Professional Services", "Thane, Mumbai", ["Trademark Registration"]],
  ["Shourya Kirana Shop", "Kirana Shop", "Akola", ["Food Licence"]],
  ["Krushi Padhidahark Bahuddeshiy Sanstha", "NGO", "Akola", ["Licence Services"]],
  [
    "Dorvelo",
    "E-commerce",
    "Mumbai",
    ["GST Registration", "MSME/Udyam Registration", "Shop Act Registration"],
  ],
  ["Maitriya Seva", "NGO", "Akola", []],
  ["Neeltech Forecasting Private Limited", "Private Limited Company", "Akola", []],
  ["Neha Xerox", "Xerox Shop", "Malegaon", ["Income Tax Return Filing"]],
  ["Devansh Agro Agency", "Agro Agency", "Shirpur, Malegaon", ["Shop Act Registration"]],
  ["Sudantya Pvt. Ltd.", "Private Limited Company", "Nagpur", ["Company Registration"]],
  [
    "PH Tech Industrial Solutions",
    "Industrial Shop",
    "Nagpur",
    ["GST Registration", "MSME/Udyam Registration", "Shop Act Registration"],
  ],
  ["Shree Vitthal Multiservice", "Manpower Agency", "Akola", ["Licence Services"]],
  ["Tathagat Enterprises", "Medical", "Aurangabad", ["Licence Services", "GeM Registration"]],
  [
    "Riya Enterprises",
    "Battery Manufacturing",
    "Washim",
    ["GST Registration", "MSME/Udyam Registration", "Shop Act Registration"],
  ],
  [
    "Contractor",
    "Contractor",
    "Akola",
    [
      "GST Registration",
      "MSME/Udyam Registration",
      "Shop Act Registration",
      "Maharashtra Labour Welfare Board Registration",
      "Tender Services",
    ],
  ],
  ["Sevarth Global Health Care Service", "Laboratory", "Washim", ["MSME/Udyam Registration"]],
  [
    "Yogiraj Enterprises",
    "Manpower Agency",
    "Akola",
    [
      "Provident Fund Registration",
      "ESIC Registration",
      "Maharashtra Labour Welfare Board Registration",
      "ISO Certification",
    ],
  ],
  ["Orange City Human Recruiter", "HR Recruitment Agency", "Nagpur", ["Shop Act Registration"]],
  ["Sid Construction", "Contractor", "Akola", ["Contractor Licence"]],
];

export const slugifyClient = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "client";
export const CLIENTS: ClientRecord[] = seedRows.map((row, index) => ({
  id: `seed-${index + 1}`,
  companyName: row[0],
  slug: slugifyClient(`${row[0]}-${row[2]}`),
  natureOfBusiness: row[1],
  city: row[2],
  services: row[3],
  displayOrder: index + 1,
  isFeatured: index < 8,
  isPublished: true,
  createdAt: importedAt,
}));
export const PUBLISHED_CLIENTS = CLIENTS.filter((client) => client.isPublished);
export const FEATURED_CLIENTS = PUBLISHED_CLIENTS.filter((client) => client.isFeatured);
export const CLIENT_SERVICES = [
  ...new Set(PUBLISHED_CLIENTS.flatMap((client) => client.services)),
].sort();
export const CLIENT_CITIES = [...new Set(PUBLISHED_CLIENTS.map((client) => client.city))].sort();
export const CLIENT_BUSINESS_CATEGORIES = [
  ...new Set(PUBLISHED_CLIENTS.map((client) => client.natureOfBusiness)),
].sort();
export const getClientInitials = (companyName: string) => {
  const ignored = new Set(["m/s", "private", "pvt", "limited", "ltd", "and", "the"]);
  const words = companyName
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((word) => word && !ignored.has(word.toLowerCase()));
  return (
    words.length > 1 ? `${words[0][0]}${words[1][0]}` : words[0]?.slice(0, 2) || "RC"
  ).toUpperCase();
};
export const hasClientDetails = (client: ClientRecord) =>
  Boolean(
    client.shortDescription ||
    client.projectRequirement ||
    client.solutionProvided ||
    client.resultSummary ||
    client.testimonial ||
    client.websiteUrl,
  );
