import { ArrowUpRight, Download, Instagram, Linkedin } from "lucide-react";

const contactLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bosco-wing-pong-sin-51201b309?utm_source=share_via&utm_content=profile&utm_medium=member_ios", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/bosco.wpsin?igsh=MTdvY2VpOXp4aXZxcQ%3D%3D&utm_source=qr", icon: Instagram },
  { label: "Download CV", href: "/BOSCOSIN_CV_26JUL.pdf", icon: Download },
];

export function Contact() {
  return (
    <section id="contact" className="contact-section flex items-end bg-paper px-5 py-8 sm:px-8 lg:px-12">
      <div data-reveal className="mx-auto w-full max-w-studio">
        <p className="text-xs uppercase tracking-[0.34em] text-muted">Contact</p>
        <h2 className="contact-title mt-8 max-w-6xl font-display text-[clamp(4rem,11vw,12rem)] leading-[0.86]">
          <span>Let’s shape</span>
          <span>what comes next.</span>
        </h2>
        <p className="contact-supporting-line">
          Open to opportunities and collaborations across AI, motion, visual identity and spatial experiences.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          {contactLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} className="contact-button" target="_blank" rel="noreferrer">
              <Icon size={18} />
              <span>{label}</span>
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
        <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-xs uppercase tracking-[0.24em] text-muted">
          <p>Bosco Sin Portfolio</p>
          <p>AI / Visual / Brand / Spatial</p>
        </div>
      </div>
    </section>
  );
}
