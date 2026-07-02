import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { About } from "./components/About";
import { BosidengProjectPage } from "./components/BosidengProjectPage";
import { Contact } from "./components/Contact";
import { DjSnakeProjectPage } from "./components/DjSnakeProjectPage";
import { FrenchMayMonalisaProjectPage } from "./components/FrenchMayMonalisaProjectPage";
import { HahaluluProjectPage } from "./components/HahaluluProjectPage";
import { Hero } from "./components/Hero";
import { MplusProjectPage } from "./components/MplusProjectPage";
import { Projects } from "./components/Projects";
import { ScrollStory } from "./components/ScrollStory";
import { Services } from "./components/Services";
import { Workflow } from "./components/Workflow";
import { SiteCursor } from "./components/SiteCursor";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const pathname = window.location.pathname;
  const isBosidengProject = pathname === "/projects/bosideng-50th-anniversary-exhibition";
  const isHahaluluProject = pathname === "/projects/hahalulu-mgm-macau";
  const isMplusProject = pathname === "/projects/mplus-gala";
  const isDjSnakeProject = pathname === "/projects/dj-snake-live-in-hong-kong";
  const isFrenchMayMonalisaProject = pathname === "/projects/french-may-monalisa-merch";

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: 1.2,
          },
        });
      });
    }, appRef);

    return () => context.revert();
  }, []);

  if (isBosidengProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <BosidengProjectPage />
      </div>
    );
  }

  if (isHahaluluProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <HahaluluProjectPage />
      </div>
    );
  }

  if (isMplusProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <MplusProjectPage />
      </div>
    );
  }

  if (isDjSnakeProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <DjSnakeProjectPage />
      </div>
    );
  }

  if (isFrenchMayMonalisaProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <FrenchMayMonalisaProjectPage />
      </div>
    );
  }

  return (
    <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
      <SiteCursor />
      <Hero />
      <main>
        <About />
        <Projects />
        <ScrollStory />
        <Services />
        <Workflow />
        <Contact />
      </main>
    </div>
  );
}
