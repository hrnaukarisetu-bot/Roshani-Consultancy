export const SITE = {
  name: "Roshani IT Consultancy",
  short: "Roshani IT",
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
    "Hello Roshani IT Consultancy, I would like to know more about your business registration and compliance services.",
} as const;

export const whatsappLink = () =>
  `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
    SITE.whatsappMessage,
  )}`;

export const telLink = () => `tel:${SITE.phoneRaw}`;
export const mailLink = () => `mailto:${SITE.email}`;
