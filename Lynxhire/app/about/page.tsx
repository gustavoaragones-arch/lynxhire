import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About LynxHire',
  description: 'LynxHire is a Canadian AI-powered job platform built to connect quality employers with verified talent across Canada.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-36 pb-20 px-4 text-center border-b border-neutral-100">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-neutral-200 text-neutral-500 text-xs rounded-full px-4 py-1.5 mb-8">
            About Us
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
            Built for Canada.<br />
            <span className="text-[#FF6B2B]">Powered by AI.</span>
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed">
            LynxHire is a Canadian job platform built for the way hiring actually works in 2026 —
            fast, intelligent, and focused on quality over volume.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto space-y-12">

          <div>
            <p className="text-neutral-500 text-base leading-relaxed mb-4">
              We use AI to match employers with candidates who genuinely fit the role, cutting through
              resume spam and saving hundreds of hours in the hiring process. Candidates get matched
              to jobs that suit their skills, location, and work preferences — not just keyword hits.
            </p>
            <p className="text-neutral-500 text-base leading-relaxed">
              LynxHire is built and operated by{' '}
              <strong className="text-neutral-900 font-semibold">Albor Digital LLC</strong>,
              a software company focused on building tools that solve real problems for Canadian businesses
              and workers.
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Our Mission</h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              To make hiring in Canada faster, fairer, and less frustrating — for both sides of the table.
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Privacy & Compliance</h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              We&apos;re headquartered in Alberta, Canada. All data is handled in compliance with PIPEDA,
              Canada&apos;s federal privacy law. We never sell your data.
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Contact</h2>
            <p className="text-neutral-500 text-base mb-1">
              General:{' '}
              <a href="mailto:hello@lynxhire.ca" className="text-neutral-900 underline underline-offset-4">hello@lynxhire.ca</a>
            </p>
            <p className="text-neutral-500 text-base mb-1">
              Privacy:{' '}
              <a href="mailto:privacy@lynxhire.ca" className="text-neutral-900 underline underline-offset-4">privacy@lynxhire.ca</a>
            </p>
            <p className="text-neutral-500 text-base">
              Press:{' '}
              <a href="mailto:press@lynxhire.ca" className="text-neutral-900 underline underline-offset-4">press@lynxhire.ca</a>
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-neutral-100 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Ready to get started?</h2>
          <p className="text-neutral-500 mb-8">Join thousands of Canadian employers and job seekers.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/jobs"
              className="bg-neutral-900 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
              Browse Jobs
            </Link>
            <Link href="/contact"
              className="border border-neutral-200 text-neutral-700 px-7 py-3 rounded-full text-sm font-medium hover:bg-neutral-50 transition-all duration-200">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
