"use client";

import { inView } from "motion";
import { animate } from "motion/mini";
import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  index?: number;
  stagger?: number;
};

const offsets = {
  up: "translateY(20px)",
  down: "translateY(-20px)",
  left: "translateX(20px)",
  right: "translateX(-20px)",
  none: "translateY(0px)",
};

/**
 * SSR sempre visível. Prepara apenas conteúdo ainda abaixo da viewport,
 * evitando o flash visível → oculto em carregamentos lentos ou links diretos.
 */
export function Reveal({
  children,
  className = "",
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.55,
  index = 0,
  stagger = 0.08,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const revealed = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || revealed.current) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      preference.matches ||
      duration <= 0 ||
      !("IntersectionObserver" in window) ||
      typeof element.animate !== "function" ||
      element.getBoundingClientRect().top < window.innerHeight
    ) {
      revealed.current = true;
      return;
    }

    const initialOpacity = element.style.opacity;
    const initialTransform = element.style.transform;
    let animation: ReturnType<typeof animate> | undefined;
    let stopObserving = () => {};

    function restoreStyles() {
      element!.style.opacity = initialOpacity;
      element!.style.transform = initialTransform;
    }

    function finish() {
      revealed.current = true;
      stopObserving();
      animation?.cancel();
      restoreStyles();
      element!.removeEventListener("focusin", finish);
      preference.removeEventListener("change", onPreferenceChange);
    }

    function onPreferenceChange() {
      if (preference.matches) finish();
    }

    element.style.opacity = "0";
    element.style.transform = offsets[direction];
    element.addEventListener("focusin", finish);
    preference.addEventListener("change", onPreferenceChange);

    stopObserving = inView(element, () => {
      if (revealed.current) return;
      revealed.current = true;
      animation = animate(
        element,
        { opacity: [0, 1], transform: [offsets[direction], "none"] },
        {
          duration,
          delay: Math.max(0, delay + index * stagger),
          ease: [0.22, 1, 0.36, 1],
        },
      );
      // Remove estilos inline ao terminar para liberar o hover definido em CSS.
      void animation.then(finish);
    });

    return () => {
      stopObserving();
      animation?.cancel();
      restoreStyles();
      element.removeEventListener("focusin", finish);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [direction, delay, duration, index, stagger]);

  const Tag = as;
  return (
    <Tag ref={(element: HTMLElement | null) => { ref.current = element; }} className={className} data-reveal>
      {children}
    </Tag>
  );
}
