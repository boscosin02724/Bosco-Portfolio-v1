import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { animationProjects } from "../data/portfolio";
import { CaseNav } from "./CaseNav";

type AnimationProject = (typeof animationProjects)[number];

const fanLayouts = [
  { rotation: "-4deg", y: "2.4rem" },
  { rotation: "-2deg", y: "0.8rem" },
  { rotation: "2deg", y: "0rem" },
  { rotation: "4deg", y: "0.8rem" },
  { rotation: "2deg", y: "2.4rem" },
  { rotation: "-2deg", y: "3.2rem" },
] as const;

export function ThreeDAnimationProjectPage() {
  const [activeProject, setActiveProject] = useState<AnimationProject | null>(null);
  const [isTrackPaused, setIsTrackPaused] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<AnimationProject | null>(null);
  const [hoveredCardPosition, setHoveredCardPosition] = useState<number | null>(null);
  const fanGroupRef = useRef<HTMLDivElement | null>(null);
  const fanGroupWidth = useRef(0);
  const fanPosition = useRef(0);
  const wheelVelocity = useRef(0);
  const hasPositionedTrack = useRef(false);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const modalTouchY = useRef<number | null>(null);
  const trackX = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject]);

  useEffect(() => {
    const group = fanGroupRef.current;
    if (!group) return;

    const updateTrackMeasurements = () => {
      const nextWidth = group.getBoundingClientRect().width;
      if (!nextWidth) return;

      fanGroupWidth.current = nextWidth;

      if (window.innerWidth <= 820) {
        fanPosition.current = 0;
        trackX.set(0);
        return;
      }

      if (!hasPositionedTrack.current) {
        fanPosition.current = -nextWidth;
        trackX.set(-nextWidth);
        hasPositionedTrack.current = true;
      } else {
        fanPosition.current = ((fanPosition.current % nextWidth) + nextWidth) % nextWidth - nextWidth;
        trackX.set(fanPosition.current);
      }
    };

    updateTrackMeasurements();
    const resizeObserver = new ResizeObserver(updateTrackMeasurements);
    resizeObserver.observe(group);

    return () => resizeObserver.disconnect();
  }, [trackX]);

  useAnimationFrame((_, delta) => {
    if (window.innerWidth <= 820 || shouldReduceMotion) return;

    const width = fanGroupWidth.current;
    if (!width) return;

    const deltaSeconds = Math.min(delta, 40) / 1000;
    const automaticVelocity = isTrackPaused || activeProject ? 0 : 42;

    fanPosition.current += (automaticVelocity + wheelVelocity.current) * deltaSeconds;
    wheelVelocity.current *= Math.exp(-4.2 * deltaSeconds);
    fanPosition.current = ((fanPosition.current % width) + width) % width - width;
    trackX.set(fanPosition.current);
  });

  const handleCarouselWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (window.matchMedia("(max-width: 820px)").matches) return;

    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    const impulse = event.deltaY * unit * -8;
    wheelVelocity.current = Math.max(-1800, Math.min(1800, wheelVelocity.current + impulse));
  };

  const handleModalWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const scroller = modalScrollRef.current;
    if (!scroller || scroller.scrollHeight <= scroller.clientHeight) return;

    event.preventDefault();
    event.stopPropagation();
    scroller.scrollTop += event.deltaY;
  };

  const handleModalTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    modalTouchY.current = event.touches[0]?.clientY ?? null;
  };

  const handleModalTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const scroller = modalScrollRef.current;
    const currentY = event.touches[0]?.clientY;
    if (!scroller || currentY === undefined || modalTouchY.current === null) return;

    const distance = modalTouchY.current - currentY;
    if (distance !== 0) {
      event.preventDefault();
      event.stopPropagation();
      scroller.scrollTop += distance;
      modalTouchY.current = currentY;
    }
  };

  return (
    <div className="animation-page">
      <CaseNav />

      <main>
        <section className="animation-stage animation-fan-stage" aria-labelledby="animation-page-title">
          <div className="animation-grid" aria-hidden="true" />
          <div className="animation-backdrop-collage" aria-hidden="true">
            <img className="animation-backdrop-image animation-backdrop-image-one" src={animationProjects[0].image} alt="" />
            <img className="animation-backdrop-image animation-backdrop-image-two" src={animationProjects[4].image} alt="" />
            <img className="animation-backdrop-image animation-backdrop-image-three" src={animationProjects[5].image} alt="" />
            <AnimatePresence mode="sync">
              {hoveredProject ? (
                <motion.img
                  key={hoveredProject.slug}
                  className="animation-active-backdrop"
                  src={hoveredProject.image}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.42 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
            </AnimatePresence>
          </div>
          <div className="animation-ambient-glow animation-ambient-glow-one" aria-hidden="true" />
          <div className="animation-ambient-glow animation-ambient-glow-two" aria-hidden="true" />

          <header className="animation-heading animation-fan-heading">
            <a href="/#work" className="animation-back-link">
              <ArrowLeft size={15} /> Selected work
            </a>
            <p>Motion Design / 3D Film / Visual Storytelling</p>
            <h1 id="animation-page-title">3D Animation</h1>
            <span>Six selected worlds in motion.</span>
          </header>

          <div
            className="animation-fan-viewport"
            aria-label="3D animation projects"
            onWheel={handleCarouselWheel}
          >
            <motion.div
              className={`animation-fan-track${isTrackPaused || activeProject ? " is-paused" : ""}`}
              style={{ x: trackX }}
            >
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  className="animation-fan-group"
                  ref={groupIndex === 0 ? fanGroupRef : undefined}
                  aria-hidden={groupIndex === 1 ? true : undefined}
                >
                  {animationProjects.map((project, index) => {
                    const layout = fanLayouts[index];
                    const cardPosition = groupIndex * animationProjects.length + index;
                    const distanceFromHover = hoveredCardPosition === null ? null : cardPosition - hoveredCardPosition;
                    const isHoveredCard = distanceFromHover === 0;
                    const isImmediateNeighbor = Math.abs(distanceFromHover ?? 99) === 1;
                    const isSecondaryNeighbor = Math.abs(distanceFromHover ?? 99) === 2;
                    const reactiveX = isImmediateNeighbor
                      ? Math.sign(distanceFromHover ?? 0) * 38
                      : isSecondaryNeighbor
                        ? Math.sign(distanceFromHover ?? 0) * 14
                        : 0;

                    return (
                      <button
                        key={`${groupIndex}-${project.slug}`}
                        type="button"
                        className="animation-fan-card"
                        style={
                          {
                            "--fan-rotation": layout.rotation,
                            "--fan-y": layout.y,
                            "--fan-delay": `${index * -0.7}s`,
                          } as React.CSSProperties
                        }
                        tabIndex={groupIndex === 0 ? 0 : -1}
                        onPointerEnter={() => {
                          setIsTrackPaused(true);
                          setHoveredProject(project);
                          setHoveredCardPosition(cardPosition);
                        }}
                        onPointerLeave={() => {
                          setIsTrackPaused(false);
                          setHoveredProject(null);
                          setHoveredCardPosition(null);
                        }}
                        onFocus={() => {
                          setIsTrackPaused(true);
                          setHoveredProject(project);
                          setHoveredCardPosition(cardPosition);
                        }}
                        onBlur={() => {
                          setIsTrackPaused(false);
                          setHoveredProject(null);
                          setHoveredCardPosition(null);
                        }}
                        onClick={() => setActiveProject(project)}
                        aria-label={`Open ${project.title} project details`}
                      >
                        <span className="animation-fan-float">
                          <motion.span
                            className="animation-fan-reactive"
                            animate={
                              shouldReduceMotion
                                ? undefined
                                : {
                                    x: reactiveX,
                                    y: isHoveredCard ? -10 : isImmediateNeighbor ? 8 : 0,
                                    scale: isHoveredCard ? 1.2 : isImmediateNeighbor ? 0.985 : 1,
                                  }
                            }
                            transition={{
                              type: "spring",
                              stiffness: 250,
                              damping: 22,
                              mass: 0.72,
                            }}
                          >
                            <span className="animation-fan-media">
                              <img src={project.image} alt="" />
                              <span className="animation-fan-shade" />
                              <span className="animation-fan-index">{String(index + 1).padStart(2, "0")}</span>
                              <span className="animation-fan-copy">
                                <span>{project.discipline}</span>
                                <strong>{project.title}</strong>
                              </span>
                              <ArrowUpRight className="animation-fan-arrow" size={20} />
                            </span>
                          </motion.span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="animation-stage-note animation-fan-note">
            <span>Scroll to steer</span>
            <span className="animation-note-dot" />
            <span>Hover to pause</span>
            <span className="animation-note-dot" />
            <span>Select a cover to expand</span>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            ref={modalScrollRef}
            className="animation-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onWheel={handleModalWheel}
            onTouchStart={handleModalTouchStart}
            onTouchMove={handleModalTouchMove}
            onTouchEnd={() => {
              modalTouchY.current = null;
            }}
            onClick={() => setActiveProject(null)}
          >
            <button
              type="button"
              className="animation-modal-close"
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
            >
              <X size={18} /> Close
            </button>

            <motion.article
              className="animation-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="animation-modal-title"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="animation-modal-scroll">
                <div className="animation-modal-visual">
                  <img src={activeProject.image} alt={`${activeProject.title} cover`} />
                  <p>{activeProject.discipline}</p>
                </div>

                <div className="animation-modal-content">
                  <p className="animation-modal-eyebrow">
                    {activeProject.link ? "3D Animation / Selected Film" : "3D Animation / Project Template"}
                  </p>
                  <h2 id="animation-modal-title">{activeProject.title}</h2>
                  <p className="animation-modal-summary">{activeProject.summary}</p>

                  {activeProject.note ? <p className="animation-project-note">{activeProject.note}</p> : null}

                  <dl className="animation-modal-meta">
                  <div>
                    <dt>Animation Type</dt>
                    <dd>{activeProject.animationType}</dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd>{activeProject.duration}</dd>
                  </div>
                  <div>
                    <dt>Aesthetic</dt>
                    <dd>{activeProject.aesthetic}</dd>
                  </div>
                  <div>
                    <dt>Year</dt>
                    <dd>{activeProject.year}</dd>
                  </div>
                  </dl>

                  {activeProject.link ? (
                    <a
                      className="animation-watch-link"
                      href={activeProject.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch Full Animation <ArrowUpRight size={18} />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
