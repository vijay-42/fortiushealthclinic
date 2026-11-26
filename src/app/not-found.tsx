import Link from "next/link";
import { treatments } from "@/content/treatments";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="h-display text-[8rem] leading-none text-lime-300">404</p>
      <h1 className="h-display mt-4 text-4xl">Oops! That page can’t be found.</h1>
      <p className="mt-4 text-muted">It may have moved during our redesign. Try one of these:</p>
      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
        <Link href="/" className="rounded-md bg-lime-700 px-5 py-2.5 font-semibold text-white">Go to Home</Link>
        {treatments.slice(0, 6).map((t) => (
          <Link key={t.slug} href={`/treatments/${t.slug}`} className="rounded-md border border-line px-5 py-2.5 font-semibold">{t.name}</Link>
        ))}
      </div>
    </section>
  );
}
