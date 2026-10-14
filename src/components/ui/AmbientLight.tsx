"use client";

import { springValue } from "motion";
import { useEffect, useRef } from "react";

type Variant = "hero" | "card";

const pointerSpring = { stiffness: 140, damping: 28, mass: 0.6, restDelta: 0.1, restSpeed: 0.1 };
const depthSpring = { stiffness: 80, damping: 24, mass: 0.7, restDelta: 0.01, restSpeed: 0.01 };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Um controlador local por superfície; nenhum estado React é atualizado pelo ponteiro. */
function trackPointer(host: HTMLElement, boundary: HTMLSpanElement, light: HTMLSpanElement, variant: Variant) {
  const x = springValue<number>(0, pointerSpring);
  const y = springValue<number>(0, pointerSpring);
  const depthX = variant === "hero" ? springValue<number>(0, depthSpring) : undefined;
  const depthY = variant === "hero" ? springValue<number>(0, depthSpring) : undefined;
  const decorations = Array.from(host.querySelectorAll<HTMLElement>("[data-ambient-depth]")).map(element => ({
    element,
    depth: clamp(Number(element.dataset.ambientDepth) || 0, -1, 1),
    initialTranslate: element.style.translate,
  }));

  let frame = 0;
  let inside = false;
  let pointer: { x: number; y: number } | null = null;

  function render() {
    frame = 0;
    if (pointer) {
      // Uma leitura por frame, antes das escritas. Também acompanha o scroll e o hover do card.
      const bounds = host.getBoundingClientRect();
      const localX = clamp(pointer.x - bounds.left, 0, bounds.width);
      const localY = clamp(pointer.y - bounds.top, 0, bounds.height);
      x.set(localX);
      y.set(localY);
      // Cada eixo vai até 7px: mesmo na diagonal, o deslocamento total fica abaixo de 10px.
      depthX?.set((localX / Math.max(1, bounds.width) * 2 - 1) * 7);
      depthY?.set((localY / Math.max(1, bounds.height) * 2 - 1) * 7);
      pointer = null;
    }

    light.style.transform = `translate3d(${x.get().toFixed(2)}px, ${y.get().toFixed(2)}px, 0)`;
    for (const { element, depth } of decorations) {
      // Translate independente preserva as rotações e transforms originais da arte.
      element.style.translate = `${((depthX?.get() ?? 0) * depth).toFixed(2)}px ${((depthY?.get() ?? 0) * depth).toFixed(2)}px`;
    }
  }

  function scheduleRender() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  function enter(event: PointerEvent) {
    if (event.pointerType === "touch" || !event.isPrimary) return;
    const bounds = host.getBoundingClientRect();
    // Posiciona a luz enquanto ainda transparente; o parallax parte suavemente do repouso.
    x.jump(clamp(event.clientX - bounds.left, 0, bounds.width));
    y.jump(clamp(event.clientY - bounds.top, 0, bounds.height));
    inside = true;
    boundary.setAttribute("data-active", "");
    move(event);
  }

  function move(event: PointerEvent) {
    if (event.pointerType === "touch" || !event.isPrimary) return;
    if (!inside) { enter(event); return; }
    pointer = { x: event.clientX, y: event.clientY };
    scheduleRender();
  }

  function leave() {
    inside = false;
    pointer = null;
    boundary.removeAttribute("data-active");
    x.jump(x.get());
    y.jump(y.get());
    depthX?.set(0);
    depthY?.set(0);
  }

  const values = [x, y, ...(depthX && depthY ? [depthX, depthY] : [])];
  const subscriptions = values.map(value => value.on("change", scheduleRender));
  host.addEventListener("pointerenter", enter, { passive: true });
  host.addEventListener("pointermove", move, { passive: true });
  host.addEventListener("pointerleave", leave, { passive: true });
  host.addEventListener("pointercancel", leave, { passive: true });

  return () => {
    host.removeEventListener("pointerenter", enter);
    host.removeEventListener("pointermove", move);
    host.removeEventListener("pointerleave", leave);
    host.removeEventListener("pointercancel", leave);
    subscriptions.forEach(unsubscribe => unsubscribe());
    values.forEach(value => value.destroy());
    window.cancelAnimationFrame(frame);
    boundary.removeAttribute("data-active");
    light.style.removeProperty("transform");
    decorations.forEach(({ element, initialTranslate }) => { element.style.translate = initialTranslate; });
  };
}

export function AmbientLight({ variant }: { variant: Variant }) {
  const boundaryRef = useRef<HTMLSpanElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const boundary = boundaryRef.current;
    const light = lightRef.current;
    const host = boundary?.parentElement;
    if (!boundary || !light || !host) return;

    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let stopTracking: (() => void) | undefined;

    function synchronize() {
      stopTracking?.();
      stopTracking = preference.matches ? trackPointer(host!, boundary!, light!, variant) : undefined;
    }

    synchronize();
    preference.addEventListener("change", synchronize);
    return () => {
      preference.removeEventListener("change", synchronize);
      stopTracking?.();
    };
  }, [variant]);

  return (
    <span ref={boundaryRef} className={`ambient-boundary ambient-${variant}`} aria-hidden="true">
      <span ref={lightRef} className="ambient-glow" />
    </span>
  );
}
