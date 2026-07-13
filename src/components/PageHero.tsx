import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/80">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="inline-flex items-center gap-1 hover:text-white">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            {it.to ? (
              <Link to={it.to as any} className="hover:text-white">
                {it.label}
              </Link>
            ) : (
              <span className="text-white">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="relative overflow-hidden gradient-navy pb-16 pt-14 text-white md:pb-24 md:pt-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-orange/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-background"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path d="M0 40 C 360 100 1080 -20 1440 40 L1440 80 L0 80 Z" fill="currentColor" />
      </svg>
      <div className="container-x relative">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-white/85 sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
