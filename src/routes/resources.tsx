import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { RESOURCES } from "@/data/content";
import { ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Knowledge Centre | Roshani IT Consultancy" },
      {
        name: "description",
        content:
          "Practical guides on company registration, GST, tenders, MSME, FSSAI, IEC and trademark for Indian businesses.",
      },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

function Resources() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Knowledge Centre"
        title="Guides, checklists and insights for Indian businesses"
        description="Practical, plain-English resources to help you register, comply and grow."
        breadcrumbs={[{ label: "Resources" }]}
      />
      <section className="bg-white py-16">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r) => (
              <Link
                key={r.slug}
                to="/resources/$slug"
                params={{ slug: r.slug }}
                className="group card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={r.cover}
                    alt={r.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">
                    {r.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-navy-dark group-hover:text-navy">
                    {r.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {r.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-orange">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </SiteLayout>
  );
}
