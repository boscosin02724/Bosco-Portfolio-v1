import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { PageTransition } from "./components/PageTransition";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Workflow } from "./components/Workflow";
import { SiteCursor } from "./components/SiteCursor";

gsap.registerPlugin(ScrollTrigger);

const BosidengProjectPage = lazy(() =>
  import("./components/BosidengProjectPage").then((module) => ({ default: module.BosidengProjectPage })),
);
const HahaluluProjectPage = lazy(() =>
  import("./components/HahaluluProjectPage").then((module) => ({ default: module.HahaluluProjectPage })),
);
const MplusProjectPage = lazy(() =>
  import("./components/MplusProjectPage").then((module) => ({ default: module.MplusProjectPage })),
);
const DjSnakeProjectPage = lazy(() =>
  import("./components/DjSnakeProjectPage").then((module) => ({ default: module.DjSnakeProjectPage })),
);
const FrenchMayMonalisaProjectPage = lazy(() =>
  import("./components/FrenchMayMonalisaProjectPage").then((module) => ({ default: module.FrenchMayMonalisaProjectPage })),
);
const ThreeDAnimationProjectPage = lazy(() =>
  import("./components/ThreeDAnimationProjectPage").then((module) => ({
    default: module.ThreeDAnimationProjectPage,
  })),
);

function AppMotionEffects({ rootRef }: { rootRef: RefObject<HTMLDivElement | null> }) {
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
    }, rootRef);

    return () => context.revert();
  }, [rootRef]);

  return null;
}

function ProjectFallback() {
  return <div className="min-h-screen bg-ink" aria-hidden="true" />;
}

function RouteReadySignal() {
  useLayoutEffect(() => {
    document.documentElement.dataset.routeReady = "true";
    window.dispatchEvent(new Event("bosco:route-ready"));

    return () => {
      delete document.documentElement.dataset.routeReady;
    };
  }, []);

  return null;
}

function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);

    window.addEventListener("popstate", updatePathname);
    window.addEventListener("bosco:route-change", updatePathname);

    return () => {
      window.removeEventListener("popstate", updatePathname);
      window.removeEventListener("bosco:route-change", updatePathname);
    };
  }, []);

  return pathname;
}

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isBosidengProject = pathname === "/projects/bosideng-50th-anniversary-exhibition";
  const isHahaluluProject = pathname === "/projects/hahalulu-mgm-macau";
  const isMplusProject = pathname === "/projects/mplus-gala";
  const isDjSnakeProject = pathname === "/projects/dj-snake-live-in-hong-kong";
  const isFrenchMayMonalisaProject = pathname === "/projects/french-may-monalisa-merch";
  const isThreeDAnimationProject = pathname === "/projects/3d-animation";

  if (isBosidengProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <PageTransition />
        <Suspense fallback={<ProjectFallback />}>
          <BosidengProjectPage />
          <RouteReadySignal key={`ready-${pathname}`} />
          <AppMotionEffects key={`motion-${pathname}`} rootRef={appRef} />
        </Suspense>
      </div>
    );
  }

  if (isHahaluluProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <PageTransition />
        <Suspense fallback={<ProjectFallback />}>
          <HahaluluProjectPage />
          <RouteReadySignal key={`ready-${pathname}`} />
          <AppMotionEffects key={`motion-${pathname}`} rootRef={appRef} />
        </Suspense>
      </div>
    );
  }

  if (isMplusProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <PageTransition />
        <Suspense fallback={<ProjectFallback />}>
          <MplusProjectPage />
          <RouteReadySignal key={`ready-${pathname}`} />
          <AppMotionEffects key={`motion-${pathname}`} rootRef={appRef} />
        </Suspense>
      </div>
    );
  }

  if (isDjSnakeProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <PageTransition />
        <Suspense fallback={<ProjectFallback />}>
          <DjSnakeProjectPage />
          <RouteReadySignal key={`ready-${pathname}`} />
          <AppMotionEffects key={`motion-${pathname}`} rootRef={appRef} />
        </Suspense>
      </div>
    );
  }

  if (isFrenchMayMonalisaProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
        <SiteCursor />
        <PageTransition />
        <Suspense fallback={<ProjectFallback />}>
          <FrenchMayMonalisaProjectPage />
          <RouteReadySignal key={`ready-${pathname}`} />
          <AppMotionEffects key={`motion-${pathname}`} rootRef={appRef} />
        </Suspense>
      </div>
    );
  }

  if (isThreeDAnimationProject) {
    return (
      <div ref={appRef} className="min-h-screen bg-ink text-white selection:bg-accent selection:text-white">
        <SiteCursor />
        <PageTransition />
        <Suspense fallback={<ProjectFallback />}>
          <ThreeDAnimationProjectPage />
          <RouteReadySignal key={`ready-${pathname}`} />
          <AppMotionEffects key={`motion-${pathname}`} rootRef={appRef} />
        </Suspense>
      </div>
    );
  }

  return (
    <div ref={appRef} className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white">
      <SiteCursor />
      <PageTransition />
      <Hero />
      <main>
        <About />
        <Projects />
        <Services />
        <Workflow />
        <Contact />
      </main>
      <RouteReadySignal key={`ready-${pathname}`} />
      <AppMotionEffects key={`motion-${pathname}`} rootRef={appRef} />
    </div>
  );
}
