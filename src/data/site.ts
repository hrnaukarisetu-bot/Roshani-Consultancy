export const SITE = {
  name: "India Business Care",
  url: "https://www.indiabusinesscare.com",
  short: "India Business Care",
  tagline: "Helping Business & Startup MSME Build the Bharat",
  headline: "Start Your Business Legally & Professionally",
  phone: "+91 8975008429",
  phoneRaw: "+918975008429",
  email: "support@indiabusinesscare.com",
  address:
    "1st Floor, Landmark Plaza, Old Income Tax Square, Gorkshan Road, Akola, Maharashtra 444001, India",
  city: "Akola",
  state: "Maharashtra",
  country: "India",
  postal: "444001",
  years: 13,
  hours: "Mon - Sat, 10:00 AM - 7:00 PM",
  whatsappMessage:
    "Hello India Business Care, I would like to know more about your business registration and compliance services.",
  googleBusinessProfile: "https://maps.app.goo.gl/wLmYPqWqmWbVZ8ac7",
} as const;

export const whatsappLink = () =>
  `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
    SITE.whatsappMessage,
  )}`;

export const serviceWhatsappLink = (serviceName: string) => {
  const message = `Hello India Business Care, I am interested in ${serviceName}. Please share more details.`;
  return `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(message)}`;
};

export const telLink = () => `tel:${SITE.phoneRaw}`;
export const mailLink = () => `mailto:${SITE.email}`;
export const absoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
};
