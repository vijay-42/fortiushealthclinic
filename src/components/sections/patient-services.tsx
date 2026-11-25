import Image from "next/image";
import { patientServices } from "@/content/site";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealItem, Stagger } from "@/components/ui/reveal";

export function PatientServices() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-lime-50 p-6 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-lime/30 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <span className="eyebrow bg-white">{patientServices.eyebrow}</span>
              <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl">{patientServices.title}</h2>
              <p className="mt-5 text-lg text-muted">{patientServices.text}</p>
              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl">
                <Image src="/images/team/reception-team.png" alt="Fortius reception team" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
              </div>
            </Reveal>
            <div>
              <Stagger className="grid gap-4 sm:grid-cols-2">
                {patientServices.items.map((it, i) => (
                  <RevealItem key={it.title} className={i === 4 ? "sm:col-span-2" : ""}>
                    <div className="group flex h-full items-center gap-4 rounded-3xl bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-lime transition duration-500 group-hover:rotate-[-8deg] group-hover:bg-lime group-hover:text-ink">
                        <Icon name={it.icon} className="size-6" />
                      </span>
                      <span className="text-lg font-bold leading-snug">{it.title}</span>
                    </div>
                  </RevealItem>
                ))}
              </Stagger>
              <Reveal delay={0.2}><p className="mt-6 leading-relaxed text-muted">{patientServices.footnote}</p></Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
