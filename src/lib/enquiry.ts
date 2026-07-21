export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  businessType: string;
  message?: string;
  consent: true;
  website?: string;
}

export async function submitEnquiry(_payload: EnquiryPayload) {
  // Integration point: connect this to a backend route or third-party form API.
  // Keep API keys and notification credentials server-side only.
  throw new Error(
    "Online enquiry submission is not connected yet. Please continue through WhatsApp so the team receives your service details immediately.",
  );
}
