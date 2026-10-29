"use client";

type Props = {
  /** id of the element to scroll to */
  target: string;
  /** optionally focus this element once the scroll has settled */
  focusId?: string;
  className?: string;
  children: React.ReactNode;
};

/** A tiny client-side button so section components can stay server-rendered. */
export default function ScrollButton({ target, focusId, className, children }: Props) {
  return (
    <button
      className={className}
      onClick={() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(target)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        if (focusId) {
          window.setTimeout(() => {
            document.getElementById(focusId)?.focus({ preventScroll: true });
          }, reduceMotion ? 0 : 450);
        }
      }}
    >
      {children}
    </button>
  );
}
