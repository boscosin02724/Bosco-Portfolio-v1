import { useRef, useState } from "react";
import { MobileNavPanel, NavDropdowns } from "./NavDropdowns";
import { useNavContrast } from "./useNavContrast";

export function CaseNav() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const isNavOnLight = useNavContrast(navRef);

  return (
    <header className="case-nav">
      <nav
        ref={navRef}
        className={`hero-glass-nav case-glass-nav${isMobileNavOpen ? " is-mobile-open" : ""}${isMobileDetailOpen ? " is-mobile-detail-open" : ""}${isNavOnLight ? " nav-on-light" : ""}`}
        aria-label="Project navigation"
      >
        <a href="/" className="hero-glass-logo" aria-label="Bosco Sin home">
          Bosco Sin
        </a>
        <span className="hero-nav-divider" aria-hidden="true" />
        <button
          className="hero-menu-toggle"
          type="button"
          aria-expanded={isMobileNavOpen}
          aria-controls="case-mobile-nav-links"
          onClick={() =>
            setIsMobileNavOpen((isOpen) => {
              if (isOpen) setIsMobileDetailOpen(false);
              return !isOpen;
            })
          }
        >
          {isMobileNavOpen ? "X" : "Menu"}
        </button>
        <NavDropdowns sectionPrefix="/" />
        <MobileNavPanel
          id="case-mobile-nav-links"
          isOpen={isMobileNavOpen}
          onDetailChange={setIsMobileDetailOpen}
          sectionPrefix="/"
          onNavigate={() => setIsMobileNavOpen(false)}
        />
      </nav>
    </header>
  );
}
