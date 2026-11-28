"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { CalendarCheck, ClipboardList, HeartHandshake, MessagesSquare } from "lucide-react";
import { useRef } from "react";
import { useBooking } from "@/components/interactive/booking";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  { icon: CalendarCheck, title: "Book discreetly", text: "Call, WhatsApp or book online. Your details stay strictly private." },
  { icon: MessagesSquare, title: "Private consultation", text: "A one-to-one conversation with Dr. Jameel in a calm, judgement-free room." },
  { icon: ClipboardList, title: "Your personal plan", text: "A clear diagnosis and a treatment plan built around you and your goals." },
  { icon: HeartHandshake, title: "Follow-up & support", text: "Regular reviews and guidance until you feel confident again." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function CareJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const { open } = useBooking();

  return (
    <section className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="Your visit" title={<>Four simple steps to <span className="text-accent">feeling like yourself</span></>} text="From the first call to your last follow-up, every step is private, unhurried and focused on you." />

        <div ref={ref} className="relative mt-16 lg:mt-20">
          {/* track */}
          <div aria-hidden className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-[3px] rounded-full bg-line lg:block">
            <motion.div style={{ scaleX: reduce ? 1 : progress }} className="h-full origin-left rounded-full bg-lime" />
          </div>
          <div aria-hidden className="absolute top-0 bottom-0 left-8 w-[3px] rounded-full bg-line lg:hidden">
            <motion.div style={{ scaleY: reduce ? 1 : progress }} className="h-full origin-top rounded-full bg-lime" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map(({ icon: I, title, text }, i) => (
              <motion.li
                key={title}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease }}
                className="group relative flex gap-6 lg:flex-col lg:items-center lg:text-center"
              >
                <motion.span
                  initial={reduce ? false : { scale: 0.4, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 + i * 0.12 }}
                  className="relative z-10 grid size-16 shrink-0 place-items-center rounded-2xl bg-white text-lime-700 shadow-lift ring-1 ring-line transition duration-500 group-hover:-rotate-6 group-hover:bg-lime group-hover:text-white"
                >
                  <I className="size-7" />
                  <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-orange text-[0.7rem] font-bold text-white">{i + 1}</span>
                </motion.span>
                <div className="pt-2 lg:pt-4">
                  <h3 className="h-display text-2xl">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted lg:mx-auto lg:max-w-[16rem]">{text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex justify-center">
          <Button magnetic onClick={() => open()}><CalendarCheck className="size-5" /> Start with step one</Button>
        </div>
      </div>
    </section>
  );
}
