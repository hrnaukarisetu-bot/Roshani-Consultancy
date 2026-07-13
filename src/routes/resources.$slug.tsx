import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { getResource, RESOURCES, type Resource } from "@/data/content";
import { ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }): { post: Resource } => {
    const post = getResource(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Resource not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    const url = `/resources/${p.slug}`;
    return {
      meta: [
        { title: `${p.title} | Roshani IT Consultancy` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:image", content: p.cover },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:image", content: p.cover },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            image: p.cover,
            author: { "@type": "Organization", name: "Roshani IT Consultancy" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <PageHero title="Resource not found" breadcrumbs={[{ label: "Resources", to: "/resources" }, { label: "Not found" }]} />
    </SiteLayout>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData() as { post: Resource };
  const related = RESOURCES.filter((r) => r.slug !== post.slug).slice(0, 3);
  return (
    <SiteLayout>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[{ label: "Resources", to: "/resources" }, { label: post.title }]}
      />
      <article className="bg-white py-16">
        <div className="container-x mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {post.readTime}
          </div>
          <img
            src={post.cover}
            alt={post.title}
            className="mb-8 h-[360px] w-full rounded-3xl object-cover shadow-soft"
          />
          <div className="prose-none space-y-6">
            {post.content.map((c, i) => (
              <div key={i}>
                {c.heading && (
                  <h2 className="text-xl font-bold text-navy-dark sm:text-2xl">{c.heading}</h2>
                )}
                <p className="mt-2 text-base leading-relaxed text-navy-dark/85">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-navy-soft p-6 text-sm text-muted-foreground">
            Disclaimer: This article is for general information only. Rules, forms and timelines
            may change. For advice tailored to your business, please contact our consultants.
          </div>
        </div>
      </article>

      <section className="bg-surface py-16">
        <div className="container-x">
          <h3 className="mb-8 text-2xl font-bold text-navy-dark">Related Reads</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/resources/$slug"
                params={{ slug: r.slug }}
                className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
              >
                <img src={r.cover} alt={r.title} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h4 className="text-sm font-semibold text-navy-dark group-hover:text-navy">
                    {r.title}
                  </h4>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </SiteLayout>
  );
}
