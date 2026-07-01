import { useRef, useState } from "react";
import { useNavContrast } from "./useNavContrast";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Resume", href: "/BOSCOSIN_CV_26JUL.pdf" },
];

const mobileNavItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Resume", href: "/BOSCOSIN_CV_26JUL.pdf" },
];

export function CaseNav() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isNavOnLight = useNavContrast(navRef);

  return (
    <header className="case-nav">
      <nav
        ref={navRef}
        className={`hero-glass-nav case-glass-nav${isMobileNavOpen ? " is-mobile-open" : ""}${isNavOnLight ? " nav-on-light" : ""}`}
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
          onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
        >
          {isMobileNavOpen ? "X" : "Menu"}
        </button>
        {navItems.map((item) => (
          <a
            key={item.label}
            className="hero-nav-link hero-desktop-link"
            href={item.href}
            target={item.label === "Resume" ? "_blank" : undefined}
            rel={item.label === "Resume" ? "noreferrer" : undefined}
            onClick={() => setIsMobileNavOpen(false)}
          >
            {item.label}
          </a>
        ))}
        {mobileNavItems.map((item) => (
          <a
            key={`mobile-${item.label}`}
            className="hero-nav-link hero-mobile-link"
            href={item.href}
            target={item.label === "Resume" ? "_blank" : undefined}
            rel={item.label === "Resume" ? "noreferrer" : undefined}
            id={item.label === "Work" ? "case-mobile-nav-links" : undefined}
            onClick={() => setIsMobileNavOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
