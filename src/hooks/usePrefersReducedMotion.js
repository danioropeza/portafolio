/**
 * https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
 */

import { useState, useEffect } from 'react';
const NO_PREFERENCE_QUERY = '(prefers-reduced-motion: no-preference)';
const IS_MOBILE_QUERY = '(max-width: 1080px)';
const isRenderingOnServer = typeof window === 'undefined';

// For our initial server render, we won't know if the user
// prefers reduced motion, but it doesn't matter. This value
// will be overwritten on the client, before any animations
// occur.
const getInitialState = () => isRenderingOnServer ? true : (!window.matchMedia(NO_PREFERENCE_QUERY).matches || window.matchMedia(IS_MOBILE_QUERY).matches);

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState);

  useEffect(() => {
    const checkNoPreference = window.matchMedia(NO_PREFERENCE_QUERY);
    const checkIsMobile = window.matchMedia(IS_MOBILE_QUERY);

    const listenerNoPreferece = event => {
      setPrefersReducedMotion(!event.matches);
    };
    const listenerIsMobile = event => {
      setPrefersReducedMotion(event.matches);
    };

    checkNoPreference.addListener(listenerNoPreferece);
    checkIsMobile.addListener(listenerIsMobile);

    return () => {
      checkNoPreference.removeListener(listenerNoPreferece);
      checkIsMobile.removeListener(listenerIsMobile);
    };
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
