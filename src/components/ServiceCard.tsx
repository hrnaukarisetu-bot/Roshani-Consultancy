import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}) {
  const serviceSlug = href.match(/^\/services\/([^/?#]+)/)?.[1];
  const linkClassName =
    "inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-navy/30";
  const enquireNow = serviceSlug ? (
    <Link
      to="/services/$slug"
      params={{ slug: serviceSlug }}
      aria-label={`Enquire now about ${title}`}
      className={linkClassName}
    >
      Enquire Now
      <ArrowRight className="h-4 w-4" />
    </Link>
  ) : (
    <Link to={href as any} aria-label={`Enquire now about ${title}`} className={linkClassName}>
      Enquire Now
      <ArrowRight className="h-4 w-4" />
    </Link>
  );

  return (
    <article className="group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm">
      <span className="absolute inset-x-0 top-0 h-1 gradient-orange opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-soft text-navy transition-colors group-hover:bg-orange group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-navy-dark">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-5">{enquireNow}</div>
    </article>
  );
}