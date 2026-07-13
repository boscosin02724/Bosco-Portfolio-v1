import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyVideoSource = "/storytelling/artscrollvideo02.mp4";
const storyVideoDuration = 4.8;

export function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const preloadVideo = () => {
      if (video.getAttribute("src")) return;
      video.src = video.dataset.src ?? storyVideoSource;
      video.preload = "auto";
      video.load();
    };

    const preloadWhenNear = () => {
      const distanceFromViewport = section.getBoundingClientRect().top - window.innerHeight;
      if (distanceFromViewport > 3200) return;
      preloadVideo();
      window.removeEventListener("scroll", preloadWhenNear);
      window.removeEventListener("resize", preloadWhenNear);
    };

    preloadWhenNear();
    window.addEventListener("scroll", preloadWhenNear, { passive: true });
    window.addEventListener("resize", preloadWhenNear);

    const context = gsap.context(() => {
      let seekFrame = 0;

      const initScrollVideo = () => {
        const duration = Number.isFinite(video.duration) ? video.duration : storyVideoDuration;
        const lastFrameTime = Math.max(0, duration - 0.04);
        let targetTime = 0;
        let renderedTime = 0;
        let previousFrameTime = window.performance.now();
        let previousSeekTime = 0;

        video.pause();
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          video.currentTime = 0;
        }
        gsap.set([".scroll-story-panel"], { autoAlpha: 0, y: 26 });

        const renderVideoTime = (frameTime: number) => {
          const frameDelta = Math.min(64, frameTime - previousFrameTime);
          const smoothing = 1 - Math.pow(0.035, frameDelta / 1000);
          const difference = targetTime - renderedTime;

          previousFrameTime = frameTime;
          renderedTime += difference * smoothing;

          if (frameTime - previousSeekTime >= 1000 / 30) {
            if (video.readyState >= HTMLMediaElement.HAVE_METADATA && Math.abs(video.currentTime - renderedTime) > 0.008) {
              video.currentTime = Math.max(0, Math.min(lastFrameTime, renderedTime));
            }
            previousSeekTime = frameTime;
          }

          if (Math.abs(targetTime - renderedTime) > 0.006) {
            seekFrame = window.requestAnimationFrame(renderVideoTime);
          } else {
            renderedTime = targetTime;
            if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
              video.currentTime = Math.max(0, Math.min(lastFrameTime, targetTime));
            }
            seekFrame = 0;
          }
        };

        const seekToProgress = (progress: number) => {
          targetTime = Math.max(0, Math.min(lastFrameTime, progress * lastFrameTime));
          if (!seekFrame) {
            previousFrameTime = window.performance.now();
            seekFrame = window.requestAnimationFrame(renderVideoTime);
          }
        };

        const syncLoadedVideo = () => {
          renderedTime = targetTime;
          video.currentTime = Math.max(0, Math.min(lastFrameTime, targetTime));
        };

        video.addEventListener("loadedmetadata", syncLoadedVideo);

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
          .to(
            progressState,
            {
              value: 1,
              duration: 1,
              ease: "none",
              onUpdate: () => seekToProgress(progressState.value),
            },
            0,
          )
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
        return () => video.removeEventListener("loadedmetadata", syncLoadedVideo);
      };

      const cleanupScrollVideo = initScrollVideo();

      return () => {
        if (seekFrame) {
          window.cancelAnimationFrame(seekFrame);
        }
        cleanupScrollVideo();
      };
    }, section);

    return () => {
      window.removeEventListener("scroll", preloadWhenNear);
      window.removeEventListener("resize", preloadWhenNear);
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="scroll-story" aria-label="Personal practice transition">
      <div className="scroll-story-sticky">
        <video
          ref={videoRef}
          className="scroll-story-video"
          data-src={storyVideoSource}
          poster="/storytelling/artscroll-poster.svg"
          preload="none"
          muted
          playsInline
          disablePictureInPicture
          aria-hidden="true"
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
