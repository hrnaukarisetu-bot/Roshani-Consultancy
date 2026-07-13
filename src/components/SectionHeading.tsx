import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
            invert
              ? "border-white/20 bg-white/10 text-white/90"
              : "border-orange/30 bg-orange-soft text-orange"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          {eyebrow}
        </div>
      )}
      <h2
        className={`mt-4 text-3xl font-bold sm:text-4xl md:text-5xl ${
          invert ? "text-white" : "text-navy-dark"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg ${
            invert ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
