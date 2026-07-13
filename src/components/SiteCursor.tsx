import { useEffect, useRef } from "react";

export function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let targetX = -40;
    let targetY = -40;
    let currentX = -40;
    let currentY = -40;

    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX - 14;
      targetY = event.clientY - 14;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", move);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <div ref={cursorRef} className="site-cursor" />;
}
