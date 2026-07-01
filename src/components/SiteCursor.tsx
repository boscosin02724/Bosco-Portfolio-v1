import { useEffect, useRef } from "react";

export function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    const move = (event: PointerEvent) => {
      cursor.animate(
        { transform: `translate3d(${event.clientX - 14}px, ${event.clientY - 14}px, 0)` },
        { duration: 480, fill: "forwards", easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={cursorRef} className="site-cursor" />;
}
