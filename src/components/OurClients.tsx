import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, BriefcaseBusiness, MapPinned, Tags } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ClientLogo } from "@/components/ClientCard";
import { SectionHeading } from "@/components/SectionHeading";
import { PUBLISHED_CLIENTS, type ClientRecord } from "@/data/clients";

export function OurClients() {
  const [clients, setClients] = useState<ClientRecord[]>(PUBLISHED_CLIENTS);
  useEffect(() => {
    fetch("/api/clients")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data.clients)) setClients(data.clients);
      })
      .catch(() => undefined);
  }, []);
  const featured = useMemo(
    () => clients.filter((client) => client.isFeatured).slice(0, 8),
    [clients],
  );
  const stats = useMemo(
    () => [
      { label: "Clients Served", value: clients.length, icon: Building2 },
      {
        label: "Cities Covered",
        value: new Set(clients.map((client) => client.city)).size,
        icon: MapPinned,
      },
      {
        label: "Service Categories",
        value: new Set(clients.flatMap((client) => client.services)).size,
        icon: Tags,
      },
      {
        label: "Business Categories",
        value: new Set(clients.map((client) => client.natureOfBusiness)).size,
        icon: BriefcaseBusiness,
      },
    ],
    [clients],
  );
  return (
    <section className="bg-surface py-20" aria-labelledby="our-clients-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Trusted By"
          title={<span id="our-clients-title">Trusted by Growing Businesses</span>}
          description="We support businesses, startups, NGOs and organizations with reliable registration, compliance and consultancy services."
        />
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-white p-4 text-center shadow-sm"
            >
              <Icon className="mx-auto h-5 w-5 text-orange" aria-hidden="true" />
              <div className="mt-2 text-2xl font-bold text-navy-dark">{value}</div>
              <div className="mt-1 text-xs font-medium text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((client) => (
            <div
              key={client.id}
              className="rounded-2xl border border-border bg-white p-3 shadow-sm transition hover:border-orange/40 hover:shadow-soft"
            >
              <ClientLogo client={client} />
              <p className="mt-3 line-clamp-2 text-center text-sm font-semibold text-navy-dark">
                {client.companyName}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-9 text-center">
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
            className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          >
            View All Clients <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
