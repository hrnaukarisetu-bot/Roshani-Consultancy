import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import type React from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
import { ServiceCard } from "@/components/ServiceCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CATEGORY_LABELS, getService, servicesByCategory, type Service } from "@/data/services";
import { getServiceDetail, type ServiceDetailContent } from "@/data/serviceDetails";
import { SITE, absoluteUrl } from "@/data/site";

const feeNote = "Government fees and professional charges may vary based on the application type.";
const documentNote = "Exact document requirements may vary depending on the applicant type, business structure and applicable authority.";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { detail: ServiceDetailContent } => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { detail: getServiceDetail(service) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service Not Found | Roshani IT Consultancy" }, { name: "robots", content: "noindex" }] };
    }
    const { detail } = loaderData;
    const path = `/services/${detail.slug}`;
    const url = absoluteUrl(path);
    const image = absoluteUrl("/roshani_logo.png");
    const faqs = buildFaqs(detail);
    return {
      meta: [
        { title: detail.metaTitle },
        { name: "description", content: detail.metaDescription },
        { name: "keywords", content: detail.keywords.join(", ") },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE.name },
        { property: "og:title", content: detail.metaTitle },
        { property: "og:description", content: detail.metaDescription },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:image:alt", content: `${detail.title} service by ${SITE.name}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: detail.metaTitle },
        { name: "twitter:description", content: detail.metaDescription },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(detail)) },
        { type: "application/ld+json", children: JSON.stringify(webPageSchema(detail, url, image)) },
        { type: "application/ld+json", children: JSON.stringify(serviceSchema(detail)) },
        { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <main className="bg-surface py-20">
        <div className="container-x text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange">404</p>
          <h1 className="mt-3 text-4xl font-bold text-navy-dark">Service not found</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">The service page you are looking for is unavailable or may have moved.</p>
          <Link to="/services" className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white">View all services</Link>
        </div>
      </main>
    </SiteLayout>
  ),
});

function ServiceDetail() {
  const { detail } = Route.useLoaderData() as { detail: ServiceDetailContent };
  const service = getService(detail.slug);
  if (!service) return null;
  const related = relatedServices(service, detail);
  const faqs = buildFaqs(detail);

  return (
    <SiteLayout>
      <main>
        <section className="bg-surface-blue/60 py-4">
          <div className="container-x"><Breadcrumb service={service} /></div>
        </section>

        <section className="relative overflow-hidden bg-white py-14 md:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(430px,0.8fr)] lg:items-start xl:grid-cols-[minmax(0,1.35fr)_minmax(500px,0.9fr)]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange/25 bg-orange-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange">{CATEGORY_LABELS[service.category]}</div>
              <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-navy-dark sm:text-5xl">{detail.title} in India</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{detail.shortDescription}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Expert Assisted Process", "Transparent Guidance", "End-to-End Support"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-navy-dark"><CheckCircle2 className="h-4 w-4 text-orange" />{item}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#service-inquiry-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110">Get Expert Consultation <ArrowRight className="h-4 w-4" /></a>
                <a href="#documents" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-navy hover:bg-navy-soft">View Required Documents</a>
              </div>
            </div>
            <aside id="service-inquiry-form" className="scroll-mt-28">
              <ContactForm defaultService={service.title} showIntro />
            </aside>
          </div>
        </section>

        <section className="bg-surface py-8">
          <div className="container-x grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickInfo icon={BadgeCheck} label="Service Type" value={CATEGORY_LABELS[service.category]} />
            <QuickInfo icon={Clock3} label="Estimated Timeline" value={detail.estimatedTimeline} />
            <QuickInfo icon={Users} label="Ideal For" value={detail.whoShouldApply[0] || service.suitableFor} />
            <QuickInfo icon={ShieldCheck} label="Support" value={detail.supportType} />
          </div>
          <p className="container-x mt-4 text-xs text-muted-foreground">Government processing timelines may vary depending on document accuracy, portal status and authority review.</p>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <SectionEyebrow>Service Overview</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-bold text-navy-dark">What is {detail.title}?</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">{detail.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
            <div className="rounded-2xl border border-border bg-navy-soft p-6">
              <h3 className="text-lg font-bold text-navy-dark">Why choose this service?</h3>
              <ul className="mt-4 space-y-3">{detail.benefits.slice(0, 4).map((item) => <CheckItem key={item.title}>{item.title}</CheckItem>)}</ul>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 md:py-20">
          <div className="container-x">
            <SectionHeader eyebrow="Benefits" title="Key benefits" description="Clear, practical advantages for Indian businesses choosing this service." />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{detail.benefits.slice(0, 6).map((benefit) => <BenefitCard key={benefit.title} title={benefit.title} description={benefit.description} />)}</div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-2">
            <InfoPanel eyebrow="Who should apply" title="Suitable business types" items={detail.whoShouldApply} />
            <InfoPanel eyebrow="Eligibility" title="Basic conditions" items={detail.eligibility} />
          </div>
        </section>

        <section id="documents" className="scroll-mt-28 bg-surface py-16 md:py-20">
          <div className="container-x">
            <SectionHeader eyebrow="Checklist" title="Documents required" description={documentNote} />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {detail.documentGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-navy-dark"><FileText className="h-5 w-5 text-orange" /><h3 className="font-bold">{group.title}</h3></div>
                  <ul className="space-y-3">{group.items.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>
                </div>
              ))}
            </div>
            <a href="#service-inquiry-form" className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white">Get the Exact Document Checklist</a>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-x">
            <SectionHeader eyebrow="Process" title="Registration / filing process" description="A guided process focused on accurate documentation and timely follow-up. Authority approvals remain with the relevant department or portal." />
            <ol className="mt-10 grid gap-4 lg:grid-cols-2">
              {detail.processSteps.slice(0, 7).map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">{index + 1}</span>
                    <div><h3 className="font-bold text-navy-dark">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-surface py-16 md:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-2">
            <div>
              <SectionEyebrow>Deliverables</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-bold text-navy-dark">What you will receive</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">{detail.deliverables.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>
            </div>
            <div className="rounded-2xl bg-navy p-7 text-white shadow-soft">
              <SectionEyebrow light>Roshani Consultancy</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-bold">Why choose us?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Expert Guidance", "Transparent Process", "Proper Documentation Support", "Timely Status Updates", "End-to-End Coordination", "Post-Service Assistance"].map((item) => <div key={item} className="rounded-xl bg-white/10 p-4 text-sm font-semibold text-white">{item}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container-x">
            <SectionHeader eyebrow="FAQs" title="Frequently asked questions" description={`Answers to common questions about ${detail.title}.`} />
            <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-border bg-white px-4 shadow-sm">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-sm font-semibold text-navy-dark hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-surface py-16 md:py-20">
            <div className="container-x">
              <SectionHeader eyebrow="Related" title="Related services" description="Useful next services often requested with this filing." />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ServiceCard key={item.slug} icon={item.icon} title={item.title} description={item.short} href={`/services/${item.slug}`} />)}</div>
            </div>
          </section>
        )}

        <section className="gradient-navy py-16 text-white md:py-20">
          <div className="container-x text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Need Help With {detail.title}?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">Speak with our consultant to understand eligibility, documents, timeline and the next steps.</p>
            <div className="mt-8 flex justify-center">
              <a href="#service-inquiry-form" className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white">Request a Callback</a>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

