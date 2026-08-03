import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, MapPin, Phone, MessageCircle } from "lucide-react";
import { ClientLogo } from "@/components/ClientCard";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PUBLISHED_CLIENTS } from "@/data/clients";
import { telLink, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/clients/$slug")({
  head: ({ params }) => {
    const client = PUBLISHED_CLIENTS.find((item) => item.slug === params.slug);
    if (!client)
      return {
        meta: [
          { title: "Client not found | India Business Care" },
          { name: "robots", content: "noindex" },
        ],
      };
    const description = `${client.companyName} in ${client.city}, supported with ${client.services.slice(0, 3).join(", ") || "business consultancy"} by India Business Care.`;
    return {
      meta: [
        { title: `${client.companyName} | Our Clients` },
        { name: "description", content: description },
        { property: "og:title", content: client.companyName },
        { property: "og:description", content: description },
        { property: "og:image", content: client.logo || "/roshani_logo.png" },
      ],
      links: [{ rel: "canonical", href: `/clients/${client.slug}` }],
    };
  },
  component: ClientDetails,
});

function ClientDetails() {
  const { slug } = Route.useParams();
  const client = PUBLISHED_CLIENTS.find((item) => item.slug === slug);
  if (!client)
    return (
      <SiteLayout>
        <PageHero
          title="Client not found"
          breadcrumbs={[{ label: "Our Clients", to: "/clients" }, { label: "Not found" }]}
        />
        <section className="container-x py-20 text-center">
          <p className="text-muted-foreground">This client profile is unavailable.</p>
          <Link
            to="/clients"
            search={{
              q: "",
              city: "",
              business: "",
              service: "",
              featured: false,
              sort: "order",
              page: 1,
            }}
            className="mt-5 inline-flex rounded-full bg-orange px-5 py-2.5 font-semibold text-white"
          >
            View all clients
          </Link>
        </section>
      </SiteLayout>
    );
  return (
    <SiteLayout>
      <PageHero
        title={client.companyName}
        description={`${client.natureOfBusiness} â€¢ ${client.city}`}
        breadcrumbs={[{ label: "Our Clients", to: "/clients" }, { label: client.companyName }]}
      />
      <section className="container-x py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <div>
            <ClientLogo client={client} eager />
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-navy-soft p-4 text-sm text-navy">
              <MapPin className="h-4 w-4 text-orange" />
              {client.city}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange">
              Client overview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-navy-dark">Business support provided</h2>
            {client.shortDescription && (
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {client.shortDescription}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {client.services.length ? (
                client.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-navy-soft px-3 py-1.5 text-sm font-medium text-navy"
                  >
                    {service}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">General consultancy support</span>
              )}
            </div>
            {client.websiteUrl && (
              <a
                href={client.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy"
              >
                Visit website <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {client.projectRequirement && (
              <Detail title="Client requirement" text={client.projectRequirement} />
            )}
            {client.solutionProvided && (
              <Detail title="Solution provided" text={client.solutionProvided} />
            )}
            {client.resultSummary && (
              <Detail title="Result and outcome" text={client.resultSummary} />
            )}
            {client.testimonial && (
              <blockquote className="mt-8 rounded-3xl border-l-4 border-orange bg-orange-soft p-6 text-ink">
                â€œ{client.testimonial}â€
              </blockquote>
            )}
          </div>
        </div>
        <div className="mt-12 rounded-3xl border border-border bg-surface p-6 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy-dark">Need similar business support?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Talk to our team about registration, compliance and consultancy.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 md:mt-0">
            <a
              href={whatsappLink()}
              className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
            <a
              href={telLink()}
              className="inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </section>
      <CTASection />
    </SiteLayout>
  );
}
function Detail({ title, text }: { title: string; text: string }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-navy-dark">{title}</h2>
      <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
    </section>
  );
}
