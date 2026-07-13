import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const selectedProjects = [
  {
    index: "01",
    label: "Bosideng",
    href: "/projects/bosideng-50th-anniversary-exhibition",
    image: "/thumbnails/nav/bosideng.jpg",
  },
  {
    index: "02",
    label: "HAHALULU × MGM",
    href: "/projects/hahalulu-mgm-macau",
    image: "/thumbnails/nav/hahalulu.jpg",
  },
  {
    index: "03",
    label: "M+ Gala",
    href: "/projects/mplus-gala",
    image: "/thumbnails/nav/mplus.jpg",
  },
  {
    index: "04",
    label: "DJ Snake",
    href: "/projects/dj-snake-live-in-hong-kong",
    image: "/thumbnails/nav/dj-snake.jpg",
  },
  {
    index: "05",
    label: "French May Monalisa",
    href: "/projects/french-may-monalisa-merch",
    image: "/thumbnails/nav/french-may.jpg",
  },
] as const;

const contactLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bosco.wpsin?igsh=MTdvY2VpOXp4aXZxcQ%3D%3D&utm_source=qr",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bosco-wing-pong-sin-51201b309?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
] as const;

type NavDropdownsProps = {
  sectionPrefix?: string;
};

type MobileNavPanelProps = NavDropdownsProps & {
  id: string;
  isOpen: boolean;
  onDetailChange: (isDetailed: boolean) => void;
  onNavigate: () => void;
};

export function NavDropdowns({ sectionPrefix = "" }: NavDropdownsProps) {
  const [loadProjectThumbnails, setLoadProjectThumbnails] = useState(false);

  return (
    <>
      <div
        className="hero-desktop-item hero-work-menu"
        onPointerEnter={() => setLoadProjectThumbnails(true)}
        onFocusCapture={() => setLoadProjectThumbnails(true)}
      >
        <a className="hero-nav-link hero-desktop-link" href={`${sectionPrefix}#work`} aria-haspopup="true">
          Work
        </a>
        <div className="hero-nav-dropdown hero-work-dropdown" aria-label="Work navigation">
          <div className="hero-dropdown-heading">
            <span>Selected Projects</span>
            <span>05</span>
          </div>

          <div className="hero-project-menu-grid">
            {selectedProjects.map((project) => (
              <a key={project.href} className="hero-project-menu-link" href={project.href}>
                <span className="hero-project-menu-index">{project.index}</span>
                <strong>{project.label}</strong>
                {loadProjectThumbnails ? (
                  <img src={project.image} alt="" loading="lazy" decoding="async" />
                ) : null}
              </a>
            ))}
          </div>

          <div className="hero-dropdown-separator" />
          <div className="hero-work-secondary">
            <a href="/projects/3d-animation">
              <span>Motion Archive</span>
              <strong>3D Animation</strong>
              <ArrowUpRight size={17} />
            </a>
            <a href="https://boscosin724.myportfolio.com/all-work" target="_blank" rel="noreferrer">
              <span>Extended Portfolio</span>
              <strong>All Projects</strong>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>

      <a className="hero-nav-link hero-desktop-link" href={`${sectionPrefix}#about`}>
        About
      </a>

      <div className="hero-desktop-item hero-contact-menu">
        <a className="hero-nav-link hero-desktop-link" href={`${sectionPrefix}#contact`} aria-haspopup="true">
          Contact
        </a>
        <div className="hero-nav-dropdown hero-contact-dropdown" aria-label="Social links">
          <div className="hero-dropdown-heading">
            <span>Connect</span>
            <span>02</span>
          </div>
          <div className="hero-contact-links">
            {contactLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                <strong>{link.label}</strong>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <a
        className="hero-nav-link hero-desktop-link"
        href="/BOSCOSIN_CV_26JUL.pdf"
        target="_blank"
        rel="noreferrer"
      >
        Resume
      </a>
    </>
  );
}

export function MobileNavPanel({ id, isOpen, sectionPrefix = "", onDetailChange, onNavigate }: MobileNavPanelProps) {
  const [expandedMenu, setExpandedMenu] = useState<"work" | "contact" | null>(null);

  useEffect(() => {
    if (!isOpen) setExpandedMenu(null);
  }, [isOpen]);

  useEffect(() => {
    onDetailChange(expandedMenu !== null);
  }, [expandedMenu, onDetailChange]);

  const handleNavigate = () => {
    setExpandedMenu(null);
    onNavigate();
  };

  return (
    <div id={id} className="hero-mobile-panel">
      <div className="hero-mobile-main-nav">
        <button
          type="button"
          className={expandedMenu === "work" ? "is-expanded" : ""}
          aria-expanded={expandedMenu === "work"}
          aria-controls={`${id}-work`}
          onClick={() => setExpandedMenu((current) => (current === "work" ? null : "work"))}
        >
          <span>Work</span>
          <ChevronDown size={16} />
        </button>

        {expandedMenu === "work" ? (
          <div id={`${id}-work`} className="hero-mobile-detail-panel">
            <div className="hero-mobile-section-heading">
              <span>Selected Projects · 05</span>
              <a href={`${sectionPrefix}#work`} onClick={handleNavigate}>
                View section <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="hero-mobile-project-list">
              {selectedProjects.map((project) => (
                <a key={project.href} href={project.href} onClick={handleNavigate}>
                  <span>{project.index}</span>
                  <strong>{project.label}</strong>
                  <img src={project.image} alt="" loading="lazy" decoding="async" />
                </a>
              ))}
            </div>
            <div className="hero-mobile-secondary-links">
              <a href="/projects/3d-animation" onClick={handleNavigate}>
                <span>Motion Archive</span>
                <strong>3D Animation</strong>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="https://boscosin724.myportfolio.com/all-work"
                target="_blank"
                rel="noreferrer"
                onClick={handleNavigate}
              >
                <span>Extended Portfolio</span>
                <strong>All Projects</strong>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        ) : null}

        <a href={`${sectionPrefix}#about`} onClick={handleNavigate}>
          About
        </a>

        <button
          type="button"
          className={expandedMenu === "contact" ? "is-expanded" : ""}
          aria-expanded={expandedMenu === "contact"}
          aria-controls={`${id}-contact`}
          onClick={() => setExpandedMenu((current) => (current === "contact" ? null : "contact"))}
        >
          <span>Contact</span>
          <ChevronDown size={16} />
        </button>

        {expandedMenu === "contact" ? (
          <div id={`${id}-contact`} className="hero-mobile-detail-panel hero-mobile-contact-detail">
            <div className="hero-mobile-section-heading">
              <span>Connect · 02</span>
              <a href={`${sectionPrefix}#contact`} onClick={handleNavigate}>
                Contact section <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="hero-mobile-social-links">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" onClick={handleNavigate}>
                  <strong>{link.label}</strong>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <a href="/BOSCOSIN_CV_26JUL.pdf" target="_blank" rel="noreferrer" onClick={handleNavigate}>
          Resume <ArrowUpRight size={15} />
        </a>
      </div>
    </div>
  );
}
