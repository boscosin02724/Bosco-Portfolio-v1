import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const context = gsap.context(() => {
      let metadataHandler: (() => void) | null = null;

      const initScrollVideo = () => {
        const duration = video.duration || 1;
        video.pause();
        gsap.set(video, { currentTime: 0 });
        gsap.set([".scroll-story-panel"], { autoAlpha: 0, y: 26 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=320%",
            pin: ".scroll-story-sticky",
            pinSpacing: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        const progressState = { value: 0 };

        timeline
          .to(progressState, { value: 1, duration: 1, ease: "none" }, 0)
          .to(video, { currentTime: duration, duration: 0.64, ease: "none" }, 0)
          .fromTo(
            ".scroll-story-beyond",
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.06, ease: "power2.out" },
            0.24,
          )
          .to(
            ".scroll-story-beyond",
            { autoAlpha: 0, y: -22, duration: 0.06, ease: "power2.out" },
            0.43,
          )
          .fromTo(
            ".scroll-story-practice",
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.06, ease: "power2.out" },
            0.5,
          )
          .to(
            ".scroll-story-practice",
            { autoAlpha: 0, y: -22, duration: 0.06, ease: "power2.out" },
            0.62,
          )
          .fromTo(
            ".scroll-story-ending",
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" },
            0.68,
          );

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) {
        initScrollVideo();
      } else {
        metadataHandler = initScrollVideo;
        video.addEventListener("loadedmetadata", metadataHandler, { once: true });
      }

      return () => {
        if (metadataHandler) {
          video.removeEventListener("loadedmetadata", metadataHandler);
        }
      };
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scroll-story" aria-label="Personal practice transition">
      <div className="scroll-story-sticky">
        <video
          ref={videoRef}
          className="scroll-story-video"
          src="/storytelling/artscrollvideo02.mp4"
          poster="/storytelling/artscroll-poster.svg"
          preload="metadata"
          muted
          playsInline
        />
        <div className="scroll-story-overlay" />

        <div className="scroll-story-copy scroll-story-panel scroll-story-beyond" aria-hidden="true">
          <h2>Beyond Commercial Work</h2>
        </div>

        <div className="scroll-story-copy scroll-story-panel scroll-story-practice" aria-hidden="true">
          <h2>Personal Practice</h2>
        </div>

        <div className="scroll-story-copy scroll-story-panel scroll-story-ending">
          <p>Personal Practice</p>
          <h2>Artworks, Photography &amp; Exhibitions</h2>
          <button type="button" className="scroll-story-button" disabled>
            Enter Archive <span aria-hidden="true">-&gt;</span>
          </button>
          <span className="scroll-story-status">Currently Curating</span>
        </div>
      </div>
    </section>
  );
}
