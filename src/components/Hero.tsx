import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MobileNavPanel, NavDropdowns } from "./NavDropdowns";
import { useNavContrast } from "./useNavContrast";

gsap.registerPlugin(ScrollTrigger);

const morphWords = ["Stories", "Graphics", "Motions", "Experiences"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const showreelRef = useRef<HTMLVideoElement>(null);
  const [morphWord, setMorphWord] = useState(morphWords[0]);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const isNavOnLight = useNavContrast(navRef);

  useEffect(() => {
    const video = showreelRef.current;
    if (!video) return;

    let hasSignalled = false;
    const signalReady = () => {
      if (hasSignalled) return;
      hasSignalled = true;
      document.documentElement.dataset.heroVideoReady = "true";
      window.dispatchEvent(new Event("bosco:hero-video-ready"));
    };

    video.addEventListener("canplay", signalReady, { once: true });
    video.addEventListener("error", signalReady, { once: true });

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      window.requestAnimationFrame(signalReady);
    } else {
      video.load();
    }

    const fallbackTimer = window.setTimeout(signalReady, 7000);

    return () => {
      video.removeEventListener("canplay", signalReady);
      video.removeEventListener("error", signalReady);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      const clampProgress = gsap.utils.clamp(0, 1);
      const setHeroProgress = (progressValue: number) => {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const progress = clampProgress(progressValue);
        const width = Math.max(320, viewportWidth);
        const heightRatio = viewportWidth < 768 ? 0.72 : viewportWidth < 1200 ? 0.78 : 0.82;
        const minHeight = viewportWidth < 768 ? 420 : viewportWidth < 1200 ? 500 : 560;
        const maxHeight = viewportWidth < 768 ? 620 : viewportWidth < 1200 ? 720 : 820;
        const height = Math.min(maxHeight, Math.max(minHeight, viewportHeight * heightRatio));
        const radius = 0;

        canvasRef.current?.style.setProperty("--canvas-width", `${width}px`);
        canvasRef.current?.style.setProperty("--canvas-height", `${height}px`);
        canvasRef.current?.style.setProperty("--canvas-radius", `${radius}px`);
        sectionRef.current?.style.setProperty("--hero-shell-height", `${height}px`);
        sectionRef.current?.style.setProperty("--hero-progress", `${progress}`);
      };

      setHeroProgress(0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${Math.max(480, window.innerHeight * 0.75)}`,
        scrub: 1.35,
        invalidateOnRefresh: true,
        onUpdate: (self) => setHeroProgress(self.progress),
        onRefresh: (self) => setHeroProgress(self.progress),
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMorphWord((currentWord) => {
        const nextIndex = (morphWords.indexOf(currentWord) + 1) % morphWords.length;
        return morphWords[nextIndex];
      });
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="top" className="hero-scroll bg-paper text-white">
      <nav
        ref={navRef}
        className={`hero-glass-nav${isMobileNavOpen ? " is-mobile-open" : ""}${isMobileDetailOpen ? " is-mobile-detail-open" : ""}${isNavOnLight ? " nav-on-light" : ""}`}
        aria-label="Primary navigation"
      >
        <a href="#top" className="hero-glass-logo" aria-label="Bosco Sin home">
          Bosco Sin
        </a>
        <span className="hero-nav-divider" aria-hidden="true" />
        <button
          className="hero-menu-toggle"
          type="button"
          aria-expanded={isMobileNavOpen}
          aria-controls="hero-mobile-nav-links"
          onClick={() =>
            setIsMobileNavOpen((isOpen) => {
              if (isOpen) setIsMobileDetailOpen(false);
              return !isOpen;
            })
          }
        >
          {isMobileNavOpen ? "X" : "Menu"}
        </button>
        <NavDropdowns />
        <MobileNavPanel
          id="hero-mobile-nav-links"
          isOpen={isMobileNavOpen}
          onDetailChange={setIsMobileDetailOpen}
          onNavigate={() => setIsMobileNavOpen(false)}
        />
      </nav>
      <div className="hero-sticky">
        <div className="hero-content">
          <div ref={canvasRef} className="hero-canvas" aria-label="Showreel canvas">
            <div className="hero-video-frame">
              <div className="showreel-fallback" />
              <video
                ref={showreelRef}
                className="showreel-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/showreel.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="hero-bottom-gradient" aria-hidden="true" />

            <div className="hero-text-grid">
              <motion.div
                className="hero-copy"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="hero-kicker">AI Designer / Visual Designer / Brand Experience</p>
                <h1>
                  <span>Designing</span>
                  <span className="hero-morph-word">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={morphWord}
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -22 }}
                        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {morphWord}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </h1>
                <p className="hero-tagline">
                  with <span>AI</span>, Motion & 3D
                </p>
              </motion.div>
            </div>

            <a href="#about" className="hero-scroll-indicator">
              <span>Scroll Down</span>
              <ArrowDown size={16} strokeWidth={1.7} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
