import { useEffect, useRef, useState } from "react";

/**
 * useScrollAnimation — triggers a CSS class when an element enters the viewport.
 * Uses IntersectionObserver (no external library).
 *
 * Usage:
 *   const { ref, isVisible } = useScrollAnimation();
 *   <section ref={ref} className={`my-section ${isVisible ? "animate-in" : ""}`}>
 */
const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing (animation only plays once)
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || "0px 0px -50px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
};

export default useScrollAnimation;
