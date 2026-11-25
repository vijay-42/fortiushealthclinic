import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { doctor, site } from "@/content/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileDock } from "@/components/layout/mobile-dock";
import { BookingProvider } from "@/components/interactive/booking";
import { SearchProvider } from "@/components/interactive/search";
import { DiscreetTitle } from "@/components/interactive/discreet-title";
import { SmoothScroll } from "@/components/interactive/smooth-scroll";
import { JsonLd } from "@/components/ui/json-ld";

const body = Hanken_Grotesk({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const display = Schibsted_Grotesk({ variable: "--font-heading", subsets: ["latin"], display: "swap", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Fortius Health Clinic" },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", images: ["/images/gallery/exterior-2.jpg"] },
  twitter: { card: "summary_large_image", site: "@FortiusClinic" },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0d1f17" };

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/brand/logo.png`,
  image: `${site.url}/images/gallery/exterior-2.jpg`,
  telephone: site.phone.tel,
  email: site.emails[0],
  medicalSpecialty: ["Urologic", "Sexual health"],
  address: { "@type": "PostalAddress", streetAddress: "#7/5, Clarke Road, Richards Town", addressLocality: "Bangalore", postalCode: "560005", addressRegion: "Karnataka", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 13.0048263, longitude: 77.617135 },
  department: [{ "@type": "MedicalClinic", name: `${site.name} — HSR Layout`, telephone: "+919686759649", address: { "@type": "PostalAddress", streetAddress: "No.133/1, 10th main, 14th cross, 6th sector, HSR Layout", addressLocality: "Bangalore", postalCode: "560102", addressCountry: "IN" } }],
  founder: { "@type": "Physician", name: doctor.name, description: doctor.credentials },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${body.variable} ${display.variable}`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white">
          Skip to content
        </a>
        <JsonLd data={clinicSchema} />
        <SearchProvider>
          <BookingProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileDock />
          </BookingProvider>
        </SearchProvider>
        <SmoothScroll />
        <DiscreetTitle />
      </body>
    </html>
  );
}
