import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { servicesByCategory } from "@/data/services";

export const Route = createFileRoute("/company-registration")({
  head: () => ({
    meta: [
      { title: "Company Registration Services in India | Roshani IT Consultancy" },
      {
        name: "description",
        content:
          "Private Limited, LLP, OPC, Section 8, Nidhi and Farmer Producer Company registration across India — quick, transparent and professional.",
      },
      { property: "og:url", content: "/company-registration" },
    ],
    links: [{ rel: "canonical", href: "/company-registration" }],
  }),
  component: Page,
});

function Page() {
  const items = servicesByCategory("company-registration");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Company Registration"
        title="Register the right business entity in India"
        description="Choose from Private Limited, LLP, OPC, Section 8, Nidhi and Producer Company structures — we handle the full process end to end."
        breadcrumbs={[{ label: "Company Registration" }]}
      />
      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="Choose Your Structure"
            title={<>Company registration services</>}
            description="Each structure has different compliance, liability and fundraising implications. We'll help you pick the right one."
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
      <CTASection />
    </SiteLayout>
  );
}
