import { services } from "../data/portfolio";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  return (
    <section className="section-pad bg-paper">
      <SectionHeader eyebrow="What I Do" title="Design Across Disciplines.">
        <p>
          Integrating AI, motion, branding and spatial design into connected brand experiences.
        </p>
      </SectionHeader>
      <div className="mx-auto mt-16 grid max-w-studio grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {services.map((service, index) => (
          <div
            data-reveal
            key={service}
            className={`service-card ${index % 5 === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
          >
            <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{service}</h3>
            <p>
              Direction, production craft and tool fluency shaped for premium visual narratives.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
