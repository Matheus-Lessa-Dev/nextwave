"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Atualiza somente a superfície da navbar, sem renderizar sua árvore no scroll. */
export function NavbarSurface({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let wasScrolled = false;

    function updateSurface() {
      frame = 0;
      const scrolled = window.scrollY > 16;
      if (scrolled !== wasScrolled) {
        element!.toggleAttribute("data-scrolled", scrolled);
        wasScrolled = scrolled;
      }
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateSurface);
    }

    updateSurface();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      element.removeAttribute("data-scrolled");
    };
  }, []);

  return <header ref={ref} className="navbar">{children}</header>;
}
