"use client";

import { useEffect, useState, useRef } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  speed?: number;
  delay?: number;
  showCursor?: boolean;
}

export default function Typewriter({
  text,
  className = "",
  tag: Tag = "h2",
  speed = 50,
  delay = 0,
  showCursor = true,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    const timeoutId = setTimeout(() => {
      let currentIndex = 0;

      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isVisible, text, speed, delay]);

  return (
    <Tag ref={elementRef} className={className}>
      {displayedText}
      {showCursor && displayedText.length < text.length && (
        <span className="typewriter-cursor">|</span>
      )}
    </Tag>
  );
}

