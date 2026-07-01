import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { hahaluluCaseStudy } from "../data/portfolio";
import { CaseNav } from "./CaseNav";

const caseStudy = hahaluluCaseStudy;

export function HahaluluProjectPage() {
  return (
    <div className="case-page hahalulu-case bg-paper text-ink selection:bg-accent selection:text-white">
      <CaseNav />

      <main>
        <section className="case-hero case-hero-clean">
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
            <p>{caseStudy.workflow}</p>
          </div>
        </section>

        <section className="case-section case-concept">
          <div>
            <p className="case-eyebrow">Key Focus</p>
            <h2>From character language to immersive spatial moments.</h2>
          </div>
          <div className="case-narrative-grid hahalulu-focus-grid">
            {caseStudy.focus.map((item, index) => (
              <div key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item.title}</p>
                <small>{item.text}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section case-gallery-section">
          <div className="case-section-heading">
            <p className="case-eyebrow">Image Gallery</p>
            <h2>Playful IP spaces, visualized as real event environments.</h2>
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
            <h2>
              I developed the creative 3D direction, transforming the character world into event-ready spatial visuals and booth
              concepts.
            </h2>
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
