export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  organizationName: string;
  service: string;
  message: string;
  website?: string;
  city?: string;
  field?: string;
  source?: string;
}

export async function submitEnquiry(_payload: EnquiryPayload) {
  // Integration point: connect this to a backend route or third-party form API.
  // Keep API keys and notification credentials server-side only.
  await Promise.resolve();
}
