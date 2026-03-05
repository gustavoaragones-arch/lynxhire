import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press — LynxHire',
  description: 'Press inquiries for LynxHire, the Canadian AI-powered job platform.',
}

export default function PressPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <section className="pt-36 pb-20 max-w-md text-center">
        <p className="text-5xl mb-6">📰</p>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">
          Press & Media
        </h1>
        <p className="text-neutral-500 mb-2 leading-relaxed">
          For press inquiries, interview requests, or media assets, contact us directly.
        </p>
        <p className="text-neutral-500 mb-8 leading-relaxed">
          We respond to media requests within 24 hours.
        </p>
        <a
          href="mailto:press@lynxhire.ca"
          className="inline-block bg-neutral-900 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
        >
          press@lynxhire.ca
        </a>
      </section>
    </main>
  )
}
