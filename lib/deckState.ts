/**
 * Mutable state shared by the scroll tracker (DOM) and the 3D scene.
 * Kept outside React so scrolling never re-renders the scene.
 */
export const deckState = {
  /** Scroll position in "project units": -1 is the intro, 0..n-1 are projects. */
  target: -1,
  /** Pointer position over the page, -1..1 on each axis (desktop only). */
  pointerX: 0,
  pointerY: 0,
  /** Whether the stage is on screen; the scene skips frames when it is not. */
  visible: true,
  /** Set by the scene so DOM events can request a frame under frameloop="demand". */
  invalidate: () => {},
};
