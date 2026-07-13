import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

type TransitionPhase = "covered" | "revealing";
type TransitionMode = "curtain" | "dissolve" | "preload";

const transitionModeKey = "bosco-page-transition-mode";

const pageLabels: Record<string, string> = {
  "/": "Selected Work",
  "/projects/bosideng-50th-anniversary-exhibition": "Bosideng",
  "/projects/hahalulu-mgm-macau": "HAHALULU × MGM",
  "/projects/mplus-gala": "M+ Gala",
  "/projects/dj-snake-live-in-hong-kong": "DJ Snake",
  "/projects/french-may-monalisa-merch": "French May Monalisa",
  "/projects/3d-animation": "3D Animation",
};

function currentPageLabel() {
  return pageLabels[window.location.pathname] ?? "Bosco Sin";
}

function initialTransitionMode(): TransitionMode {
  const storedMode = window.sessionStorage.getItem(transitionModeKey);
  if (storedMode === "curtain" || storedMode === "dissolve") return storedMode;

  const navigationEntry = window.performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming | undefined;

  if (navigationEntry?.type === "back_forward") return "dissolve";
  return window.location.pathname === "/" ? "preload" : "curtain";
}

function transitionLabel(anchor: HTMLAnchorElement, url: URL) {
  const destinationLabel = pageLabels[url.pathname];
  if (destinationLabel && url.pathname.startsWith("/projects/")) return destinationLabel;

  const explicitLabel = anchor.dataset.transitionLabel;
  if (explicitLabel) return explicitLabel;

  const featuredLabel = anchor.querySelector("h3, strong")?.textContent?.trim();
  if (featuredLabel) return featuredLabel;

  if (url.hash) {
    const hashLabel = decodeURIComponent(url.hash.slice(1));
    if (hashLabel) return hashLabel.charAt(0).toUpperCase() + hashLabel.slice(1);
  }

  const textLabel = anchor.textContent?.trim().replace(/\s+/g, " ");
  if (textLabel) return textLabel.split(" ").slice(0, 5).join(" ");

  return destinationLabel ?? "Next Page";
}

