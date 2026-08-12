import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | India Business Care" },
      { name: "description", content: "Terms and conditions for services provided by India Business Care." },
      { property: "og:url", content: "/terms" },
      ...seoHead({ title: "Terms & Conditions | India Business Care", description: "Read the terms and conditions governing consulting, registration, taxation, tender and licensing services from India Business Care.", path: "/terms" }).meta,
    ],
    links: seoHead({ title: "Terms & Conditions | India Business Care", description: "Service terms for India Business Care.", path: "/terms" }).links,
  }),
  component: () => (
    <SiteLayout>
      <PageHero title="Terms & Conditions" breadcrumbs={[{ label: "Terms & Conditions" }]} />
      <section className="bg-white py-16">
        <div className="container-x mx-auto max-w-3xl space-y-5 text-navy-dark/85">
          <p>By using this website or engaging India Business Care for any service, you agree to the following terms.</p>
          <h2 className="pt-4 text-xl font-bold text-navy-dark">Scope of Services</h2>
          <p>We provide business consulting, registration, taxation, tender and licensing services subject to applicable government processes.</p>
          <h2 className="pt-4 text-xl font-bold text-navy-dark">Fees & Refunds</h2>
          <p>Government fees are payable directly to the concerned department and are non-refundable. Professional fees, once services have commenced, are non-refundable unless otherwise agreed in writing.</p>
          <h2 className="pt-4 text-xl font-bold text-navy-dark">Client Responsibilities</h2>
          <p>Clients must provide accurate, complete and timely information and documents.</p>
          <h2 className="pt-4 text-xl font-bold text-navy-dark">Limitation of Liability</h2>
          <p>We do not guarantee approval of any registration, licence or tender. Approval timelines depend on the concerned government department.</p>
        </div>
      </section>
    </SiteLayout>
  ),
});
