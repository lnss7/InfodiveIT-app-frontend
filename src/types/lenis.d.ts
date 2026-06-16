/**
 * Type definitions for Lenis smooth scroll library
 *
 * Lenis is exposed globally on the window object for smooth scrolling
 * across components without prop drilling.
 */

declare global {
  interface Window {
    lenis?: {
      /**
       * Scroll to a target element or position
       * @param target - HTMLElement, CSS selector, or numeric position
       * @param options - Scroll options
       */
      scrollTo: (
        target: HTMLElement | string | number,
        options?: {
          duration?: number;
          offset?: number;
          immediate?: boolean;
          lock?: boolean;
          onComplete?: () => void;
        },
      ) => void;

      /**
       * Destroy the Lenis instance and cleanup
       */
      destroy: () => void;

      /**
       * Start the scroll animation loop
       */
      start: () => void;

      /**
       * Stop the scroll animation loop
       */
      stop: () => void;
    };
  }
}

export {};

// Made with Bob
