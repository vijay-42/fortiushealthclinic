import { homeFaqs } from "@/content/site";
import { Hero } from "@/components/sections/hero";
import { AboutIntro } from "@/components/sections/about-intro";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CareFinder } from "@/components/sections/care-finder";
import { ConditionsTabs } from "@/components/sections/conditions-tabs";
import { Accolades } from "@/components/sections/accolades";
import { PatientServices } from "@/components/sections/patient-services";
import { DoctorSpotlight } from "@/components/sections/doctor-spotlight";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";
import { BlogGrid } from "@/components/sections/blog-grid";
import { FaqEnquiry } from "@/components/sections/faq-enquiry";
import { Branches } from "@/components/sections/branches";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ServicesGrid />
      <Accolades />
      <CareFinder />
      <ConditionsTabs />
      <PatientServices />
      <DoctorSpotlight />
      <TestimonialsMarquee />
      <BlogGrid />
      <FaqEnquiry faqs={homeFaqs} />
      <Branches />
    </>
  );
}
