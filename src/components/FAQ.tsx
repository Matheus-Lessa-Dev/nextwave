import { Plus } from "lucide-react";
import type { SiteContent } from "@/i18n/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ({ site }: { site: SiteContent }) {
  const content = site.faq;

  return (
    <section id="faq" className="section faq-section" aria-labelledby="faq-title">
      <div className="container">
        <Reveal className="faq-layout">
          <SectionHeading id="faq-title" {...content} />
          <div className="faq-list">
            {content.items.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}<Plus size={20} aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
