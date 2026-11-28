import { ArrowRight, GraduationCap, UserRound } from "lucide-react";
import Image from "next/image";
import { doctor, team } from "@/content/site";
import { Reveal, RevealItem, Stagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Float, ImageReveal } from "@/components/ui/fx";

export function DoctorSpotlight({ showTeam = true }: { showTeam?: boolean }) {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading align="center" title={<>Consult an Experienced Sexologist in Bangalore <span className="text-accent">for Sexual Wellness</span></>} titleClassName="lg:text-[2.9rem]! lg:leading-[1.1]!" className="mb-14 lg:mb-20" />
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="relative">
            <span aria-hidden className="absolute -top-5 -left-5 hidden size-40 rounded-xl bg-lime-100 lg:block" />
            <span aria-hidden className="absolute -right-5 -bottom-5 hidden size-40 rounded-xl bg-orange/20 lg:block" />
            <ImageReveal className="aspect-square rounded-xl bg-mist">
              <Image src={doctor.awardImage} alt={`${doctor.name} at an award ceremony`} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            </ImageReveal>
            <Float className="absolute -bottom-6 left-6 right-6 sm:right-auto" y={6}>
              <div className="glass flex items-center gap-4 rounded-lg p-4 shadow-lift">
                <Image src={doctor.image} alt="" width={56} height={56} className="size-14 rounded-lg object-cover" />
                <div><p className="font-bold">{doctor.name}</p><p className="text-sm text-muted">{doctor.role}</p></div>
              </div>
            </Float>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">About the Doctor</span>
            <h3 className="h-display mt-5 text-5xl leading-none sm:text-6xl">{doctor.name}</h3>
            <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-mist px-4 py-2 text-sm font-bold text-ink-soft"><GraduationCap className="size-4 text-lime-700" /> {doctor.credentials}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{doctor.bio}</p>
            <div className="mt-8"><Button href="/doctors" variant="dark">More about Dr. Jameel <ArrowRight className="size-4" /></Button></div>
          </Reveal>
        </div>

        {showTeam && (
          <div className="mt-28">
            <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="eyebrow">Our team</span>
                <h3 className="h-display mt-4 text-4xl sm:text-5xl">Best Counselor Teams</h3>
              </div>
              <p className="max-w-md text-muted">Qualified Doctors for your service always, in order to make your process success.</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-3">
              {team.map((m) => (
                <RevealItem key={m.name}>
                  <div className="group overflow-hidden rounded-xl border border-line bg-white">
                    <div className="relative aspect-[4/3.4] overflow-hidden bg-cream">
                      {m.image ? (
                        <Image src={m.image} alt={m.name} fill sizes="(min-width:640px) 30vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="grid size-full place-items-center"><UserRound className="size-24 text-lime-700/40" strokeWidth={1.2} /></div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-xl font-bold">{m.name}</p>
                      <p className="text-muted">{m.role}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        )}
      </div>
    </section>
  );
}
