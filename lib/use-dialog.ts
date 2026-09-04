"use client";

import { useEffect, useRef } from "react";

export function useDialog(open: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex="0"]',
    ) || []).filter((element) => element.getClientRects().length > 0);
    const focusTimer = window.setTimeout(() => focusable()[0]?.focus(), 0);

    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keydown);
      previousFocus?.focus();
    };
  }, [open]);

  return dialogRef;
}
