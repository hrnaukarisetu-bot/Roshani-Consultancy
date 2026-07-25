import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { getClientInitials, hasClientDetails, type ClientRecord } from "@/data/clients";

export function ClientLogo({ client, eager = false }: { client: ClientRecord; eager?: boolean }) {
  return (
    <div
      className="grid h-28 w-full place-items-center rounded-2xl border border-border bg-white p-5"
      aria-label={`${client.companyName} logo`}
    >
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.logoAltText || `${client.companyName} logo`}
          className="h-full w-full object-contain"
          loading={eager ? "eager" : "lazy"}
        />
      ) : (
        <div
          className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-soft text-xl font-bold text-navy"
          aria-hidden="true"
        >
          {getClientInitials(client.companyName)}
        </div>
      )}
    </div>
  );
}

export function ClientCard({ client }: { client: ClientRecord }) {
  const visibleServices = client.services.slice(0, 3);
  const more = client.services.length - visibleServices.length;
  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange/30 hover:shadow-soft focus-within:border-navy">
      <ClientLogo client={client} />
      <div className="flex flex-1 flex-col pt-5">
        <h2 className="text-lg font-bold leading-snug text-navy-dark">{client.companyName}</h2>
        <p className="mt-2 text-sm font-medium text-ink">{client.natureOfBusiness}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
          {client.city}
        </p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Services provided">
          {visibleServices.length ? (
            visibleServices.map((service) => (
              <span
                key={service}
                className="rounded-full bg-navy-soft px-2.5 py-1 text-xs font-medium text-navy"
              >
                {service}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">Consultancy support</span>
          )}
          {more > 0 && (
            <span className="rounded-full bg-orange-soft px-2.5 py-1 text-xs font-semibold text-orange">
              +{more} more
            </span>
          )}
        </div>
        {hasClientDetails(client) && (
          <Link
            to="/clients/$slug"
            params={{ slug: client.slug }}
            search={{
              q: "",
              city: "",
              business: "",
              service: "",
              featured: false,
              sort: "order",
              page: 1,
            }}
            className="mt-auto inline-flex items-center gap-2 self-start pt-5 text-sm font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          >
            View Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
