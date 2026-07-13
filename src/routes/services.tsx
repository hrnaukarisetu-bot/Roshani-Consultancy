import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { ServiceCard } from "@/components/ServiceCard";
import { CATEGORY_LABELS, SERVICES, type ServiceCategory } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Business Services | Roshani IT Consultancy" },
      {
        name: "description",
        content:
          "Explore all services from Roshani IT Consultancy — company registration, GST, tenders, licenses, trademark and compliance for Indian businesses.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ServiceCategory | "all">("all");

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => (cat === "all" ? true : s.category === cat)).filter((s) =>
      q ? (s.title + s.short).toLowerCase().includes(q.toLowerCase()) : true,
    );
  }, [q, cat]);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Services"
        title="A complete catalogue of business services"
        description="Search, filter and discover the right service for your business."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="bg-white py-16">
        <div className="container-x">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services (e.g. GST, LLP, tender)"
                aria-label="Search services"
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCat("all")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  cat === "all"
                    ? "bg-navy text-white"
                    : "bg-navy-soft text-navy hover:bg-navy hover:text-white"
                }`}
              >
                All
              </button>
              {(Object.keys(CATEGORY_LABELS) as ServiceCategory[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    cat === c
                      ? "bg-navy text-white"
                      : "bg-navy-soft text-navy hover:bg-navy hover:text-white"
                  }`}
                >
                  {CATEGORY_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <ServiceCard
                key={s.slug}
                icon={s.icon}
                title={s.title}
                description={s.short}
                href={`/services/${s.slug}`}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              No services match your search. Try a different keyword.
            </p>
          )}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
