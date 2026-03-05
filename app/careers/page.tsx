import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers at LynxHire',
  description: "We're not hiring yet — but we're growing. Check back soon.",
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <section className="pt-36 pb-20 max-w-md text-center">
        <p className="text-5xl mb-6">🌱</p>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">
          We&apos;re growing
        </h1>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          LynxHire is an early-stage platform and we don&apos;t have open roles yet.
          Check back as we grow — or reach out if you&apos;re excited about what we&apos;re building.
        </p>
        <Link
          href="mailto:hello@lynxhire.ca"
          className="inline-block bg-gradient-to-b from-neutral-700 to-neutral-900 text-white px-7 py-3 rounded-xl text-sm font-medium shadow-sm hover:from-neutral-800 hover:to-black transition-all duration-200"
        >
          Say Hello
        </Link>
      </section>
    </main>
  )
}
