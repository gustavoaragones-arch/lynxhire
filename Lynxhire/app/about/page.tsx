import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About LynxHire',
  description: 'LynxHire is a Canadian AI-powered job platform built to connect quality employers with verified talent across Canada.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading font-bold text-foreground text-4xl mb-6">
          About LynxHire
        </h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-muted-foreground text-base leading-relaxed">
          <p>
            LynxHire is a Canadian job platform built for the way hiring actually works in 2026 —
            fast, intelligent, and focused on quality over volume.
          </p>
          <p>
            We use AI to match employers with candidates who genuinely fit the role, cutting through
            resume spam and saving hundreds of hours in the hiring process. Candidates get matched
            to jobs that suit their skills, location, and work preferences — not just keyword hits.
          </p>
          <p>
            LynxHire is built and operated by <strong className="text-foreground">Albor Digital LLC</strong>,
            a software company focused on building tools that solve real problems for Canadian businesses
            and workers.
          </p>
          <p>
            We&apos;re headquartered in Alberta, Canada. All data is handled in compliance with PIPEDA,
            Canada&apos;s federal privacy law.
          </p>

          <div className="border-t border-border pt-6 mt-8">
            <h2 className="font-heading font-semibold text-foreground text-xl mb-3">Our Mission</h2>
            <p>
              To make hiring in Canada faster, fairer, and less frustrating — for both sides of the table.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-heading font-semibold text-foreground text-xl mb-3">Contact</h2>
            <p>
              Questions? Reach us at{' '}
              <a href="mailto:hello@lynxhire.ca" className="text-foreground underline underline-offset-4">
                hello@lynxhire.ca
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-3">
          <Link href="/jobs"
            className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all">
            Browse Jobs
          </Link>
          <Link href="/contact"
            className="px-5 py-2.5 border border-border text-foreground font-medium rounded-xl text-sm hover:bg-muted transition-all">
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  )
}
