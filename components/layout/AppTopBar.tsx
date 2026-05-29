import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Monogram from "@/components/ui/Monogram";

/**
 * Slim top bar for the authenticated app surfaces (student portal + admin).
 * Deliberately has NO marketing navigation — just the brand mark and a quiet
 * link back out to the public site. Purely presentational (no client hooks),
 * so it renders safely inside both server and client trees.
 */
export default function AppTopBar({
  home,
  label
}: {
  home: string;
  label: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-ivory/90 backdrop-blur-xl">
      <div className="container-luxe flex h-16 items-center justify-between">
        <Link href={home} className="group flex items-center gap-3">
          <Monogram tone="ink" className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[8deg]" />
          <div className="leading-none">
            <div className="font-serif text-lg tracking-tightish text-ink-800">
              PAL&rsquo;s Academy
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wider2 text-gold-600">
              {label}
            </div>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider2 text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-900"
        >
          View site <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}
