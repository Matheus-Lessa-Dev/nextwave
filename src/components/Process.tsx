import { ArrowRight } from "lucide-react";
import type { SiteContent } from "@/i18n/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process({ site }: { site: SiteContent }) {
  const content = site.process;

  return (
    <section id="processo" className="section" aria-labelledby="process-title">
      <div className="container">
        <div>
          <Reveal><SectionHeading id="process-title" {...content} /></Reveal>
          <ol className="process-grid">
            {content.items.map((step, index) => (
              <Reveal as="li" key={step.title} index={index}>
                <div className="process-top">
                  <span className="step-number" aria-hidden="true">0{index + 1}</span>
                  {index < content.items.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
