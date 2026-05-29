import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PAL's Academy collects, uses, and protects the personal information of students, parents, and tutors.",
  alternates: { canonical: "/privacy" }
};

const updated = "May 1, 2025";

const sections = [
  {
    h: "1. Who we are",
    p: [
      "PAL's Academy (“PAL's Academy,” “we,” “us,” or “our”) is a private tutoring service operating in the Greater Toronto Area. This Privacy Policy explains how we handle personal information collected through our website, our booking process, and our student portal.",
      "We can be reached at any time at palseduacademy@gmail.com with questions about this policy or your information."
    ]
  },
  {
    h: "2. Information we collect",
    p: [
      "We only collect what we need to deliver tutoring and run the business. This includes:"
    ],
    list: [
      "Contact details you provide — name, email address, and phone number.",
      "Consultation details — the student's grade level, subjects, and academic goals you share when booking a free consultation.",
      "Portal account data — your name, email, hashed password, role (student, parent, tutor, or admin), and approval status.",
      "Learning activity — classes, assignments, submissions, and messages created inside the student portal.",
      "Tutor applications — education, experience, availability, and any documents submitted when applying to tutor with us.",
      "Basic technical data — standard server logs needed to keep the site secure and working."
    ]
  },
  {
    h: "3. How we use it",
    p: ["We use personal information to:"],
    list: [
      "Schedule and deliver tutoring sessions and respond to your enquiries.",
      "Operate the student portal — classes, assignments, deadlines, and messaging.",
      "Match students with verified tutors and review tutor applications.",
      "Send service communications such as confirmations, reminders, and progress notes.",
      "Process payments and keep accurate billing records.",
      "Protect the security and integrity of our service."
    ]
  },
  {
    h: "4. Children & student privacy",
    p: [
      "Many of our students are under the age of majority. Where a student is a minor, a parent or guardian books the consultation and consents to the student's participation. Parents may request access to, correction of, or deletion of their child's information at any time by contacting us.",
      "We never sell student information, and we do not use student data for advertising."
    ]
  },
  {
    h: "5. How we share information",
    p: [
      "We do not sell personal information. We share it only as needed to run the service:"
    ],
    list: [
      "With the verified tutor assigned to a student, limited to what is needed to teach.",
      "With trusted service providers — for example scheduling (Calendly), video sessions (Google Meet), and email delivery — who process data on our behalf.",
      "When required by law, or to protect the rights, safety, and property of our students, tutors, or the academy."
    ]
  },
  {
    h: "6. How we protect it",
    p: [
      "Portal passwords are stored only as salted hashes — never in plain text. Access to student records is restricted to the assigned tutor and academy administrators. We use reasonable administrative and technical safeguards appropriate to the sensitivity of the information.",
      "No system is perfectly secure, but we work to limit what we collect and who can see it."
    ]
  },
  {
    h: "7. Retention",
    p: [
      "We keep personal information for as long as you have an active relationship with us, and afterward only as long as needed for legitimate business or legal purposes. You may ask us to delete your account and associated information at any time."
    ]
  },
  {
    h: "8. Your choices & rights",
    p: [
      "Subject to applicable Canadian privacy law (including PIPEDA), you may request access to the personal information we hold about you, ask us to correct it, or ask us to delete it. You can also unsubscribe from non-essential emails at any time. To make a request, email palseduacademy@gmail.com and we will respond within a reasonable timeframe."
    ]
  },
  {
    h: "9. Changes to this policy",
    p: [
      "We may update this policy from time to time. When we do, we will revise the “last updated” date above. Material changes will be communicated through the portal or by email where appropriate."
    ]
  }
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-hero pt-40 pb-20 text-ivory">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-25" />
        <div className="bg-radial-gold pointer-events-none absolute inset-0" />
        <div className="container-luxe relative">
          <Reveal>
            <div className="eyebrow text-gold-300 inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Privacy
            </div>
            <h1 className="display mt-6 max-w-4xl text-balance text-5xl sm:text-6xl">
              Your information, <span className="text-gradient-gold italic">handled with care.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-ink-100/90">
              We collect only what we need to tutor well, we never sell it, and we keep student
              data private to the people who teach it.
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
                  {s.p.map((para, i) => (
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
                <h2 className="font-serif text-2xl text-ink-800">Questions?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  Email{" "}
                  <a
                    href="mailto:palseduacademy@gmail.com"
                    className="font-medium text-ink-800 underline decoration-gold-400 underline-offset-4 hover:text-ink-900"
                  >
                    palseduacademy@gmail.com
                  </a>{" "}
                  and we&rsquo;ll be glad to help. You can also review our{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-ink-800 underline decoration-gold-400 underline-offset-4 hover:text-ink-900"
                  >
                    Terms of Service
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
