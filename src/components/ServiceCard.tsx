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
  const className =
    "group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm";
  const content = (
    <>
      <span className="absolute inset-x-0 top-0 h-1 gradient-orange opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-soft text-navy transition-colors group-hover:bg-orange group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-navy-dark">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </>
  );

  if (serviceSlug) {
    return (
      <Link
        to="/services/$slug"
        params={{ slug: serviceSlug }}
        aria-label={`Learn more about ${title}`}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <Link to={href as any} aria-label={`Learn more about ${title}`} className={className}>
      {content}
    </Link>
  );
}
