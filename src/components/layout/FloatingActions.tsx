import { useEffect, useState } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { SITE, whatsappLink, telLink } from "@/data/site";
import whatsappIcon from "@/assets/whatsapp_icon_cropped.png";

export function FloatingActions() {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label={`Chat with ${SITE.name} on WhatsApp`}
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center overflow-hidden rounded-full shadow-glow transition hover:scale-105"
      >
        <img src={whatsappIcon} alt="" className="h-full w-full object-contain" aria-hidden="true" />
      </a>
      <a
        href={telLink()}
        aria-label={`Call ${SITE.name}`}
        className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-orange text-white shadow-glow transition hover:scale-105"
      >
        <Phone className="h-6 w-6" />
      </a>
      {top && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-40 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-navy-dark text-white shadow-soft transition hover:bg-navy"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