export function PageTransition() {
  const lenis = useLenis();
  const [phase, setPhase] = useState<TransitionPhase>("covered");
  const [mode, setMode] = useState<TransitionMode>(initialTransitionMode);
  const [label, setLabel] = useState(currentPageLabel);
  const [preloadProgress, setPreloadProgress] = useState(6);
  const isNavigatingRef = useRef(false);
  const navigationModeRef = useRef<TransitionMode>(mode);
  const routeLocationRef = useRef(`${window.location.pathname}${window.location.search}`);
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const resetScrollPosition = () => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useLayoutEffect(() => {
    let secondFrame = 0;
    let hashTimer = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      const initialTarget = window.location.hash
        ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
        : null;
      const revealPage = () => {
        if (initialTarget) {
          const targetTop = initialTarget.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: targetTop, behavior: "auto" });
        }
        if (mode !== "preload" && !window.location.pathname.startsWith("/projects/")) {
          secondFrame = window.requestAnimationFrame(() => setPhase("revealing"));
        }
      };

      if (initialTarget) {
        hashTimer = window.setTimeout(revealPage, 120);
      } else {
        revealPage();
      }
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      if (hashTimer) window.clearTimeout(hashTimer);
    };
  }, []);

  useEffect(() => {
    if (mode === "preload" || !window.location.pathname.startsWith("/projects/")) return;

    let firstFrame = 0;
    let secondFrame = 0;
    let safetyTimeout = 0;
    let hasRevealed = false;

    const revealReadyRoute = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      window.clearTimeout(safetyTimeout);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => setPhase("revealing"));
      });
    };

    window.addEventListener("bosco:route-ready", revealReadyRoute);
    safetyTimeout = window.setTimeout(revealReadyRoute, 3000);

    if (document.documentElement.dataset.routeReady === "true") {
      revealReadyRoute();
    }

    return () => {
      window.removeEventListener("bosco:route-ready", revealReadyRoute);
      window.clearTimeout(safetyTimeout);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    if (mode !== "preload") return;

    const startedAt = window.performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isFinishing = false;
    let revealTimer = 0;
    let minimumTimer = 0;

    document.documentElement.classList.add("is-site-preloading");

    const finishPreload = () => {
      if (isFinishing) return;
      isFinishing = true;

      const minimumDuration = reducedMotion.matches ? 0 : 720;
      const remainingDelay = Math.max(0, minimumDuration - (window.performance.now() - startedAt));
      minimumTimer = window.setTimeout(() => {
        setPreloadProgress(100);
        revealTimer = window.setTimeout(() => {
          document.documentElement.classList.remove("is-site-preloading");
          setPhase("revealing");
        }, reducedMotion.matches ? 0 : 280);
      }, remainingDelay);
    };

    const progressTimer = window.setInterval(() => {
      setPreloadProgress((currentProgress) => {
        if (currentProgress >= 90) return currentProgress;
        if (currentProgress < 36) return Math.min(90, currentProgress + 7);
        if (currentProgress < 68) return Math.min(90, currentProgress + 4);
        return Math.min(90, currentProgress + 1);
      });
    }, 150);

    const fallbackTimer = window.setTimeout(finishPreload, 7000);
    window.addEventListener("bosco:hero-video-ready", finishPreload);

    if (document.documentElement.dataset.heroVideoReady === "true") {
      finishPreload();
    }

    return () => {
      window.removeEventListener("bosco:hero-video-ready", finishPreload);
      window.clearInterval(progressTimer);
      window.clearTimeout(fallbackTimer);
      if (minimumTimer) window.clearTimeout(minimumTimer);
      if (revealTimer) window.clearTimeout(revealTimer);
      document.documentElement.classList.remove("is-site-preloading");
    };
  }, [mode]);

  useEffect(() => {
    window.sessionStorage.removeItem(transitionModeKey);

    const timers = new Set<number>();
    let pageShowFirstFrame = 0;
    let pageShowSecondFrame = 0;
    let routeRevealFrame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;

      isNavigatingRef.current = false;
      document.documentElement.classList.remove("is-route-transitioning");
      setMode("dissolve");
      setPhase("covered");
      pageShowFirstFrame = window.requestAnimationFrame(() => {
        pageShowSecondFrame = window.requestAnimationFrame(() => setPhase("revealing"));
      });
    };

    const revealNavigatedRoute = () => {
      if (!isNavigatingRef.current) return;

      document.documentElement.classList.remove("is-route-transitioning");
      routeRevealFrame = window.requestAnimationFrame(() => setPhase("revealing"));
      schedule(() => {
        isNavigatingRef.current = false;
      }, navigationModeRef.current === "dissolve" ? 440 : 680);
    };

    const handlePopState = () => {
      const nextRouteLocation = `${window.location.pathname}${window.location.search}`;
      if (nextRouteLocation === routeLocationRef.current) return;

      routeLocationRef.current = nextRouteLocation;
      isNavigatingRef.current = true;
      navigationModeRef.current = "dissolve";
      setMode("dissolve");
      setLabel(currentPageLabel());
      setPhase("covered");
      resetScrollPosition();
      document.documentElement.classList.add("is-route-transitioning");
      schedule(revealNavigatedRoute, 3000);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        isNavigatingRef.current
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        anchor.dataset.noPageTransition !== undefined ||
        (anchor.target && anchor.target !== "_self")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !["http:", "https:"].includes(url.protocol)) return;
      if (url.href === window.location.href && !url.hash) return;

      const isSameDocument =
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        Boolean(url.hash);
      const sameDocumentTarget = isSameDocument
        ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
        : null;

      const isHomeLogo = anchor.classList.contains("hero-glass-logo");
      const isReturningHome =
        window.location.pathname.startsWith("/projects/") && url.pathname === "/";
      const transitionMode: TransitionMode =
        anchor.dataset.transition === "dissolve" || isHomeLogo || isReturningHome
          ? "dissolve"
          : "curtain";

      event.preventDefault();

      if (reducedMotion.matches) {
        if (sameDocumentTarget) {
          if (url.hash !== window.location.hash) {
            window.history.pushState(null, "", url.hash);
          }
          sameDocumentTarget.scrollIntoView({ block: "start" });
        } else {
          routeLocationRef.current = `${url.pathname}${url.search}`;
          window.history.pushState(null, "", url.href);
          resetScrollPosition();
          window.dispatchEvent(new Event("bosco:route-change"));
        }
        return;
      }

      if (sameDocumentTarget && transitionMode !== "dissolve") {
        if (url.hash !== window.location.hash) {
          window.history.pushState(null, "", url.hash);
        }
        const targetTop = sameDocumentTarget.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
        return;
      }

      isNavigatingRef.current = true;
      navigationModeRef.current = transitionMode;
      setMode(transitionMode);
      setLabel(transitionLabel(anchor, url));
      setPhase("covered");
      document.documentElement.classList.add("is-route-transitioning");

      schedule(() => {
        if (sameDocumentTarget) {
          if (url.hash !== window.location.hash) {
            window.history.pushState(null, "", url.hash);
          }
          const targetTop = sameDocumentTarget.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: targetTop, behavior: "auto" });
          document.documentElement.classList.remove("is-route-transitioning");
          setPhase("revealing");
          schedule(() => {
            isNavigatingRef.current = false;
          }, transitionMode === "dissolve" ? 440 : 680);
        } else {
          routeLocationRef.current = `${url.pathname}${url.search}`;
          window.history.pushState(null, "", url.href);
          resetScrollPosition();
          window.dispatchEvent(new Event("bosco:route-change"));
          schedule(revealNavigatedRoute, 3000);
        }
      }, transitionMode === "dissolve" ? 360 : 580);
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("bosco:route-ready", revealNavigatedRoute);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("bosco:route-ready", revealNavigatedRoute);
      document.removeEventListener("click", handleDocumentClick);
      timers.forEach((timer) => window.clearTimeout(timer));
      if (pageShowFirstFrame) window.cancelAnimationFrame(pageShowFirstFrame);
      if (pageShowSecondFrame) window.cancelAnimationFrame(pageShowSecondFrame);
      if (routeRevealFrame) window.cancelAnimationFrame(routeRevealFrame);
      document.documentElement.classList.remove("is-route-transitioning");
    };
  }, []);

  return (
    <div
      className={`page-transition-overlay is-${mode}${phase === "revealing" ? " is-revealing" : " is-covered"}`}
      aria-hidden="true"
    >
      <div className="page-transition-grid" />
      <div className="page-transition-copy">
        <span>Bosco Sin Portfolio</span>
        <strong>{label}</strong>
      </div>
      <div className="page-transition-progress" />
      <div className="site-preloader">
        <div className="site-preloader-main">
          <span className="site-preloader-dot" aria-hidden="true" />
          <span className="site-preloader-wordmark">
            <strong>Bosco Sin</strong>
          </span>
        </div>
        <div className="site-preloader-footer">
          <span>Loading showreel</span>
          <div className="site-preloader-track" aria-hidden="true">
            <i style={{ transform: `scaleX(${preloadProgress / 100})` }} />
          </div>
          <b>{String(preloadProgress).padStart(3, "0")}%</b>
        </div>
      </div>
    </div>
  );
}
