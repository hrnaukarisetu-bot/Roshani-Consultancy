import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, FileText, ClipboardList, Sparkles, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ContactForm } from "@/components/ContactForm";
import { ServiceCard } from "@/components/ServiceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CATEGORY_LABELS,
  getService,
  SERVICES,
  servicesByCategory,
} from "@/data/services";
import { whatsappLink } from "@/data/site";

import type { Service } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { service: Service } => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Service Not Found | Roshani IT Consultancy" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const s = loaderData.service;
    const url = `/services/${s.slug}`;
    return {
      meta: [
        { title: `${s.title} | Roshani IT Consultancy` },
        { name: "description", content: s.short },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.short },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.short,
            provider: {
              "@type": "ProfessionalService",
              name: "Roshani IT Consultancy",
            },
            areaServed: "IN",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero title="Service not found" breadcrumbs={[{ label: "Services", to: "/services" }, { label: "Not found" }]} />
    </SiteLayout>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: Service };
  const related = SERVICES.filter(
    (s) => s.category === service.category && s.slug !== service.slug,
  ).slice(0, 3);
  const Icon = service.icon;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={CATEGORY_LABELS[service.category]}
        title={service.title}
        description={service.short}
        breadcrumbs={[
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
      />

      <section className="bg-white py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-10">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-xl gradient-orange text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-orange">
                    Overview
                  </div>
                  <h2 className="text-2xl font-bold text-navy-dark">{service.title}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {service.short} Suitable for <strong className="text-navy-dark">{service.suitableFor}</strong>
              </p>
            </div>

            <InfoBlock icon={Sparkles} title="Key Benefits" items={service.benefits} />

            {service.eligibility && service.eligibility.length > 0 && (
              <InfoBlock
                icon={ClipboardList}
                title="Who Should Apply / Eligibility"
                items={service.eligibility}
              />
            )}

            <InfoBlock icon={FileText} title="Documents Required" items={service.documents} />

            <div>
              <h3 className="text-xl font-bold text-navy-dark">Application Process</h3>
              <ol className="mt-4 space-y-3">
                {service.process.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-navy-dark">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-muted-foreground">
                Timeline disclaimer: Approval timelines depend on the concerned government
                department. We do not guarantee approval.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-navy-soft p-6">
              <h3 className="text-lg font-bold text-navy-dark">
                Why choose Roshani IT Consultancy?
              </h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  "13+ years of expertise",
                  "CA & CS supervised filings",
                  "Transparent process & pricing",
                  "Local support, pan-India delivery",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm text-navy-dark">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-orange" /> {x}
                  </li>
                ))}
              </ul>
            </div>

            {service.faqs.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-navy-dark">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="mt-4">
                  {service.faqs.map((f, i) => (
                    <AccordionItem key={i} value={`f-${i}`}>
                      <AccordionTrigger className="text-left text-sm font-semibold text-navy-dark hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-orange">
                Get in Touch
              </div>
              <h3 className="mt-1 text-xl font-bold text-navy-dark">Request Consultation</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us a bit about your business and we'll get back within one business day.
              </p>
              <div className="mt-5">
                <ContactForm defaultService={service.title} />
              </div>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface py-16">
          <div className="container-x">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-navy-dark">Related Services</h3>
              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-orange hover:text-navy"
              >
                All services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard
                  key={s.slug}
                  icon={s.icon}
                  title={s.title}
                  description={s.short}
                  href={`/services/${s.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </SiteLayout>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-orange" />
        <h3 className="text-xl font-bold text-navy-dark">{title}</h3>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((x) => (
          <li key={x} className="flex items-start gap-2 rounded-lg bg-white p-3 text-sm text-navy-dark ring-1 ring-border">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Also export sample export used implicitly? none needed
export {};
