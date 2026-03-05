// STYLE RULE: Never invent new styles. Always copy from existing template components.
// Buttons: bg-neutral-900 text-white rounded-full (primary) | border border-neutral-200 rounded-full (secondary)
// Orange: #FF6B2B only
// Badge/pill: border border-neutral-200 text-neutral-500 text-xs rounded-full px-4 py-1.5
// Cards: bg-white border border-neutral-100 rounded-2xl shadow-sm
// Body text: text-neutral-500
// Headings: font-bold text-neutral-900
// Page hero top padding: pt-36 minimum (fixed navbar clearance)

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About LynxHire',
  description: 'LynxHire delivers Canadian workforce optimization through precision matching and PIPEDA compliant job board technology. Ethical AI hiring tools for qualified talent acquisition Canada—internal trade labor matching and high-skill immigrant recruitment.',
  keywords: ['Canadian workforce optimization', 'PIPEDA compliant job board', 'precision recruitment for Canadian SMEs', 'ethical AI hiring tools Canada', 'qualified talent acquisition Canada', 'high-skill immigrant recruitment tools', 'internal trade labor matching'],
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-36 pb-20 px-4 text-center border-b border-neutral-100">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[#3D3D3D] text-[22px] font-semibold mb-8">
            About Us
          </p>
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

      {/* Content — no cards, template styles only */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto space-y-12">

          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">
              Precision Matching for the Modern Canadian Workforce
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              In a rapidly evolving labor market, the traditional job board is no longer enough. Canada&apos;s economic strength depends on getting the right people into the right roles—efficiently, ethically, and strategically. LynxHire is an AI-powered ecosystem designed to bridge the gap between talent and opportunity, specifically tailored for the unique needs of the Canadian industry.
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Our Mission</h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              To make hiring in Canada faster, fairer, and focused on high-value results. We are dedicated to reducing &quot;resume spam&quot; and ensuring that Canadian businesses can identify qualified professionals—both locally and through high-skill immigration—without the administrative burnout of traditional recruiting.
            </p>
          </div>

          <div className="border-t border-neutral-100 pt-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Strengthening Canada&apos;s Industry</h2>
            <p className="text-neutral-500 text-base leading-relaxed mb-4">
              We align our technology with the core needs of the Canadian economy:
            </p>
            <ul className="space-y-2 text-neutral-500 text-base leading-relaxed">
              <li className="flex gap-2">
                <span className="text-[#FF6B2B] font-semibold shrink-0">Prioritizing Local Talent:</span>
                <span>Our matching engine is built to support &quot;Canada First&quot; hiring, strengthening internal trade and domestic industries.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF6B2B] font-semibold shrink-0">Quality Over Quantity:</span>
                <span>We move beyond unqualified high-volume applications, focusing instead on precision matching for specialized roles and skilled trades.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF6B2B] font-semibold shrink-0">Data-Driven Immigration:</span>
                <span>We support the integration of highly qualified immigrants whose skills directly match the urgent needs of Canadian employers.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-neutral-100 pt-10">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Governance & Privacy</h2>
            <p className="text-neutral-500 text-base leading-relaxed mb-4">
              LynxHire is developed and operated by <strong className="text-neutral-900 font-semibold">Albor Digital LLC</strong>, a software company dedicated to building high-utility tools for the Canadian business landscape. We believe trust is the foundation of any professional network.
            </p>
            <ul className="space-y-2 text-neutral-500 text-base leading-relaxed">
              <li className="flex gap-2">
                <span className="text-[#FF6B2B] font-semibold shrink-0">Privacy First:</span>
                <span>All data is handled in strict compliance with PIPEDA (Personal Information Protection and Electronic Documents Act), Canada&apos;s federal privacy law.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF6B2B] font-semibold shrink-0">Zero-Data-Selling Policy:</span>
                <span>Your data is a private asset. We never sell user data to third parties.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FF6B2B] font-semibold shrink-0">AI Transparency:</span>
                <span>Our algorithms are designed for fairness and accountability, ensuring a level playing field for every candidate.</span>
              </li>
            </ul>
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
              className="bg-neutral-900 text-white px-7 py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
              Browse Jobs
            </Link>
            <Link href="/contact"
              className="border border-neutral-200 text-neutral-700 px-7 py-3 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-all duration-200">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
