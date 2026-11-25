import type { Metadata } from "next";
import { notFound } from "next/navigation";
import policies from "@/content/policies.json";
import { PageHero } from "@/components/sections/page-hero";

type Block = { type: "h" | "p" | "faqq"; text: string } | { type: "list"; items: string[] };
const data = policies as Record<string, { title: string; blocks: Block[] }>;

export function generateStaticParams() {
  return Object.keys(data).map((policy) => ({ policy }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[policy]">): Promise<Metadata> {
  const p = data[(await params).policy];
  return p ? { title: { absolute: p.title }, alternates: { canonical: `/${(await params).policy}` }, robots: { index: true } } : {};
}

export default async function PolicyPage({ params }: PageProps<"/[policy]">) {
  const { policy } = await params;
  const p = data[policy];
  if (!p) notFound();
  const [first, ...rest] = p.blocks;
  const heading = first?.type === "h" ? first.text : p.title.split("|")[0].trim();
  const blocks = first?.type === "h" ? rest : p.blocks;
  return (
    <>
      <PageHero eyebrow="Legal" title={heading} crumbs={[{ label: heading }]} />
      <section className="py-16 lg:py-24">
        <div className="container-x max-w-3xl">
          <div className="prose-fortius">
            {blocks.map((b, i) =>
              b.type === "list" ? (
                <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
              ) : b.type === "p" ? (
                <p key={i}>{b.text}</p>
              ) : (
                <h2 key={i} className="h-display mt-12 mb-4 text-2xl text-ink sm:text-3xl">{b.text}</h2>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
