import type { Metadata } from "next";
import { gallery } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { GalleryGrid } from "@/components/interactive/gallery-grid";

export const metadata: Metadata = { title: "Gallery", description: "Take a look inside Fortius Health Clinic, Bangalore — our clinic interiors, exterior and awards.", alternates: { canonical: "/gallery" } };

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title={<>Visit our <span className="text-lime">clinic</span></>} text="A calm, private and modern space designed around your comfort and confidentiality." image="/images/gallery/interior-2.jpg" crumbs={[{ label: "Gallery" }]} />
      <section className="py-16 lg:py-24"><div className="container-x"><GalleryGrid images={gallery} /></div></section>
    </>
  );
}
