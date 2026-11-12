"use client";

import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { imageBlurData } from "@/components/Blocks";

const slides = [
  {
    src: "/images/partners-tower.jpg",
    alt: "Connectivity equipment above a Liberian community",
    caption: "Planning with local priorities in view",
  },
  {
    src: "/images/mission.jpg",
    alt: "One Liberia team speaking with residents at a local market",
    caption: "Listening to community voices",
  },
  {
    src: "/images/vision.jpg",
    alt: "Two people learning together with a laptop",
    caption: "Planning technology hubs in partner schools",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <div className="hero-visual" role="region" aria-roledescription="carousel" aria-label="One Liberia Connect highlights">
      <div className="hero-photo">
        {slides.map((slide, index) => (
          <div className={`hero-slide ${index === active ? "is-active" : ""}`} key={slide.src} aria-hidden={index !== active}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 760px) 100vw, 48vw"
              placeholder="blur"
              blurDataURL={imageBlurData}
            />
          </div>
        ))}
      </div>
      <div className="floating-card">
        <span className="floating-label">Explore our work</span>
        <Link href="/our-services"><span className="floating-icon">01</span><span>Community broadband</span><span className="floating-chevron">›</span></Link>
        <Link href="/our-services#technology-hubs"><span className="floating-icon">02</span><span>Technology hubs in partner schools</span><span className="floating-chevron">›</span></Link>
        <Link href="/partners-and-investors"><span className="floating-icon">03</span><span>Partners and investors</span><span className="floating-chevron">›</span></Link>
      </div>
      <div className="hero-image-caption" aria-live="polite">{slides[active].caption}</div>
      <div className="hero-controls">
        <div className="hero-dots" role="group" aria-label="Choose a hero slide">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              className={`hero-dot ${index === active ? "is-active" : ""}`}
              type="button"
              aria-label={`Show slide ${index + 1}: ${slide.caption}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        {!reduceMotion && (
          <button
            className="hero-carousel-toggle"
            type="button"
            aria-label={paused ? "Resume automatic slides" : "Pause automatic slides"}
            title={paused ? "Resume slides" : "Pause slides"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={14} fill="currentColor"/> : <Pause size={14}/>}
          </button>
        )}
      </div>
    </div>
  );
}
