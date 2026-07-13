import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE } from "@/data/site";
import { CATEGORY_LABELS, SERVICES, servicesByCategory } from "@/data/services";

type NavItem = { to: string; label: string; desktopLabel?: string; hasMega?: boolean };
const NAV: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us", desktopLabel: "About" },
  { to: "/services", label: "Services", hasMega: true },
  { to: "/company-registration", label: "Company Registration", desktopLabel: "Company" },
  { to: "/tender-services", label: "Tender Services", desktopLabel: "Tender" },
  { to: "/gst-taxation", label: "GST & Taxation", desktopLabel: "GST & Tax" },
  { to: "/government-licenses", label: "Government Licenses", desktopLabel: "Licenses" },
  { to: "/resources", label: "Resources" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "bg-white/95 shadow-[0_6px_24px_-12px_rgba(20,42,82,0.18)] backdrop-blur" : "bg-white"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={SITE.name}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-navy text-white font-bold shadow-soft">
            R
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-navy-dark sm:text-[15px]">Roshani IT</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-orange">
              Consultancy
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
          {NAV.map((n) => (
            <div key={n.to} className="relative group">
              <Link
                to={n.to as any}
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[12px] font-medium text-ink transition hover:text-navy xl:px-2.5 xl:text-[13px] [&.active]:text-navy [&.active]:font-semibold"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.desktopLabel ?? n.label}
                {n.hasMega && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {n.hasMega && (
                <div className="invisible absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-white p-6 shadow-[0_20px_60px_-20px_rgba(20,42,82,0.25)]">
                    {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map(
                      (cat) => (
                        <div key={cat}>
                          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-orange">
                            {CATEGORY_LABELS[cat]}
                          </div>
                          <ul className="space-y-1">
                            {servicesByCategory(cat)
                              .slice(0, 4)
                              .map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    to="/services/$slug"
                                    params={{ slug: s.slug }}
                                    className="block rounded-md px-2 py-1.5 text-sm text-ink transition hover:bg-navy-soft hover:text-navy"
                                  >
                                    {s.title}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>


        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <Link
            to="/contact"
            className="inline-flex min-w-[10rem] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
          >
            Get Free Consultation
          </Link>
        </div>
        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-navy-dark lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" aria-modal role="dialog">
          <div className="absolute inset-0 bg-navy-dark/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white shadow-xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-bold text-navy-dark">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-navy-dark" />
              </button>
            </div>
            <nav className="p-3">
              {NAV.map((n) => {
                if (n.hasMega) {
                  return (
                    <div key={n.to} className="mb-1">
                      <Link
                        to={n.to as any}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-navy-soft"
                      >
                        {n.label}
                      </Link>
                      {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map(
                        (cat) => {
                          const openCat = mobileServicesOpen === cat;
                          return (
                            <div key={cat} className="ml-3 border-l border-border pl-3">
                              <button
                                onClick={() => setMobileServicesOpen(openCat ? null : cat)}
                                className="flex w-full items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-orange"
                              >
                                {CATEGORY_LABELS[cat]}
                                <ChevronDown
                                  className={`h-4 w-4 transition ${openCat ? "rotate-180" : ""}`}
                                />
                              </button>
                              {openCat && (
                                <ul className="pb-2">
                                  {servicesByCategory(cat).map((s) => (
                                    <li key={s.slug}>
                                      <Link
                                        to="/services/$slug"
                                        params={{ slug: s.slug }}
                                        onClick={() => setOpen(false)}
                                        className="block rounded-md px-2 py-1.5 text-sm text-ink hover:bg-navy-soft"
                                      >
                                        {s.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={n.to}
                    to={n.to as any}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-navy-soft"
                    activeProps={{ className: "bg-navy-soft text-navy font-semibold" }}
                    activeOptions={{ exact: n.to === "/" }}
                  >
                    {n.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center rounded-full bg-orange px-4 py-3 text-sm font-semibold text-white"
              >
                Get Free Consultation
              </Link>

            </nav>
          </div>
        </div>
      )}

      {/* scroll progress */}
      <ScrollProgress />
    </header>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setP(Number.isFinite(scrolled) ? scrolled : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="h-0.5 w-full bg-transparent">
      <div className="h-full gradient-orange transition-[width]" style={{ width: `${p}%` }} />
    </div>
  );
}
