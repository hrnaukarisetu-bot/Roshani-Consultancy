import { SITE, absoluteUrl } from "@/data/site";

const DEFAULT_IMAGE = "/social-share.png";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  noindex?: boolean;
};

/** Complete, consistent metadata for every indexable page. */
export function seoHead({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  keywords = [],
  noindex = false,
}: SeoOptions) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const imageAlt = `${title} - ${SITE.name}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(keywords.length ? [{ name: "keywords", content: keywords.join(", ") }] : []),
      {
        name: "robots",
        content: noindex
          ? "noindex, nofollow"
          : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:image:secure_url", content: imageUrl },
      { property: "og:image:type", content: imageUrl.endsWith(".png") ? "image/png" : "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
