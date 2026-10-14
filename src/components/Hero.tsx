import { ArrowDownRight, ArrowRight, Check, Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import type { SiteContent } from "@/i18n/types";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { AmbientLight } from "@/components/ui/AmbientLight";

export function Hero({ site }: { site: SiteContent }) {
  const content = site.hero;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <AmbientLight variant="hero" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="hero-eyebrow"><span className="status-dot" />{content.eyebrow}</p>
          <h1 id="hero-title">{content.title}<br /><span>{content.highlight}</span></h1>
          <p className="hero-description">{content.description}</p>
          <div className="hero-actions">
            <WhatsAppButton site={site} />
            <a className="button button-ghost" href="#projetos">
              {content.secondaryCta}<ArrowRight className="button-arrow" size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-note">{content.note}</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" data-ambient-depth="0.45" />
          <div className="orbit orbit-two" data-ambient-depth="-0.35" />
          <div className="wave-sculpture" data-ambient-depth="0.8">
            {Array.from({ length: 19 }, (_, index) => (
              <span key={index} style={{ "--i": index } as CSSProperties} />
            ))}
          </div>
          <span className="art-spark art-spark-one" data-ambient-depth="1">+</span>
          <span className="art-spark art-spark-two" data-ambient-depth="-0.6">+</span>
          <div className="art-label">
            <Sparkles size={16} />{content.visualLabel}<ArrowDownRight size={16} />
          </div>
        </div>
      </div>
      <div className="container">
        <ul className="hero-principles">
          {content.principles.map((item) => (
            <li key={item}><Check size={15} aria-hidden="true" />{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
