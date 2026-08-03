import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ClientCard } from "@/components/ClientCard";
import { PageHero } from "@/components/PageHero";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  CLIENT_BUSINESS_CATEGORIES,
  CLIENT_CITIES,
  CLIENT_SERVICES,
  PUBLISHED_CLIENTS,
} from "@/data/clients";

const stringValue = (value: unknown) => (typeof value === "string" ? value : "");
export const Route = createFileRoute("/clients")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: stringValue(search.q),
    city: stringValue(search.city),
    business: stringValue(search.business),
    service: stringValue(search.service),
    featured: search.featured === true || search.featured === "true",
    sort: stringValue(search.sort) || "order",
    page: Math.max(1, Number(search.page) || 1),
  }),
  head: () => ({
    meta: [
      { title: "Our Clients | India Business Care" },
      {
        name: "description",
        content:
          "Explore businesses and organizations supported by India Business Care through registration, certification, compliance and consultancy services.",
      },
      { property: "og:title", content: "Our Clients | India Business Care" },
      {
        property: "og:description",
        content:
          "Businesses supported through registration, certification, compliance and consultancy services.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/clients" }],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/clients" });
  const [query, setQuery] = useState(search.q);
  const [clients, setClients] = useState(PUBLISHED_CLIENTS);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clients", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data.clients)) setClients(data.clients);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);
  useEffect(() => setQuery(search.q), [search.q]);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (query !== search.q)
        void navigate({ search: (old) => ({ ...old, q: query, page: 1 }), replace: true });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query, search.q, navigate]);
  const update = (key: string, value: string | boolean | number) =>
    void navigate({
      search: (old) => ({ ...old, [key]: value, page: key === "page" ? Number(value) : 1 }),
    });
  const filtered = useMemo(() => {
    const needle = search.q.trim().toLowerCase();
    const rows = clients.filter(
      (client) =>
        (!needle ||
          [client.companyName, client.natureOfBusiness, client.city, ...client.services]
            .join(" ")
            .toLowerCase()
            .includes(needle)) &&
        (!search.city || client.city === search.city) &&
        (!search.business || client.natureOfBusiness === search.business) &&
        (!search.service || client.services.includes(search.service)) &&
        (!search.featured || client.isFeatured),
    );
    return [...rows].sort((a, b) =>
      search.sort === "az"
        ? a.companyName.localeCompare(b.companyName)
        : search.sort === "za"
          ? b.companyName.localeCompare(a.companyName)
          : search.sort === "recent"
            ? b.createdAt.localeCompare(a.createdAt)
            : a.displayOrder - b.displayOrder,
    );
  }, [search, clients]);
  const pageSize = 12;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(search.page, pageCount);
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const active = Boolean(
    search.q ||
    search.city ||
    search.business ||
    search.service ||
    search.featured ||
    search.sort !== "order",
  );
  const clear = () => {
    setQuery("");
    void navigate({
      search: {
        q: "",
        city: "",
        business: "",
        service: "",
        featured: false,
        sort: "order",
        page: 1,
      },
    });
  };
  return (
    <SiteLayout>
      <PageHero
        title="Our Clients"
        breadcrumbs={[{ label: "Our Clients" }]}
        description="Explore the businesses and organizations we have supported through registration, certification, compliance, consultancy and business development services."
      />
      <section className="bg-surface py-14 md:py-20">
        <div className="container-x">
          <div className="rounded-3xl border border-border bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy-dark">
              <SlidersHorizontal className="h-4 w-4 text-orange" aria-hidden="true" />
              Search and filter clients
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
              <label className="relative md:col-span-2">
                <span className="sr-only">Search clients</span>
                <Search
                  className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search company, city or service"
                  className="h-10 w-full rounded-xl border border-border bg-white pl-10 pr-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
                />
              </label>
              <Filter
                label="City"
                value={search.city}
                options={CLIENT_CITIES}
                onChange={(v) => update("city", v)}
              />
              <Filter
                label="Business"
                value={search.business}
                options={CLIENT_BUSINESS_CATEGORIES}
                onChange={(v) => update("business", v)}
              />
              <Filter
                label="Service"
                value={search.service}
                options={CLIENT_SERVICES}
                onChange={(v) => update("service", v)}
              />
              <Filter
                label="Sort"
                value={search.sort}
                options={["order", "az", "za", "recent"]}
                labels={["Default order", "Company Aâ€“Z", "Company Zâ€“A", "Recently added"]}
                onChange={(v) => update("sort", v)}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={search.featured}
                  onChange={(event) => update("featured", event.target.checked)}
                  className="h-4 w-4 rounded border-border accent-orange"
                />
                Featured clients only
              </label>
              {active && (
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-navy hover:bg-navy-soft"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              <strong className="text-navy-dark">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "client" : "clients"} found
            </p>
          </div>
          {visible.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-border bg-white px-6 py-16 text-center">
              <h2 className="text-xl font-bold text-navy-dark">No clients found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                No clients match your selected filters. Please clear the filters and try again.
              </p>
              <button
                onClick={clear}
                className="mt-5 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
          {pageCount > 1 && (
            <nav className="mt-10 flex justify-center gap-2" aria-label="Client pagination">
              <button
                disabled={page === 1}
                onClick={() => update("page", page - 1)}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-navy disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-muted-foreground">
                Page {page} of {pageCount}
              </span>
              <button
                disabled={page === pageCount}
                onClick={() => update("page", page + 1)}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-navy disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Filter({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  labels?: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full min-w-0 rounded-xl border border-border bg-white px-3 text-sm text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
      >
        <option value="">
          {label === "Sort" ? "Default order" : `All ${label.toLowerCase()}s`}
        </option>
        {options
          .filter((option) => !(label === "Sort" && option === "order"))
          .map((option, index) => (
            <option key={option} value={option}>
              {labels?.[options.indexOf(option)] || option}
            </option>
          ))}
      </select>
    </label>
  );
}
