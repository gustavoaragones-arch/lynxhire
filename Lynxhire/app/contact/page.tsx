import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact LynxHire',
  description: 'Get in touch with the LynxHire team. We respond within 1 business day.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="font-heading font-bold text-foreground text-4xl mb-3">
          Contact Us
        </h1>
        <p className="text-muted-foreground mb-10">
          We typically respond within 1 business day.
        </p>

        <form
          action="https://formsubmit.co/support@lynxhire.ca"
          method="POST"
          className="space-y-5"
        >
          {/* Honeypot spam prevention */}
          <input type="text" name="_honey" className="hidden" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New LynxHire Contact Form Submission" />
          <input type="hidden" name="_next" value="https://www.lynxhire.ca/contact?sent=true" />

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
            <select
              name="subject"
              required
              className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Select a topic</option>
              <option value="General Question">General Question</option>
              <option value="Employer Support">Employer Support</option>
              <option value="Candidate Support">Candidate Support</option>
              <option value="Billing">Billing</option>
              <option value="Privacy / Data Request">Privacy / Data Request</option>
              <option value="Report an Issue">Report an Issue</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="How can we help?"
              className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:bg-primary/90 transition-all"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 border-t border-border pt-8 space-y-2 text-sm text-muted-foreground">
          <p>Legal: <a href="mailto:legal@lynxhire.ca" className="text-foreground">legal@lynxhire.ca</a></p>
          <p>Privacy: <a href="mailto:privacy@lynxhire.ca" className="text-foreground">privacy@lynxhire.ca</a></p>
          <p>Safety: <a href="mailto:safety@lynxhire.ca" className="text-foreground">safety@lynxhire.ca</a></p>
        </div>
      </div>
    </main>
  )
}
