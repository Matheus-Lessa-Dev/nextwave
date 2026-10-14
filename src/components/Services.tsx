import { Globe2, Layers3, MousePointer2, Wrench } from "lucide-react";
import type { SiteContent } from "@/i18n/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { AmbientLight } from "@/components/ui/AmbientLight";

const icons = {
  landing: MousePointer2,
  website: Globe2,
  redesign: Layers3,
  maintenance: Wrench,
};

export function Services({ site }: { site: SiteContent }) {
  const content = site.services;

  return (
    <section id="servicos" className="section" aria-labelledby="services-title">
      <div className="container">
        <div>
          <Reveal><SectionHeading id="services-title" {...content} /></Reveal>
          <div className="services-grid">
            {content.items.map((service, index) => {
              const Icon = icons[service.icon];
              return (
                <Reveal as="article" key={service.icon} className="service-card" index={index}>
                  <AmbientLight variant="card" />
                  <div className="flex items-center justify-between">
                    <span className="service-icon">
                      <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="card-number" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="tags">
                    {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <WhatsAppButton site={site}
                    variant="text"
                    message={service.whatsappMessage}
                    className="service-cta"
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
