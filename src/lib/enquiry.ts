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

const WEB3FORMS_ACCESS_KEY = "2b653e2b-404c-47ee-94ab-64712b692f57";

export async function submitEnquiry(payload: EnquiryPayload & Record<string, string>) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New inquiry: ${payload.service || payload.source || "Website"}`,
      from_name: "India Business Care Website",
      ...payload,
    }),
  });

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  if (!response.ok || !result?.success) {
    throw new Error("Unable to submit the inquiry.");
  }
}
