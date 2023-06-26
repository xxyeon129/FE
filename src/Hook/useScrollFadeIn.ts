import { useRef, useCallback, useEffect } from 'react';

const useScrollFadeIn = (direction: string, duration: number, delay: number) => {
  const dom: React.RefObject<HTMLDivElement> = useRef(null);

  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = dom;

      if (entry.isIntersecting && current) {
        current.style.transitionProperty = 'all';
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = '1';
        current.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    [delay, duration]
  );

  const handleDirection = (direction: string) => {
    switch (direction) {
      case 'down':
        return 'translate3d(0, -50%, 0)';
      case 'left':
        return 'translate3d(50%, 0, 0)';
      case 'listDown':
        return 'translate3d(0, -10%, 0)';
      default:
        return;
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.2 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return { ref: dom, style: { opacity: 0, transform: handleDirection(direction) } };
};

export default useScrollFadeIn;
