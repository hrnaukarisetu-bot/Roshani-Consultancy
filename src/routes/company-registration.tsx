import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CompanyRegistrationPlans } from "@/components/CompanyRegistrationPlans";
import { servicesByCategory } from "@/data/services";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/company-registration")({
  head: () => ({
    meta: [
      { title: "Company Registration Services in India | India Business Care" },
      {
        name: "description",
        content:
          "Private Limited, LLP, OPC, Section 8, Nidhi and Farmer Producer Company registration across India â€” quick, transparent and professional.",
      },
      { property: "og:url", content: "/company-registration" },
      ...seoHead({ title: "Company Registration Services in India | India Business Care", description: "Register a Private Limited Company, LLP, OPC, Section 8, Nidhi or Farmer Producer Company anywhere in India with expert end-to-end support.", path: "/company-registration", keywords: ["company registration India", "private limited company registration", "LLP registration"] }).meta,
    ],
    links: seoHead({ title: "Company Registration Services in India | India Business Care", description: "Register your company anywhere in India with expert end-to-end support.", path: "/company-registration" }).links,
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
        description="Choose from Private Limited, LLP, OPC, Section 8, Nidhi and Producer Company structures â€” we handle the full process end to end."
        breadcrumbs={[{ label: "Company Registration" }]}
      />
      <CompanyRegistrationPlans />
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
