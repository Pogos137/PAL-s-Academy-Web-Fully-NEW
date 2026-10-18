import type { ReactNode } from "react";
import Link from "next/link";

// Parse inline [label](href) markdown links in content-file copy into nodes.
// Internal links (href starting with "/") use next/link; external links
// (http/https) render as a real anchor that opens in a new tab — used for
// authoritative citations (Ontario curriculum, OUAC, university admissions).
// Shared by the blog, city, and city × subject pages so contextual links in
// any content file render the same way.
const LINK_RE = /\[([^\]]+)\]\(((?:\/|https?:\/\/)[^)]+)\)/g;
const LINK_CLASS =
  "font-medium text-gold-600 underline-offset-4 transition-colors hover:text-gold-700 hover:underline";

export function renderParagraph(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [, label, href] = m;
    const key = `${m.index}-${href}`;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={key} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
