import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  Users,
  Sparkles,
  FileCheck2,
  Quote,
  FileSignature,
  BadgeCheck,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { Counter } from "@/components/Counter";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { getService, servicesByCategory, INDUSTRIES } from "@/data/services";
import { FAQS, TESTIMONIALS } from "@/data/content";
import { SITE } from "@/data/site";
import roshaniBanner from "@/assets/roshani_banner.png";
import officeImage from "@/assets/office.png";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Roshani IT Consultancy | Company Registration, GST & Tender Services in Akola",
      },
      {
        name: "description",
        content:
          "Start your business legally. Roshani IT Consultancy offers company registration, GST, tender filing, licenses & compliance for Indian startups and MSMEs.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.slice(0, 6).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const highlights = [
    { icon: Shield, label: `${SITE.years}+ Years Experience` },
    { icon: Users, label: "Expert CA & CS Guidance" },
    { icon: Sparkles, label: "End-to-End Support" },
    { icon: Clock, label: "Secure & Confidential" },
  ];
  const homepageServiceSlugs = [
    "private-limited-company",
    "gem-registration",
    "digital-signature-certificate",
    "gst-registration",
    "gst-return-filing",
    "msme-udyam-registration",
    "iso-certification",
    "trademark-registration",
  ];
  const featured = homepageServiceSlugs
    .map((slug) => getService(slug))
    .filter((service) => Boolean(service));

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-32 -top-24 h-[520px] w-[520px] rounded-full bg-navy-soft blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-orange/15 blur-3xl" />
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="180" cy="30" r="80" fill="none" stroke="#233E78" strokeWidth="0.5" />
          <circle cx="180" cy="30" r="60" fill="none" stroke="#233E78" strokeWidth="0.5" />
          <circle cx="180" cy="30" r="40" fill="none" stroke="#233E78" strokeWidth="0.5" />
        </svg>

        <div className="container-x relative grid gap-12 py-14 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" />
              {SITE.years}+ Years of Trusted Experience
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-navy-dark sm:text-5xl md:text-6xl">
              Start Your Business{" "}
              <span className="text-gradient-brand">Legally & Professionally</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Complete support for company registration, GST, government tenders, licenses,
              taxation and regulatory compliance â€” under one roof for Indian startups and MSMEs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
              >
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-6 py-3 text-sm font-semibold text-navy-dark transition hover:border-navy hover:bg-navy-soft"
              >
                Explore Our Services
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-2 rounded-xl border border-border bg-white/70 p-3 backdrop-blur"
                >
                  <h.icon className="h-5 w-5 shrink-0 text-orange" />
                  <span className="text-xs font-medium text-navy-dark">{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
              <img
                src={roshaniBanner}
                alt="Roshani Consultancy business registration and compliance support"
                className="h-[420px] w-full object-cover object-top md:h-[520px]"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-dark/70 to-transparent p-6 text-white">
                <div className="text-xs font-semibold uppercase tracking-wider text-orange">
                  Trusted by MSMEs
                </div>
                <div className="mt-1 text-lg font-semibold">
                  End-to-end business setup & compliance
                </div>
              </div>
            </div>
            <div className="animate-float-slow absolute -left-6 top-10 hidden rounded-2xl border border-border bg-white p-4 shadow-soft md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-orange-soft text-orange">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">MSME / Udyam</div>
                  <div className="text-sm font-semibold text-navy-dark">Registered in 24h</div>
                </div>
              </div>
            </div>
            <div className="animate-float-slow absolute -right-4 bottom-16 hidden rounded-2xl border border-border bg-white p-4 shadow-soft md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-navy-soft text-navy">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                  <div className="text-sm font-semibold text-navy-dark">CA & CS supervised</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Services"
            title={
              <>
                One partner for every <span className="text-orange">business milestone</span>
              </>
            }
            description="From registration to renewal, we cover the full lifecycle of compliance for Indian businesses."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((s) => (
              <Reveal key={s.slug}>
                <ServiceCard
                  icon={s.icon}
                  title={s.title}
                  description={s.short}
                  href={`/services/${s.slug}`}
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img
              src={officeImage}
              alt="Roshani Consultancy office consultation meeting"
              className="h-[440px] w-full rounded-3xl object-cover shadow-soft"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-border bg-white p-5 shadow-soft md:block">
              <div className="text-3xl font-bold text-orange">
                <Counter end={SITE.years} suffix="+" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Years of Experience
              </div>
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title={
                <>
                  Building <span className="text-orange">Bharat's businesses</span>, one registration at a time.
                </>
              }
              description="Roshani IT Consultancy supports new entrepreneurs, established businesses, startups and MSMEs with legal registration, compliance, tender filing, government licensing and taxation services."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Transparent process",
                "Experienced professional team",
                "Timely support",
                "Client-focused guidance",
                "Complete business support",
                "Secure handling",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-navy-dark">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-dark"
            >
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative bg-navy-soft py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={<>Trusted expertise, delivered locally & across India</>}
            description={
              <span className="text-orange">
                A dedicated team that combines professional guidance with a client-first approach.
              </span>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, t: `${SITE.years}+ Years of Excellence`, d: "A decade-plus of hands-on experience across industries." },
              { icon: Users, t: "CA & CS Guidance", d: "Filings supervised by qualified professionals." },
              { icon: Clock, t: "Fast & Transparent", d: "Clear timelines, transparent pricing, no surprises." },
              { icon: Sparkles, t: "End-to-End Support", d: "Registration to renewal and beyond." },
              { icon: BadgeCheck, t: "Secure Handling", d: "Your documents and data are treated with strict confidentiality." },
              { icon: FileSignature, t: "Local + Nationwide", d: "Rooted in Akola, serving clients across India." },
            ].map((w) => (
              <Reveal key={w.t}>
                <div className="card-hover flex h-full flex-col rounded-2xl border border-border bg-white p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-orange text-white">
                    <w.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy-dark">{w.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY REGISTRATION */}
      <CategoryPreview
        eyebrow="Company Registration"
        title="Register the right entity for your goals"
        description="From solo founders to multi-partner ventures â€” pick the structure that fits."
        categorySlug="company-registration"
      />

      {/* TENDER */}
      <section className="bg-white py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
              alt="Government tender documentation and contracts"
              className="h-[420px] w-full rounded-3xl object-cover shadow-soft"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Tender Services"
              title={<>Win more government contracts with expert support</>}
              description="From GeM registration to bid preparation, we manage the entire tender lifecycle."
            />
            <div className="mt-6 grid grid-cols-2 gap-3">
              {servicesByCategory("tender-services").map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-start gap-2 rounded-xl border border-border bg-white p-3 transition hover:border-orange hover:bg-orange-soft"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-orange" />
                  <span className="text-sm font-medium text-navy-dark group-hover:text-navy">
                    {s.title}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              to="/tender-services"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-dark"
            >
              Explore Tender Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* GST + Licenses */}
      <CategoryPreview
        eyebrow="GST, Taxation & Compliance"
        title="Stay compliant, save more"
        description="Registration, filing and ongoing support for GST, income tax and audits."
        categorySlug="gst-taxation"
        surface
      />
      <CategoryPreview
        eyebrow="Government Licenses"
        title="Get the right licenses for your industry"
        description="MSME, Shop Act, FSSAI, IEC, ISO and Trademark â€” done right, first time."
        categorySlug="government-licenses"
      />

      {/* PROCESS */}
      <section className="bg-navy-dark py-20 text-white">
        <div className="container-x">
          <SectionHeading
            invert
            eyebrow="Work Process"
            title={<>Simple, transparent, four-step process</>}
            description="A structured approach that keeps you informed at every stage."
          />
          <ol className="relative mt-14 grid gap-8 md:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent md:block" />
            {[
              { t: "Consultation", d: "Free consultation to understand your business needs." },
              { t: "Document Collection", d: "We share a checklist and collect the required documents." },
              { t: "Application & Filing", d: "Filings are prepared, reviewed and submitted on your behalf." },
              { t: "Registration & Support", d: "Certificate delivered plus ongoing compliance support." },
            ].map((s, i) => (
              <li key={s.t} className="relative">
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-orange text-lg font-bold text-white shadow-glow md:mx-0">
                  0{i + 1}
                </div>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-white/70">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-white py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Industries We Serve"
            title={<>Trusted by businesses of every shape and size</>}
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {INDUSTRIES.map((i) => (
              <Reveal key={i.name}>
                <div className="card-hover flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-navy-soft text-navy">
                    <i.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-navy-dark">{i.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden gradient-navy py-16 text-white">
        <div className="container-x grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            { end: SITE.years, suffix: "+", label: "Years Experience" },
            { end: 500, suffix: "+", label: "Business Consultations" },
            { end: 20, suffix: "+", label: "Registration Services" },
            { end: 100, suffix: "%", label: "End-to-End Support" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-orange sm:text-5xl">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialSlider />

      {/* FAQ */}
      <section className="bg-surface py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="FAQs"
              title={<>Answers to common questions</>}
              description="Can't find what you're looking for? Reach out â€” our team is happy to help."
            />
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
            >
              Ask an Expert <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-b border-border">
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
      </section>

      <CTASection />
    </SiteLayout>
  );
}

function CategoryPreview({
  eyebrow,
  title,
  description,
  categorySlug,
  surface,
}: {
  eyebrow: string;
  title: string;
  description: string;
  categorySlug: "company-registration" | "tender-services" | "gst-taxation" | "government-licenses";
  surface?: boolean;
}) {
  const items = servicesByCategory(categorySlug);
  return (
    <section className={surface ? "bg-surface py-20" : "bg-white py-20"}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Reveal key={s.slug}>
              <ServiceCard
                icon={s.icon}
                title={s.title}
                description={s.short}
                href={`/services/${s.slug}`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSlider() {
  const [page, setPage] = useState(0);
  const cardsPerPage = 3;
  const pageCount = Math.ceil(TESTIMONIALS.length / cardsPerPage);
  const visibleTestimonials = TESTIMONIALS.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage,
  );

  const goToPrevious = () =>
    setPage((current) => (current === 0 ? pageCount - 1 : current - 1));
  const goToNext = () =>
    setPage((current) => (current === pageCount - 1 ? 0 : current + 1));

  useEffect(() => {
    if (pageCount <= 1) return;

    const timer = window.setInterval(() => {
      setPage((current) => (current === pageCount - 1 ? 0 : current + 1));
    }, 4500);

    return () => window.clearInterval(timer);
  }, [pageCount]);

  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Client Voices" title={<>What our clients say</>} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial) => (
            <article
              key={`${testimonial.name}-${testimonial.role}`}
              className="relative flex min-h-[280px] flex-col rounded-3xl border border-border bg-white p-7 shadow-soft"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full gradient-orange text-white">
                <Quote className="h-5 w-5" />
              </div>
              <p className="mt-6 flex-1 text-base leading-relaxed text-navy-dark">
                {testimonial.quote}
              </p>
              <div className="mt-6 border-t border-border pt-5">
                <div className="font-semibold text-navy-dark">{testimonial.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{testimonial.role}</div>
              </div>
            </article>
          ))}
        </div>
        {pageCount > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous testimonials"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-navy-dark shadow-sm transition hover:border-orange hover:text-orange"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: pageCount }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPage(idx)}
                  aria-label={`Testimonials page ${idx + 1}`}
                  className={`h-2.5 rounded-full transition ${
                    idx === page ? "w-6 bg-orange" : "w-2.5 bg-navy-soft"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next testimonials"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-navy-dark shadow-sm transition hover:border-orange hover:text-orange"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