function Breadcrumb({ service }: { service: Service }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-full overflow-x-auto text-sm">
      <ol className="flex min-w-max items-center gap-2 text-muted-foreground">
        <li><Link to="/" className="hover:text-navy">Home</Link></li><li>/</li>
        <li><Link to="/services" className="hover:text-navy">Services</Link></li><li>/</li>
        <li><span>{CATEGORY_LABELS[service.category]}</span></li><li>/</li>
        <li aria-current="page" className="font-semibold text-navy-dark">{service.title}</li>
      </ol>
    </nav>
  );
}

function QuickInfo({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div className="rounded-2xl border border-border bg-white p-5 shadow-sm"><Icon className="h-5 w-5 text-orange" /><p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold leading-relaxed text-navy-dark">{value}</p></div>;
}

function SectionEyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-wider ${light ? "text-orange-soft" : "text-orange"}`}>{children}</p>;
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="max-w-3xl"><SectionEyebrow>{eyebrow}</SectionEyebrow><h2 className="mt-2 text-3xl font-bold text-navy-dark">{title}</h2>{description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>}</div>;
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-2 text-sm leading-relaxed text-navy-dark"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> <span>{children}</span></li>;
}

function InfoPanel({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return <div className="rounded-2xl border border-border bg-white p-6 shadow-sm"><SectionEyebrow>{eyebrow}</SectionEyebrow><h2 className="mt-2 text-2xl font-bold text-navy-dark">{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul></div>;
}

function BenefitCard({ title, description }: { title: string; description: string }) {
  return <div className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"><div className="grid h-12 w-12 place-items-center rounded-xl bg-navy-soft text-navy transition group-hover:scale-105 group-hover:bg-orange group-hover:text-white"><Sparkles className="h-6 w-6" /></div><h3 className="mt-5 text-lg font-bold text-navy-dark">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div>;
}

function buildFaqs(detail: ServiceDetailContent) {
  const generated = [
    { q: `Which documents are required for ${detail.title}?`, a: documentNote },
    { q: `How long does ${detail.title} take?`, a: `${detail.estimatedTimeline}. Government processing timelines may vary.` },
    { q: "Is professional consultation necessary?", a: "It is not mandatory in every case, but professional review helps reduce avoidable errors, missing documents and incorrect service selection." },
    { q: "Are government fees included?", a: feeNote },
    { q: "Can Roshani Consultancy assist with future compliance?", a: "Yes. We can guide you on renewals, return filings, registrations and related compliance after the service is complete." },
  ];
  return [...detail.faqs, ...generated].filter((item, index, arr) => arr.findIndex((x) => x.q === item.q) === index).slice(0, 8);
}

function relatedServices(service: Service, detail: ServiceDetailContent) {
  const slugs = detail.relatedServices.length ? detail.relatedServices : servicesByCategory(service.category).filter((s) => s.slug !== service.slug).map((s) => s.slug);
  return slugs.map((slug) => getService(slug)).filter((item): item is Service => Boolean(item)).slice(0, 3);
}


function breadcrumbSchema(detail: ServiceDetailContent) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
    { "@type": "ListItem", position: 3, name: CATEGORY_LABELS[detail.category], item: absoluteUrl("/services") },
    { "@type": "ListItem", position: 4, name: detail.title, item: absoluteUrl(`/services/${detail.slug}`) },
  ] };
}

function webPageSchema(detail: ServiceDetailContent, url: string, image: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: detail.metaTitle,
    description: detail.metaDescription,
    url,
    image,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    about: { "@type": "Service", name: detail.title, serviceType: CATEGORY_LABELS[detail.category] },
  };
}
function serviceSchema(detail: ServiceDetailContent) {
  return { "@context": "https://schema.org", "@type": "Service", name: detail.title, description: detail.metaDescription, url: absoluteUrl(`/services/${detail.slug}`), provider: { "@type": "ProfessionalService", name: SITE.name, telephone: SITE.phone, email: SITE.email }, areaServed: { "@type": "Country", name: "India" }, serviceType: CATEGORY_LABELS[detail.category] };
}

function faqSchema(items: Array<{ q: string; a: string }>) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
}
