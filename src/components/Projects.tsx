import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";
import { SectionHeader } from "./SectionHeader";
import { VisualAsset } from "./VisualAsset";

export function Projects() {
  return (
    <section id="work" className="section-pad bg-ink text-white">
      <SectionHeader eyebrow="Selected Projects" title="Designing digital experiences, spatial concepts and visual systems that connect brands, people and places.">
        <p className="text-white/62">
          Where strategy, visuals and technology come together.
        </p>
      </SectionHeader>

      <div className="project-grid mx-auto mt-16 grid max-w-[1780px] gap-5 px-3 sm:px-4 lg:grid-cols-2 lg:px-5">
        {projects.map((project) => {
          const projectKey = project.name;
          const isLightCard = "textTone" in project && project.textTone === "dark";
          const className = `project-card project-${project.scale}${isLightCard ? " project-card-light" : ""}`;
          const content = (
            <>
              <VisualAsset tone={project.tone} label={project.name} image={"image" in project ? project.image : undefined} />
              <div className="project-overlay">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/62">{project.category}</p>
                  <h3 className="mt-3 max-w-3xl font-display text-4xl leading-none sm:text-6xl">{project.name}</h3>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <span className="text-sm text-white/70">{project.year}</span>
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em]">
                    View Case <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </>
          );

          return "externalUrl" in project ? (
            <a
              data-reveal
              key={projectKey}
              className={className}
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
            >
              {content}
            </a>
          ) : "slug" in project ? (
            <a
              data-reveal
              key={projectKey}
              className={className}
              href={`/projects/${project.slug}`}
            >
              {content}
            </a>
          ) : (
            <article
              data-reveal
              key={projectKey}
              className={className}
            >
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}
