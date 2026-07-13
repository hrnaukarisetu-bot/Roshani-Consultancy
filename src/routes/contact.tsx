import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE, telLink, mailLink, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Roshani IT Consultancy | Akola, Maharashtra" },
      {
        name: "description",
        content:
          "Get in touch with Roshani IT Consultancy in Akola for company registration, GST, tender and licensing services. Call, WhatsApp or email us.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const cards = [
    { icon: Phone, title: "Call Us", value: SITE.phone, href: telLink() },
    { icon: MessageCircle, title: "WhatsApp", value: SITE.phone, href: whatsappLink() },
    { icon: Mail, title: "Email", value: SITE.email, href: mailLink() },
    { icon: Clock, title: "Office Hours", value: SITE.hours },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Us"
        title="We're here to help you start & grow"
        description="Call, message or fill in the form — an expert will get back to you within one business day."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="bg-white py-16">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => {
              const inner = (
                <>
                  <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl gradient-orange text-white">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {c.title}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-navy-dark">{c.value}</div>
                </>
              );
              return c.href ? (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="card-hover block rounded-2xl border border-border bg-white p-5"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.title} className="rounded-2xl border border-border bg-white p-5">
                  {inner}
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-3xl border border-border bg-navy-soft p-6 sm:p-8">
              <SectionHeading
                align="left"
                eyebrow="Visit Our Office"
                title={<>Landmark Plaza, Akola</>}
              />
              <div className="mt-5 flex items-start gap-3 text-sm text-navy-dark">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                <span>{SITE.address}</span>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Roshani IT Consultancy — Akola Office"
                  src="https://www.google.com/maps?q=Akola,Maharashtra,India&output=embed"
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Enquiry Form"
                title={<>Request a free consultation</>}
              />
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
