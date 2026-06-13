import Link from "next/link";
import { ScrollText } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms governing PAL's Academy tutoring services — scheduling, monthly payment, rescheduling, and use of the student portal across the Greater Toronto Area.",
  path: "/terms"
});

const updated = "May 1, 2025";

const sections = [
  {
    h: "1. Agreement to these terms",
    p: [
      "These Terms of Service (“Terms”) govern your use of the PAL's Academy website, booking process, and student portal, and the tutoring services we provide. By booking a consultation, creating a portal account, or using our services, you agree to these Terms. If you are booking on behalf of a student under the age of majority, you do so as their parent or guardian and accept these Terms on their behalf."
    ]
  },
  {
    h: "2. Our services",
    p: [
      "PAL's Academy provides private tutoring for Grade 9–12 and first-year university students, delivered in live one-on-one or small-group sessions over Google Meet. We match each student with a verified tutor and support learning through the student portal — classes, assignments, deadlines, and messaging.",
      "We strive for measurable academic progress, but we do not guarantee any specific grade, score, or admission outcome. Results depend on many factors, including student effort and attendance."
    ]
  },
  {
    h: "3. Consultations & enrolment",
    p: [
      "The initial consultation is free and carries no obligation. Tutoring begins once a package is selected and the first payment is confirmed. We aim to match a tutor within 48 hours of enrolment."
    ]
  },
  {
    h: "4. Pricing & payment",
    p: [
      "All prices are listed in Canadian dollars and are billed monthly, in advance, via Interac e-Transfer (PayPal available as a backup). No sessions are scheduled until payment for the upcoming period is confirmed.",
      "Optional PAL's Plus add-ons are billed month-to-month and may be paused or removed at any time. Prices may change with reasonable notice; changes never affect a period you have already paid for."
    ]
  },
  {
    h: "5. Scheduling, rescheduling & cancellation",
    list: [
      "Sessions follow a recurring weekly schedule agreed with your tutor.",
      "Standard rescheduling is free with at least 48 hours' notice. With less than 48 hours' notice, that week's session is forfeited.",
      "Families with the Flex Reschedule add-on may reschedule with as little as 12 hours' notice, up to twice per month.",
      "You may cancel your enrolment at any time before your next billing date; cancellation stops future billing and is not retroactive."
    ]
  },
  {
    h: "6. Student portal accounts",
    p: [
      "Portal access is limited to verified members and is granted after admin approval. You are responsible for keeping your login credentials confidential and for all activity under your account. Notify us immediately if you suspect unauthorized use.",
      "We may suspend or remove accounts that are shared improperly, used for abusive or unlawful purposes, or that violate these Terms."
    ]
  },
  {
    h: "7. Acceptable use & conduct",
    p: [
      "We expect a respectful learning environment. You agree not to harass tutors or other members, share another member's private information, disrupt sessions, or use the portal or messaging tools for anything unlawful, abusive, or unrelated to tutoring. Content submitted to the portal must be your own work or properly attributed."
    ]
  },
  {
    h: "8. Intellectual property",
    p: [
      "Lesson materials, worksheets, and resources we create remain the property of PAL's Academy or the relevant tutor and are provided for the personal, educational use of enrolled students. They may not be resold or redistributed. Work a student submits remains the student's own."
    ]
  },
  {
    h: "9. Tutors",
    p: [
      "Tutors are screened and verified before being matched with students. Tutors agree to maintain professionalism, confidentiality, and the academic standards of the academy. Applying to tutor does not guarantee placement."
    ]
  },
  {
    h: "10. Limitation of liability",
    p: [
      "To the fullest extent permitted by law, PAL's Academy is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability for any claim is limited to the amount you paid us for services in the month the claim arose."
    ]
  },
  {
    h: "11. Changes & governing law",
    p: [
      "We may update these Terms from time to time; the “last updated” date above reflects the current version, and continued use after changes constitutes acceptance. These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein."
    ]
  }
];

export default function TermsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-20 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300 inline-flex items-center gap-2">
              <ScrollText className="h-4 w-4" /> Terms of Service
            </div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl">
              Clear terms, <span className="text-gradient-gold italic">fairly written.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              The straightforward agreement that covers tutoring, scheduling, payment, and your
              use of the student portal.
            </p>
            <p className="mt-4 text-xs uppercase tracking-wider2 text-gold-300">
              Last updated · {updated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-ivory py-20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl space-y-12">
            {sections.map((s) => (
              <Reveal key={s.h}>
                <div>
                  <h2 className="font-serif text-2xl text-ink-800">{s.h}</h2>
                  {s.p?.map((para, i) => (
                    <p key={i} className="mt-3 text-[15px] leading-relaxed text-ink-600">
                      {para}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-4 space-y-2">
                      {s.list.map((li) => (
                        <li
                          key={li}
                          className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-600"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-ivory p-7">
                <h2 className="font-serif text-2xl text-ink-800">Need a hand?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  Questions about these Terms? Email{" "}
                  <a
                    href="mailto:palseduacademy@gmail.com"
                    className="font-medium text-ink-800 underline decoration-gold-400 underline-offset-4 hover:text-ink-900"
                  >
                    palseduacademy@gmail.com
                  </a>
                  . See also our{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-ink-800 underline decoration-gold-400 underline-offset-4 hover:text-ink-900"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
