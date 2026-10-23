"use client";

import { useEffect, useRef } from "react";

/**
 * A soft spotlight that lazily follows the mouse. Only runs on devices with a
 * real pointer, and never when the visitor prefers reduced motion.
 */
export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    if (!el) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0, seen = false;

    const tick = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame =
        Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    };
    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!seen) {
        seen = true;
        x = targetX;
        y = targetY;
        el.dataset.active = "true";
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      seen = false;
      el.dataset.active = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-glow" ref={glow} aria-hidden="true" />;
}
