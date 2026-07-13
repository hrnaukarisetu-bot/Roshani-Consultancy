import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer | Roshani IT Consultancy" },
      { name: "description", content: "Legal disclaimer for information and services provided by Roshani IT Consultancy." },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero title="Disclaimer" breadcrumbs={[{ label: "Disclaimer" }]} />
      <section className="bg-white py-16">
        <div className="container-x mx-auto max-w-3xl space-y-5 text-navy-dark/85">
          <ul className="list-disc space-y-3 pl-5">
            <li>Approval timelines may vary depending on government departments.</li>
            <li>
              This website does not guarantee approval of any registrations, licences, tenders or
              government applications.
            </li>
            <li>
              Information provided on this website is for general guidance only and may be updated
              from time to time as per applicable regulations.
            </li>
            <li>
              For advice tailored to your specific situation, please contact our consultants
              directly.
            </li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  ),
});
