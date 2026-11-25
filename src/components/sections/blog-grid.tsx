import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { site } from "@/content/site";
import { getLatestPosts } from "@/lib/blog";
import { RevealItem, Stagger } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export async function BlogGrid() {
  const posts = await getLatestPosts(6);
  const [lead, ...rest] = posts;
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Latest news" title={<>Browse our <span className="text-lime-700">articles</span></>} />
          <Button href={site.blogUrl} external variant="outline">Visit the blog <ArrowUpRight className="size-4" /></Button>
        </div>
        <Stagger className="mt-14 grid gap-6 lg:grid-cols-2">
          {lead && (
            <RevealItem className="lg:row-span-2">
              <a href={lead.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-cream">
                <div className="relative aspect-[16/9] overflow-hidden">
                  {lead.image && <Image src={lead.image} alt={lead.title} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />}
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <p className="text-xs font-bold tracking-[0.14em] text-lime-700 uppercase">{lead.categories.join(" · ")}</p>
                  <h3 className="h-display mt-3 text-3xl leading-tight group-hover:text-lime-800">{lead.title}</h3>
                  <p className="mt-4 text-muted">{lead.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold">Read article <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </a>
            </RevealItem>
          )}
          <div className="grid gap-4">
            {rest.slice(0, 4).map((p) => (
              <RevealItem key={p.href}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex gap-5 rounded-3xl p-3 transition hover:bg-cream">
                  <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-2xl sm:w-44">
                    {p.image && <Image src={p.image} alt="" fill sizes="180px" className="object-cover transition duration-700 group-hover:scale-110" />}
                  </div>
                  <div className="py-1">
                    <p className="text-[0.7rem] font-bold tracking-[0.14em] text-lime-700 uppercase">{p.categories.join(" · ")}</p>
                    <h3 className="mt-1.5 text-lg leading-snug font-bold group-hover:text-lime-800">{p.title}</h3>
                    <p className="mt-1.5 line-clamp-2 hidden text-sm text-muted sm:block">{p.excerpt}</p>
                  </div>
                </a>
              </RevealItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}
