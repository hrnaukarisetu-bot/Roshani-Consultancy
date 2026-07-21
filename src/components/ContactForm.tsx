import { useMemo, useState } from "react";
import { z } from "zod";
import { AlertCircle, Loader2, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { submitEnquiry } from "@/lib/enquiry";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().regex(/^(?:\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  service: z.string().trim().min(1, "Please select a service"),
  businessType: z.string().trim().min(1, "Please select a business type"),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the consent checkbox" }) }),
  website: z.string().max(0).optional(),
});

type FormState = Record<string, string>;
type Status = "idle" | "loading" | "error";

const BUSINESS_TYPES = ["Proprietorship", "Partnership", "LLP", "Private Limited Company", "OPC", "NGO / Section 8", "MSME", "Individual / Professional", "Other"];

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const serviceOptions = useMemo(() => SERVICES.map((service) => service.title), []);
  const [state, setState] = useState<FormState>({ service: defaultService || "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [apiMessage, setApiMessage] = useState("");

  const set = (key: string, value: string) => {
    setState((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    if (status === "error") setStatus("idle");
  };

  const whatsappHref = () => {
    const selectedService = state.service || defaultService || "business consultation";
    const message = `Hello ${SITE.name}, I need help with ${selectedService}. Name: ${state.name || ""}, Mobile: ${state.phone || ""}, City: ${state.city || ""}.`;
    return `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(message)}`;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    const parsed = schema.safeParse({
      name: state.name?.trim() || "",
      phone: state.phone?.replace(/[\s-]/g, "").trim() || "",
      email: state.email?.trim() || "",
      city: state.city?.trim() || "",
      service: state.service?.trim() || "",
      businessType: state.businessType?.trim() || "",
      message: state.message?.trim() || "",
      consent: state.consent === "on" ? true : false,
      website: state.website || "",
    });

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        nextErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      await submitEnquiry(parsed.data);
    } catch (error) {
      setApiMessage(error instanceof Error ? error.message : "Online submission is not configured yet.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8" aria-label="Service enquiry form" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={state.website || ""} onChange={(e) => set("website", e.target.value)} className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" name="name" value={state.name || ""} error={errors.name} onChange={set} />
        <Field label="Mobile Number" name="phone" type="tel" value={state.phone || ""} error={errors.phone} onChange={set} />
        <Field label="Email Address" name="email" type="email" value={state.email || ""} error={errors.email} onChange={set} />
        <Field label="City" name="city" value={state.city || ""} error={errors.city} onChange={set} />
        <SelectField label="Service Required" name="service" value={state.service || ""} error={errors.service} onChange={set} options={serviceOptions} />
        <SelectField label="Business Type" name="businessType" value={state.businessType || ""} error={errors.businessType} onChange={set} options={BUSINESS_TYPES} />
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-dark">Message</label>
        <textarea id="message" name="message" rows={4} value={state.message || ""} onChange={(e) => set("message", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20" />
        {errors.message && <ErrorText>{errors.message}</ErrorText>}
      </div>
      <label className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <input type="checkbox" checked={state.consent === "on"} onChange={(e) => set("consent", e.target.checked ? "on" : "")} className="mt-0.5 h-4 w-4 rounded border-input" />
        I agree to be contacted by {SITE.name} regarding my enquiry and understand my details will be used only to respond to this request.
      </label>
      {errors.consent && <ErrorText>{errors.consent}</ErrorText>}
      {status === "error" && (
        <div className="mt-4 rounded-xl border border-orange/30 bg-orange-soft p-4 text-sm text-navy-dark" role="alert">
          <div className="flex gap-2"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange" /><p>{apiMessage}</p></div>
          <a href={whatsappHref()} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4" /> Continue on WhatsApp</a>
        </div>
      )}
      <button type="submit" disabled={status === "loading"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "loading" ? "Checking..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
function Field({ label, name, value, error, onChange, type = "text" }: { label: string; name: string; value: string; error?: string; onChange: (name: string, value: string) => void; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-dark">{label} <span className="text-orange">*</span></label>
      <input id={name} name={name} type={type} value={value} onChange={(e) => onChange(name, e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20" />
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

function SelectField({ label, name, value, error, onChange, options }: { label: string; name: string; value: string; error?: string; onChange: (name: string, value: string) => void; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-dark">{label} <span className="text-orange">*</span></label>
      <select id={name} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20">
        <option value="">Select</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children, id }: { children: React.ReactNode; id?: string }) {
  return <p id={id} className="mt-1 text-xs text-destructive">{children}</p>;
}
