import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SITE, whatsappLink, telLink } from "@/data/site";

export function CTASection({
  headline = "Ready to Start or Grow Your Business?",
  text = "Speak with our business registration and compliance experts today.",
}: {
  headline?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden gradient-navy py-20">
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">{headline}</h2>
          <p className="mt-4 text-white/80 sm:text-lg">{text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={telLink()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 sm:w-auto"
            >
              <Phone className="h-4 w-4" /> Call {SITE.phone}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-white/90 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Request Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
