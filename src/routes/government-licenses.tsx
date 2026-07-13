import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { servicesByCategory } from "@/data/services";

export const Route = createFileRoute("/government-licenses")({
  head: () => ({
    meta: [
      { title: "Government License Services in India | Roshani IT Consultancy" },
      {
        name: "description",
        content:
          "MSME / Udyam, Shop Act, FSSAI, IEC, ISO and Trademark registration services for Indian businesses.",
      },
      { property: "og:url", content: "/government-licenses" },
    ],
    links: [{ rel: "canonical", href: "/government-licenses" }],
  }),
  component: Page,
});

function Page() {
  const items = servicesByCategory("government-licenses");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Government Licenses"
        title="Every license your business needs"
        description="From basic registrations to industry-specific licenses — done right, first time."
        breadcrumbs={[{ label: "Government Licenses" }]}
      />
      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title={<>Government license services</>} />
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
