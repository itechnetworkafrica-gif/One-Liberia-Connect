"use client";

import { useEffect, useRef, useState } from "react";

const target = 250_000;

export function AmbitionCounter() {
  const element = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(target);

  useEffect(() => {
    const node = element.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCount(target);
          return;
        }

        const startedAt = performance.now();
        const duration = 1300;
        setCount(0);
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.65 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={element} aria-label="250,000">
      {count.toLocaleString("en-US")}
    </span>
  );
}
