import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckCircle2, Award, Target, Eye, Heart, Sparkles, Quote } from "lucide-react";
import founderPhoto from "@/assets/Founder photo.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Roshani IT Consultancy | Business Consulting Experts in Akola" },
      {
        name: "description",
        content:
          "Meet the team behind Roshani IT Consultancy — 13+ years supporting Indian startups, MSMEs and contractors with registration, compliance and tender services.",
      },
      { property: "og:title", content: "About Roshani IT Consultancy" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="Trusted business consultants building Bharat's next generation of MSMEs"
        description="Roshani IT Consultancy is a business consulting firm helping startups, MSMEs, contractors and enterprises register, comply and grow — all under one roof."
        breadcrumbs={[{ label: "About Us" }]}
      />

      <section className="bg-white py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="Roshani IT Consultancy team meeting"
            className="h-[480px] w-full rounded-3xl object-cover shadow-soft"
          />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title={<>13+ years of end-to-end business consulting expertise</>}
              description="From company registration to license and government certification, tender consulting and taxation — we bring together the professionals, processes and technology to make business setup effortless."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Company Registration",
                "GST & Taxation",
                "Tender Consulting",
                "Government Licensing",
                "Trademark & IP",
                "Business Advisory",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-navy-dark">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Mission • Vision • Values"
            title={<>The principles that guide our work</>}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "Empower Indian entrepreneurs, MSMEs and contractors with professional, transparent and affordable business setup and compliance support.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "To become the most trusted consultancy partner enabling India's next generation of businesses to Build the Bharat.",
              },
              {
                icon: Heart,
                title: "Core Values",
                text: "Integrity, transparency, professionalism, empathy and a client-first approach in every engagement.",
              },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-white p-7 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-orange text-white">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy-dark">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-white py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Founder Profile"
            title={<>Meet Mr. Nagsen D. Surwade</>}
            description="Director & Founder — leading Roshani IT Consultancy's mission to make business registration simple, transparent and accessible for every Indian entrepreneur."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[380px_1fr] lg:items-start">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl gradient-orange opacity-20 blur-2xl" />
              <img
                src={founderPhoto}
                alt="Founder of Roshani Consultancy"
                className="relative aspect-[4/5] h-auto max-h-[520px] w-full rounded-3xl object-cover object-top shadow-soft"
              />
              <div className="relative mt-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
                <div className="text-sm font-bold text-navy-dark">Mr. Nagsen D. Surwade</div>
                <div className="text-xs text-orange">Director & Founder</div>
              </div>
            </div>
            <div>
              <div className="rounded-3xl border border-border bg-navy-soft p-6 sm:p-8">
                <Quote className="h-6 w-6 text-orange" />
                <p className="mt-3 text-lg leading-relaxed text-navy-dark">
                  "Every entrepreneur deserves a partner that makes compliance simple, so they can focus on building. That is the mission we serve every day."
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-orange">
                    Leadership Roles
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-navy-dark">
                    {[
                      "Director & Founder – Roshani IT Consultancy",
                      "Founder President – Dnyanrekha Foundation",
                      "Startup Founder & CEO – NaukruSetu.com",
                      "Founder & CEO – E-Tenderwala",
                    ].map((x) => (
                      <li key={x} className="flex gap-2">
                        <Award className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-orange">
                    Core Expertise
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm text-navy-dark">
                    {[
                      "Company Registration",
                      "GST Registration & Compliance",
                      "Tender Filing & Consulting",
                      "Trademark Registration",
                      "Government Licensing",
                      "Business Advisory",
                    ].map((x) => (
                      <li key={x} className="flex gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-dark"
              >
                Speak with our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
