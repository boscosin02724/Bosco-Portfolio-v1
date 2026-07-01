import { timeline } from "../data/portfolio";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="section-pad bg-[#efede7]">
      <SectionHeader eyebrow="Experience" title="A timeline of visual practice, spatial thinking and AI evolution." />
      <div data-reveal className="mx-auto mt-16 max-w-studio overflow-x-auto px-5 pb-8 sm:px-8 lg:px-12">
        <div className="timeline-track">
          {timeline.map((item) => (
            <div key={item.period} className="timeline-item">
              <p>{item.period}</p>
              <h3>{item.title}</h3>
              <span>{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
