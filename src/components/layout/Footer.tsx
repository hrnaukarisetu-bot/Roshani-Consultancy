import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { SITE, whatsappLink, telLink, mailLink } from "@/data/site";
import { CATEGORY_LABELS, servicesByCategory } from "@/data/services";
import footerLogo from "@/assets/footer_logo.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-dark text-white/80">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-navy/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />

      <div className="container-x relative py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src={footerLogo}
                alt=""
                className="block h-20 w-auto max-w-[11.5rem] shrink-0 object-contain sm:h-24 sm:max-w-[13.5rem]"
                width={270}
                height={135}
                loading="lazy"
              />
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed">
              End-to-end business setup, taxation, tender and licensing support for Indian
              startups, MSMEs, contractors and enterprises - under one trusted roof.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-orange" />
                <a href={telLink()} className="hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-orange" />
                <a href={mailLink()} className="break-all hover:text-white">{SITE.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-orange" />
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-white">
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {[Facebook, Instagram, Linkedin, Twitter].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:border-orange hover:text-orange"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).slice(0, 3).map(
            (cat) => (
              <div key={cat}>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                  {CATEGORY_LABELS[cat]}
                </h4>
                <ul className="space-y-2 text-sm">
                  {servicesByCategory(cat)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="transition hover:text-white"
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

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              {[
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/resources", label: "Resources" },
                { to: "/contact", label: "Contact" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/disclaimer", label: "Disclaimer" },
                { to: "/sitemap.xml", label: "Sitemap" },
              ].map((l) =>
                l.to.endsWith(".xml") ? (
                  <a key={l.to} href={l.to} className="hover:text-white">
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.to} to={l.to as any} className="hover:text-white">
                    {l.label}
                  </Link>
                ),
              )}
            </nav>
            <p className="text-xs text-white/60">
              {"\u00A9"} 2026 All Rights Reserved By India Business care and Designed By {" "}
              <a href="https://webakoof.com" target="_blank" rel="noreferrer" className="font-semibold text-white hover:text-orange">
                Webakoof
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
