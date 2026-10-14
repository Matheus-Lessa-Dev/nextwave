"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

export function MobileMenu({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    }

    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && ref.current && !ref.current.contains(event.target)) {
        ref.current.open = false;
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  return (
    <details ref={ref} className="mobile-menu">
      <summary aria-label={label}>
        <Menu className="menu-open-icon" size={22} aria-hidden="true" />
        <X className="menu-close-icon" size={22} aria-hidden="true" />
      </summary>
      <div
        className="mobile-menu-panel"
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a") && ref.current) {
            ref.current.open = false;
          }
        }}
      >
        {children}
      </div>
    </details>
  );
}
