type WebkitFullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type WebkitFullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

export async function enterLandscapeFullscreen(element: HTMLElement | null, fallbackVideo?: HTMLVideoElement | null) {
  if (!element) return;

  let enteredFullscreen = false;
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
      enteredFullscreen = true;
    } else {
      const webkitElement = element as WebkitFullscreenElement;
      if (webkitElement.webkitRequestFullscreen) {
        await webkitElement.webkitRequestFullscreen();
        enteredFullscreen = true;
      }
    }
  } catch {
    // The native iOS video fullscreen fallback below is more reliable on iPhones.
  }

  if (!enteredFullscreen && fallbackVideo) {
    (fallbackVideo as WebkitFullscreenVideo).webkitEnterFullscreen?.();
    return;
  }

  const orientation = screen.orientation as ScreenOrientation & {
    lock?: (orientation: "landscape") => Promise<void>;
  };
  try {
    await orientation.lock?.("landscape");
  } catch {
    // Some mobile browsers require the user to rotate after entering fullscreen.
  }
}
