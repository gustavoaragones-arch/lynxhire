import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press — LynxHire',
  description: 'Press inquiries for LynxHire, the Canadian AI-powered job platform.',
}

export default function PressPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-5xl mb-6">📰</p>
        <h1 className="font-heading font-bold text-foreground text-3xl mb-3">
          Press & Media
        </h1>
        <p className="text-muted-foreground mb-2">
          For press inquiries, interview requests, or media assets, contact us directly.
        </p>
        <p className="text-muted-foreground mb-8">
          We respond to media requests within 24 hours.
        </p>
        <a href="mailto:press@lynxhire.ca"
          className="px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all">
          press@lynxhire.ca
        </a>
      </div>
    </main>
  )
}
