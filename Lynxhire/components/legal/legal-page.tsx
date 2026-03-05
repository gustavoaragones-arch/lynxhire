interface Section {
  heading: string;
  content: string | string[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  effectiveDate: string;
  intro?: string;
  sections: Section[];
}

export function LegalPage({
  title,
  lastUpdated,
  effectiveDate,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <article className="prose-legal pt-28">
      <div className="mb-8 border-b border-neutral-100 pb-6">
        <h1 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
          {title}
        </h1>
        <div className="flex gap-4 text-xs text-neutral-500">
          <span>Effective: {effectiveDate}</span>
          <span>Last updated: {lastUpdated}</span>
        </div>
        {intro && (
          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            {intro}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-heading text-lg font-semibold text-neutral-900 mb-3">
              {section.heading}
            </h2>
            {Array.isArray(section.content) ? (
              <ul className="space-y-2">
                {section.content.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm leading-relaxed text-neutral-500"
                  >
                    <span className="mt-1 flex-shrink-0 text-[#FF6B2B]">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-500">
                {section.content}
              </p>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-neutral-100 pt-6">
        <p className="text-xs text-neutral-500">
          LynxHire is operated by Albor Digital LLC. Governing law: Alberta,
          Canada. Questions? Contact{" "}
          <a
            href="mailto:legal@lynxhire.ca"
            className="text-[#FF6B2B] hover:underline"
          >
            legal@lynxhire.ca
          </a>
        </p>
      </div>
    </article>
  );
}
