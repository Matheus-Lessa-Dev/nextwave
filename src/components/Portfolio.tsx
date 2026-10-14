import { ArrowDownRight, ArrowUpRight, Circle, LayoutDashboard, Plus } from "lucide-react";
import type { SiteContent } from "@/i18n/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientLight } from "@/components/ui/AmbientLight";

type Demo = SiteContent["portfolio"]["items"][number];

function DemoPreview({ project, site }: { project: Demo; site: SiteContent }) {
  return (
    <div className={`demo-preview demo-${project.type}`} aria-hidden="true">
      <div className="demo-browser">
        <div className="browser-dots"><i /><i /><i /></div>
        <span>{project.name}</span>
        <ArrowUpRight size={12} />
      </div>
      {project.type === "dashboard" ? (
        <div className="dashboard-preview">
          <div className="dashboard-sidebar">
            <LayoutDashboard size={16} /><span /><span /><span /><span />
          </div>
          <div className="dashboard-main">
            <div className="dashboard-title">{site.portfolio.preview.tasks}<Plus size={12} /></div>
            <p>{project.headline}</p>
            <div className="dashboard-columns">
              {site.portfolio.preview.columns.map((column, index) => (
                <div key={column}>
                  <strong><Circle size={6} fill="currentColor" />{column}</strong>
                  {[0, 1].map((offset) => (
                    <div key={offset} className="dashboard-task">
                      <span className="task-marker" />
                      {site.portfolio.preview.cards[index * 2 + offset]}
                      <div className="task-lines"><i /><i /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="demo-editorial">
          <span className="demo-wordmark">{project.name}</span>
          <p>{project.caption}</p>
          <strong>{project.headline}</strong>
          <span className="demo-line" />
          <ArrowDownRight className="demo-arrow" size={26} />
          {project.type === "studio" ? (
            <div className="studio-orb" />
          ) : (
            <div className="botanical-leaves"><i /><i /><i /></div>
          )}
        </div>
      )}
    </div>
  );
}

export function Portfolio({ site }: { site: SiteContent }) {
  const content = site.portfolio;

  return (
    <section id="projetos" className="section portfolio-section" aria-labelledby="portfolio-title">
      <div className="container">
        <div>
          <Reveal><SectionHeading id="portfolio-title" {...content} /></Reveal>
          <div className="portfolio-grid">
            {content.items.map((project, index) => (
              <Reveal as="article" className="project-card" key={project.id} index={index}>
                <AmbientLight variant="card" />
                <div className="project-preview-wrap">
                  <DemoPreview project={project} site={site} />
                  <span className="demo-badge">{content.demoLabel}</span>
                </div>
                <div className="project-info">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.name}</h3>
                  <ul className="tags">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <details className="demo-details">
                    <summary>{content.demoSummary}<Plus size={16} aria-hidden="true" /></summary>
                    <p>{project.description}</p>
                  </details>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="demo-disclosure"><span className="status-dot" />{content.disclosure}</p>
        </div>
      </div>
    </section>
  );
}
