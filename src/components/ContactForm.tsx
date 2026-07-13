import { useState } from "react";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { SITE, whatsappLink } from "@/data/site";

const SERVICE_OPTIONS = [
  "Company Registration",
  "LLP Registration",
  "OPC Registration",
  "Section 8 Company",
  "Farmer Producer Company",
  "Tender Consulting",
  "GeM Registration",
  "GST Registration",
  "Income Tax Return",
  "Digital Signature Certificate",
  "MSME Registration",
  "Shop Act",
  "Food License",
  "ISO Certification",
  "IEC Registration",
  "Trademark Registration",
  "Other",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s-]{7,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  business: z.string().trim().max(120).optional(),
  city: z.string().trim().max(80).optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to continue" }) }),
  website: z.string().max(0).optional(), // honeypot
});

type FormState = Record<string, string>;

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [state, setState] = useState<FormState>({ service: defaultService || "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const set = (k: string, v: string) => setState((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      ...state,
      consent: state.consent === "on" ? true : (state.consent as any),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    // Placeholder: integrate EmailJS / Formspree / Web3Forms via env vars.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-soft text-orange">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-navy-dark">Thanks! We'll be in touch.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team typically responds within one business day. For faster help, ping us on WhatsApp.
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white"
        >
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  const field = (label: string, name: string, type = "text", req = true) => (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-dark">
        {label} {req && <span className="text-orange">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={state[name] || ""}
        onChange={(e) => set(name, e.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
      />
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
      aria-label="Contact enquiry form"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={state.website || ""}
        onChange={(e) => set("website", e.target.value)}
        className="hidden"
        aria-hidden
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {field("Full Name", "name")}
        {field("Phone Number", "phone", "tel")}
        {field("Email Address", "email", "email")}
        {field("Business Name", "business", "text", false)}
        {field("City", "city", "text", false)}
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-navy-dark">
            Service Required <span className="text-orange">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={state.service || ""}
            onChange={(e) => set("service", e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
          >
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-dark">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={state.message || ""}
          onChange={(e) => set("message", e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20"
          placeholder="Tell us a bit about your business or requirement…"
        />
      </div>
      <label className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={state.consent === "on"}
          onChange={(e) => set("consent", e.target.checked ? "on" : "")}
          className="mt-0.5 h-4 w-4 rounded border-input"
          required
        />
        I agree to be contacted by {SITE.name} regarding my enquiry.
      </label>
      {errors.consent && <p className="mt-1 text-xs text-destructive">{errors.consent}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-dark disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "loading" ? "Sending…" : "Request Free Consultation"}
      </button>
    </form>
  );
}
