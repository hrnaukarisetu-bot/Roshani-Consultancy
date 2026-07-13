import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { servicesByCategory } from "@/data/services";

export const Route = createFileRoute("/gst-taxation")({
  head: () => ({
    meta: [
      { title: "GST Registration, Filing & Taxation Services | Roshani IT Consultancy" },
      {
        name: "description",
        content:
          "GST registration, monthly & quarterly filing, income tax returns, audit and compliance support for Indian businesses.",
      },
      { property: "og:url", content: "/gst-taxation" },
    ],
    links: [{ rel: "canonical", href: "/gst-taxation" }],
  }),
  component: Page,
});

function Page() {
  const items = servicesByCategory("gst-taxation");
  return (
    <SiteLayout>
      <PageHero
        eyebrow="GST & Taxation"
        title="Stay compliant with confidence"
        description="From registration to filing to audits — professional taxation support for businesses of every size."
        breadcrumbs={[{ label: "GST & Taxation" }]}
      />
      <section className="bg-white py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title={<>GST, tax & compliance services</>} />
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
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Consultation"
              title={<>Talk to a tax consultant</>}
              description="Share a few details and our team will reach out with a tailored plan for your business."
            />
          </div>
          <ContactForm defaultService="GST Registration" />
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
