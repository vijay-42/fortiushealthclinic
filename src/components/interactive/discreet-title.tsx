"use client";

import { useEffect } from "react";

/**
 * Privacy feature: when this tab is in the background, its title becomes neutral
 * so condition names are not visible in the tab strip on a shared screen.
 */
export function DiscreetTitle() {
  useEffect(() => {
    let real = document.title;
    const neutral = "Fortius Health Clinic";
    const onVis = () => {
      if (document.hidden) {
        real = document.title;
        document.title = neutral;
      } else if (document.title === neutral) {
        document.title = real;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return null;
}
