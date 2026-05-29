import Link from "next/link";
import Monogram from "@/components/ui/Monogram";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-hero text-ivory">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
      <div className="bg-radial-gold pointer-events-none absolute inset-0" />
      <div className="container-luxe relative flex min-h-[100svh] items-center justify-center py-32">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center justify-center gap-3">
            <Monogram tone="gold" className="h-10 w-10" />
            <div className="font-serif text-2xl">PAL&rsquo;s Academy</div>
          </Link>
          <div className="rounded-3xl border border-ivory/10 bg-ink-700/40 p-8 backdrop-blur-md shadow-luxe">
            {children}
          </div>
          <p className="mt-6 text-center text-[10px] uppercase tracking-wider2 text-ivory/40">
            Verified members only · Admin-approved access
          </p>
        </div>
      </div>
    </section>
  );
}
