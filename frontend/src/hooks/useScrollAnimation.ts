import { useEffect, useState, RefObject } from 'react';

/**
 * Hook for scroll-triggered animations
 * Usage: const { ref, isVisible } = useScrollAnimation();
 */
export const useScrollAnimation = (threshold = 0.1): {
  ref: RefObject<HTMLDivElement>;
  isVisible: boolean;
} => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useState<RefObject<HTMLDivElement>>({ current: null })[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return { ref, isVisible };
};

export default useScrollAnimation;

