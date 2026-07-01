import { workflow } from "../data/portfolio";
import { SectionHeader } from "./SectionHeader";

export function Workflow() {
  return (
    <section className="section-pad workflow-section bg-paper">
      <SectionHeader eyebrow="Software & Workflow" title="Creative Infrastructure.">
        <p>The systems behind branding, spatial experiences and visual storytelling.</p>
      </SectionHeader>
      <div className="mx-auto mt-16 grid max-w-studio gap-4 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        {workflow.map((stage) => (
          <div data-reveal key={stage[0]} className="workflow-column">
            <p>{stage[0]}</p>
            <div>
              {stage.slice(1).map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
