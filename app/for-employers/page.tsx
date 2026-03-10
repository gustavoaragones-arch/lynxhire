import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Precision Recruitment for Canadian SMEs — LynxHire for Employers',
  description: 'Reduce resume spam for Canadian employers with AI-powered recruitment Canada. Skilled trades hiring platform and skills-based matching software. Automated candidate screening and verified candidate matching for qualified talent acquisition.',
  keywords: ['precision recruitment for Canadian SMEs', 'reduce resume spam for Canadian employers', 'AI-powered recruitment Canada', 'skilled trades hiring platform', 'skills-based matching software', 'automated candidate screening for Canadian businesses', 'verified candidate matching Alberta', 'ethical AI hiring tools Canada'],
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
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="border border-neutral-200 text-neutral-500 text-xs rounded-full px-4 py-1.5 mb-8 inline-flex">
            For Canadian Employers
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight tracking-tight">
            Hire faster with<br />
            <span className="bg-gradient-to-b from-[rgba(255,167,86,1)] to-[rgba(238,96,44,1)] bg-clip-text text-transparent">AI-powered matching</span>
          </h1>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Reduce resume spam for Canadian employers. LynxHire surfaces qualified talent with skills-based matching — ranked by AI match score.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/auth/signup"
              className="bg-gradient-to-b from-neutral-700 to-neutral-900 text-white px-7 py-3 rounded-xl text-sm font-medium shadow-sm hover:from-neutral-800 hover:to-black transition-all duration-200">
              Post Your First Job Free
            </Link>
            <Link href="/pricing"
              className="border border-neutral-200 text-neutral-700 px-7 py-3 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-all duration-200">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <div className="text-center pb-6">
        <p className="text-sm font-semibold text-neutral-400 tracking-wide uppercase">
          Trusted by Industry Leaders
        </p>
      </div>

      {/* Features */}
      <section className="py-20 px-4 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Features so good you&apos;ll{' '}
              <span className="text-[#FF6B2B]">Love us</span>
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Built for Canadian employers and job seekers, we&apos;re showing you the top features that make hiring and job searching actually work.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map(f => (
              <div key={f.title} className="bg-[#F9FAFB] rounded-2xl p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FF6B2B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-[#FF6B2B]" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm mb-1">{f.title}</p>
                    <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-built AI Integration section */}
      <section className="py-20 px-4 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            In built{' '}
            <span className="text-[#FF6B2B]">AI Integration</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto mb-14">
            With AI transforming recruitment, we&apos;ve integrated it where it matters most: intelligent matching, smart job descriptions, and automated candidate ranking that actually works.
          </p>
          <div className="grid md:grid-cols-3 gap-5 text-left">
            {[
              {
                title: 'AI Job Description Builder',
                desc: 'Generate professional, inclusive job postings in seconds. Just input the role and requirements, then edit and publish.',
              },
              {
                title: 'Transparent Pricing',
                desc: 'We offer straightforward pricing built for Canadian SMEs. No hidden fees, no pay-per-click traps, just affordable access to quality candidates.',
              },
              {
                title: 'Collaborative Hiring',
                desc: 'With built-in team features, invite hiring managers, share candidate notes, use scorecards, and make better hiring decisions together.',
              },
            ].map(card => (
              <div key={card.title} className="bg-[#F9FAFB] rounded-2xl p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
                <h3 className="font-bold text-neutral-900 mb-2">{card.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* vs competitors */}
      <section className="py-20 px-4 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Precision recruitment for Canadian SMEs
          </h2>
          <p className="text-neutral-500 mb-12 max-w-xl mx-auto">
            Indeed charges per click with no quality guarantee. LinkedIn is expensive and built for networking, not hiring.
            LynxHire is a flat subscription for qualified talent acquisition Canada—automated candidate screening without the spam.
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[
              { label: 'LynxHire', highlight: true, items: ['Flat monthly fee', 'AI match scoring', 'Canadian-first filters', 'Built-in ATS included'] },
              { label: 'Indeed', highlight: false, items: ['Pay per click', 'No match scoring', 'Generic filters', 'ATS costs extra'] },
              { label: 'LinkedIn', highlight: false, items: ['Premium pricing', 'Networking focus', 'US-centric', 'Job slots limited'] },
            ].map(col => (
              <div key={col.label}
                className={`rounded-2xl p-5 text-left ${col.highlight ? 'border border-[#FF6B2B]/30 bg-[#FF6B2B]/5' : 'bg-[#F9FAFB] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'}`}>
                <p className={`font-bold mb-3 ${col.highlight ? 'text-[#FF6B2B]' : 'text-neutral-900'}`}>{col.label}</p>
                {col.items.map(item => (
                  <p key={item} className="text-neutral-500 text-xs mb-1.5">{item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-neutral-100 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral-900 mb-3">
            Ready to hire smarter?
          </h2>
          <p className="text-neutral-500 mb-8">
            Start free with 1 job posting. No credit card required.
          </p>
          <Link href="/auth/signup"
            className="inline-block bg-gradient-to-b from-neutral-700 to-neutral-900 text-white px-8 py-3 rounded-xl text-sm font-medium shadow-sm hover:from-neutral-800 hover:to-black transition-all duration-200">
            Get Started Free
          </Link>
        </div>
      </section>

    </main>
  )
}
