let audio: HTMLAudioElement | null = null;

/** Soft click when the theme is toggled. Fails silently if autoplay is blocked. */
export function playThemeSound() {
  try {
    audio ??= new Audio("/sounds/click.mp3");
    audio.volume = 0.45;
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  } catch {}
}
