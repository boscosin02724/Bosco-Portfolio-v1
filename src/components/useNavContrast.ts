import { useEffect, useState } from "react";
import type { RefObject } from "react";

function parseRgb(color: string) {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;

  const values = match[1].split(",").map((value) => Number.parseFloat(value.trim()));
  const [r, g, b] = values;
  const a = values[3] ?? 1;
  if ([r, g, b].some((value) => Number.isNaN(value))) return null;

  return { r, g, b, a: Number.isNaN(a) ? 1 : a };
}

function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  const channels = [r, g, b].map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function isElementOnLightBackground(element: Element | null) {
  let current: Element | null = element;

  while (current) {
    const styles = window.getComputedStyle(current);
    const color = parseRgb(styles.backgroundColor);

    if (color && color.a > 0.2) {
      return luminance(color) > 0.52;
    }

    current = current.parentElement;
  }

  return true;
}

export function useNavContrast(navRef: RefObject<HTMLElement | null>) {
  const [isOnLight, setIsOnLight] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateContrast = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;

      const rect = nav.getBoundingClientRect();
      const sampleX = Math.min(window.innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
      const sampleY = Math.min(window.innerHeight - 1, Math.max(0, rect.top + Math.min(rect.height, 56) / 2));
      const target = document.elementsFromPoint(sampleX, sampleY).find((element) => !nav.contains(element));

      setIsOnLight(isElementOnLightBackground(target ?? document.body));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateContrast);
    };

    updateContrast();
    window.setTimeout(updateContrast, 250);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [navRef]);

  return isOnLight;
}
