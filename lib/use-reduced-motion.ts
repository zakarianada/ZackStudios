"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

export function useReducedMotionPreference() {
  // Match the server during hydration, then apply the visitor's preference.
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
