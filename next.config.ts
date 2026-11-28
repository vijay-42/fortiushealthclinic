import type { NextConfig } from "next";
import { legacyRedirects } from "./src/content/treatments";

const pageRedirects = [
  ["/index.html", "/"],
  ["/about.html", "/about"],
  ["/awards.html", "/awards"],
  ["/gallery.html", "/gallery"],
  ["/testimonial.html", "/testimonials"],
  ["/contact-us.html", "/contact"],
  ["/contact.html", "/contact"],
  ["/privacy-policy.html", "/privacy-policy"],
  ["/terms-and-conditions.html", "/terms-and-conditions"],
  ["/cancellation-and-refund-policy.html", "/cancellation-and-refund-policy"],
  ["/shipping-and-delivery-policy.html", "/shipping-and-delivery-policy"],
] as const;

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "www.fortiushealthclinic.co", pathname: "/blog/wp-content/**" },
      { protocol: "https", hostname: "fortiushealthclinic.b-cdn.net" },
    ],
  },
  async redirects() {
    return [
      ...pageRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...legacyRedirects.map((r) => ({ source: r.from, destination: r.to, permanent: true })),
      { source: "/blog/category/:path*", destination: "/blog", permanent: true },
      { source: "/blog/page/:n", destination: "/blog", permanent: true },
      { source: "/blog/author/:path*", destination: "/blog", permanent: true },
      { source: "/blog/tag/:path*", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
