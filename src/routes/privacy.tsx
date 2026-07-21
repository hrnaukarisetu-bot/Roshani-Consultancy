import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Roshani IT Consultancy" },
      { name: "description", content: "How Roshani IT Consultancy collects, uses and protects your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero title="Privacy Policy" breadcrumbs={[{ label: "Privacy Policy" }]} />
      <section className="bg-white py-16">
        <div className="container-x mx-auto max-w-3xl space-y-5 text-navy-dark/85">
          <p>
            This Privacy Policy explains how Roshani IT Consultancy ("we", "us") collects,
            uses and protects information you share with us through this website or during
            our consulting engagements.
          </p>
          <h2 className="pt-4 text-xl font-bold text-navy-dark">Information We Collect</h2>
          <p>Name, contact details, business information and documents required for the services you request.</p>
          <h2 className="pt-4 text-xl font-bold text-navy-dark">How We Use It</h2>
          <p>Only to deliver requested services, communicate with you, and meet legal obligations. We never sell your data.</p>
          <h2 className="pt-4 text-xl font-bold text-navy-dark">Data Security</h2>
          <p>We use reasonable technical and organisational measures to protect your information.</p>
          <h2 className="pt-4 text-xl font-bold text-navy-dark">Contact</h2>
          <p>For questions, email support@indiabusinesscare.com.</p>
        </div>
      </section>
    </SiteLayout>
  ),
});
