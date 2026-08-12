import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { servicesByCategory } from "@/data/services";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/government-licenses")({
  head: () => ({
    meta: [
      { title: "License & Government Certification Services in India | India Business Care" },
      {
        name: "description",
        content:
          "MSME / Udyam, Shop Act, FSSAI, IEC, APEDA, professional tax and labour certification services for Indian businesses.",
      },
      { property: "og:url", content: "/government-licenses" },
      ...seoHead({ title: "Government Licenses & Certifications in India | IBC", description: "Get MSME/Udyam, Shop Act, FSSAI, IEC, APEDA, Professional Tax and labour registrations with expert documentation support across India.", path: "/government-licenses", keywords: ["government license consultant", "Udyam registration", "FSSAI license", "IEC registration"] }).meta,
    ],
    links: seoHead({ title: "Government Licenses & Certifications in India | IBC", description: "Expert government licence and certification support across India.", path: "/government-licenses" }).links,
  }),
  component: Page,
});

function Page() {
  const items = servicesByCategory("government-licenses");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="License & Government Certification"
        title="Every license your business needs"
        description="From basic registrations to industry-specific licenses â€” done right, first time."
        breadcrumbs={[{ label: "License & Government Certification" }]}
      />
      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title={<>License and certification services</>} />
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
