import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate min-h-[80svh] overflow-hidden bg-hero text-ivory">
      <div className="bg-radial-gold pointer-events-none absolute inset-0" />
      <div className="container-luxe relative flex min-h-[80svh] flex-col items-center justify-center text-center">
        <div className="font-serif text-7xl text-gradient-gold">404</div>
        <p className="mt-4 max-w-md text-ink-200">
          The page you&rsquo;re after isn&rsquo;t here. Maybe it never was.
        </p>
        <Link href="/" className="btn btn-gold mt-8">
          Back to home
        </Link>
      </div>
    </section>
  );
}
