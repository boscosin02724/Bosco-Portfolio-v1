import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { bosidengCaseStudy } from "../data/portfolio";
import { CaseNav } from "./CaseNav";

const caseStudy = bosidengCaseStudy;

export function BosidengProjectPage() {
  return (
    <div className="case-page bg-paper text-ink selection:bg-accent selection:text-white">
      <CaseNav />

      <main>
        <section className="case-hero">
          <img src={caseStudy.cover} alt={caseStudy.title} />
          <div className="case-hero-overlay">
            <a className="case-back-link" href="/#work">
              <ArrowLeft size={16} /> Back to Work
            </a>
            <div className="case-hero-copy">
              <p>{caseStudy.category}</p>
              <h1>{caseStudy.title}</h1>
              <div>
                <span>{caseStudy.year}</span>
                <span>Role: {caseStudy.role}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section case-overview">
          <div>
            <p className="case-eyebrow">Project Overview</p>
            <div className="case-info-list">
              {caseStudy.info.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2>{caseStudy.overview}</h2>
            <p>{caseStudy.description}</p>
          </div>
        </section>

        <section className="case-section case-concept">
          <div>
            <p className="case-eyebrow">Concept / Design Direction</p>
            <h2>From Heritage to Summit</h2>
          </div>
          <div>
            <p>
              The exhibition was designed around three key narratives. The goal was to transform brand history into a physical
              journey, allowing visitors to experience BOSIDENG through atmosphere, storytelling, interactive zones and cinematic
              spatial moments.
            </p>
            <div className="case-narrative-grid">
              {caseStudy.narratives.map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-heading">
            <p className="case-eyebrow">Visitor Journey</p>
            <h2>A guided spatial sequence from brand landmark to innovation archive.</h2>
          </div>
          <div className="journey-track">
            {caseStudy.journey.map((zone) => (
              <article key={zone.zone} className="journey-card">
                <img src={zone.image} alt={zone.title} />
                <div>
                  <span>{zone.zone}</span>
                  <h3>{zone.title}</h3>
                  <p>{zone.text}</p>
                  <small>{zone.caption}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section case-gallery-section">
          <div className="case-section-heading">
            <p className="case-eyebrow">Image Gallery</p>
            <h2>Large-format exhibition visuals, composed like a spatial magazine spread.</h2>
          </div>
          <div className="case-gallery">
            {caseStudy.gallery.map((item) => (
              <figure key={item.image} className={`case-gallery-item case-gallery-${item.layout}`}>
                <img src={item.image} alt={item.caption} />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-section case-contribution">
          <div>
            <p className="case-eyebrow">My Contribution</p>
            <h2>{caseStudy.contributionText}</h2>
          </div>
          <div className="contribution-grid">
            {caseStudy.contributions.map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-closing">
          <p>{caseStudy.closing}</p>
          <div>
            <a href="/#work">
              Back to Selected Projects <ArrowUpRight size={16} />
            </a>
            <a href="/#contact">
              Contact <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
