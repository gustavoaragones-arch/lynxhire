import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hire in Canada with AI — LynxHire for Employers',
  description: 'Post jobs, get AI-matched candidates, and hire faster. LynxHire helps Canadian employers find verified talent without the noise.',
}

const features = [
  { title: 'Post a job in 3 minutes', desc: 'AI generates a professional job description from your bullet points. Edit, publish, done.' },
  { title: 'AI candidate matching', desc: 'Every applicant gets a 0–100% match score based on skills, experience, location, and work authorization.' },
  { title: 'Built-in ATS', desc: 'Track applicants through New → Reviewed → Interview → Offer stages. No spreadsheets needed.' },
  { title: 'Canadian-first filters', desc: 'Filter by province, work authorization (citizen, PR, work permit), and salary range in CAD.' },
  { title: 'In-platform messaging', desc: 'Contact candidates directly without exposing email addresses on either side.' },
  { title: 'Flat monthly pricing', desc: 'No per-click fees. No surprise charges. One subscription, unlimited applications.' },
]

export default function ForEmployersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-4 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full border border-border text-muted-foreground mb-6">
            For Canadian Employers
          </div>
          <h1 className="font-heading font-bold text-foreground text-5xl mb-5 leading-tight">
            Hire faster with<br />
            <span style={{ color: 'var(--primary)' }}>AI-powered matching</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Stop sifting through hundreds of unqualified resumes.
            LynxHire surfaces the candidates who actually fit — ranked by AI match score.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/auth/signup"
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all">
              Post Your First Job Free
            </Link>
            <Link href="/pricing"
              className="px-6 py-3 border border-border text-foreground font-medium rounded-xl text-sm hover:bg-muted transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-foreground text-2xl text-center mb-12">
            Everything you need to hire in Canada
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: 'var(--primary)' }}>
                    <Check size={11} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{f.title}</p>
                    <p className="text-muted-foreground text-sm">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs competitors */}
      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-foreground text-2xl mb-4">
            Why not Indeed or LinkedIn?
          </h2>
          <p className="text-muted-foreground mb-8">
            Indeed charges per click with no quality guarantee. LinkedIn is expensive and built for networking, not hiring.
            LynxHire is a flat subscription built specifically for Canadian SMBs who need to hire without burning budget.
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[
              { label: 'LynxHire', items: ['Flat monthly fee', 'AI match scoring', 'Canadian-first filters', 'Built-in ATS included'] },
              { label: 'Indeed', items: ['Pay per click', 'No match scoring', 'Generic filters', 'ATS costs extra'] },
              { label: 'LinkedIn', items: ['Premium pricing', 'Networking focus', 'US-centric', 'Job slots limited'] },
            ].map((col, i) => (
              <div key={col.label}
                className={`rounded-2xl p-5 border ${i === 0 ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                <p className={`font-semibold mb-3 ${i === 0 ? 'text-primary' : 'text-foreground'}`}>{col.label}</p>
                {col.items.map(item => (
                  <p key={item} className="text-muted-foreground text-xs mb-1.5">{item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-border text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading font-bold text-foreground text-2xl mb-3">
            Ready to hire smarter?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start free with 1 job posting. No credit card required.
          </p>
          <Link href="/auth/signup"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all">
            Get Started Free
          </Link>
        </div>
      </section>
    </main>
  )
}
