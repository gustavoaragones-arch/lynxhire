import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers at LynxHire',
  description: "We're not hiring yet — but we're growing. Check back soon.",
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-5xl mb-6">🌱</p>
        <h1 className="font-heading font-bold text-foreground text-3xl mb-3">
          We&apos;re growing
        </h1>
        <p className="text-muted-foreground mb-8">
          LynxHire is an early-stage platform and we don&apos;t have open roles yet.
          Check back as we grow — or reach out if you&apos;re excited about what we&apos;re building.
        </p>
        <Link href="mailto:hello@lynxhire.ca"
          className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all">
          Say Hello
        </Link>
      </div>
    </main>
  )
}
