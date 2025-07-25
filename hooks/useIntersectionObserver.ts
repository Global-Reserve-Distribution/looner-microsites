'use client';

import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverProps {
  ref: RefObject<Element>;
  options?: IntersectionObserverInit;
}

export function useIntersectionObserver({
  ref,
  options = {}
}: UseIntersectionObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options]);

  return { isIntersecting, isVisible };
}