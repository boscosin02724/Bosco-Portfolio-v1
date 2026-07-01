import { profile } from "../data/portfolio";

export function About() {
  return (
    <section id="about" className="section-pad bg-paper">
      <div className="about-editorial mx-auto max-w-studio px-5 sm:px-8 lg:px-12">
        <div className="about-intro">
          <p className="about-dot-label"><span />Intro</p>
          <div className="about-symbol">/ABOUT</div>
          <div className="about-statement">
            <p>
              I design brand experiences through AI, motion, visual identity and spatial design.
            </p>
            <div>
              {["AI Design", "Branding", "Motion", "3D", "Spatial"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="about-metrics">
          <p className="about-dot-label"><span />Practice</p>
          {profile.stats.map((stat) => (
            <div key={stat.value} className="about-metric">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
