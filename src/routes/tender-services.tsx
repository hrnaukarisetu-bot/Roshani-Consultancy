import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { servicesByCategory } from "@/data/services";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/tender-services")({
  head: () => ({
    meta: [
      { title: "Tender Consulting & GeM Registration | Roshani IT Consultancy" },
      {
        name: "description",
        content:
          "GeM, Maharashtra e-Tender, e-Procurement, PWD contractor registration, DSC and full tender filing support for contractors and vendors.",
      },
      { property: "og:url", content: "/tender-services" },
    ],
    links: [{ rel: "canonical", href: "/tender-services" }],
  }),
  component: Page,
});

function Page() {
  const items = servicesByCategory("tender-services");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tender Services"
        title="End-to-end tender consulting for contractors & vendors"
        description="From portal registration to bid submission — we help you compete and win government tenders."
        breadcrumbs={[{ label: "Tender Services" }]}
      />
      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we handle"
            title={<>Tender consulting services</>}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
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
      <section className="bg-surface py-16">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
            alt="Government tender documentation"
            className="h-[400px] w-full rounded-3xl object-cover shadow-soft"
          />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Full Bid Lifecycle"
              title={<>From documentation to award</>}
            />
            <ul className="mt-6 grid gap-3">
              {[
                "Technical bid preparation & documentation",
                "Financial bid guidance",
                "Tender filing on Indian government portals",
                "Contractor registration renewals & class upgrades",
                "DSC issuance and portal mapping",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-navy-dark">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CTASection />
    </SiteLayout>
  );
}
