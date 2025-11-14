import { useEffect, useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./BounceCards.module.scss";

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = false,
}: BounceCardsProps) {
  const animatedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentContainer = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            setIsVisible(true);
            animatedRef.current = true;
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    gsap.fromTo(
      ".card",
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
      }
    );
  }, [isVisible, animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = useCallback((transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
      return "rotate(0deg)";
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  }, []);

  const getPushedTransform = useCallback(
    (baseTransform: string, offsetX: number): string => {
      const translateRegex = /translate\(([-0-9.]+)px\)/;
      const match = baseTransform.match(translateRegex);
      if (match) {
        const currentX = parseFloat(match[1]);
        const newX = currentX + offsetX;
        return baseTransform.replace(translateRegex, `translate(${newX}px)`);
      } else {
        return baseTransform === "none"
          ? `translate(${offsetX}px)`
          : `${baseTransform} translate(${offsetX}px)`;
      }
    },
    []
  );

  const pushSiblings = useCallback(
    (hoveredIdx: number) => {
      if (!enableHover) return;

      images.forEach((_, i) => {
        gsap.killTweensOf(`.card-${i}`);
        const baseTransform = transformStyles[i] || "none";

        if (i === hoveredIdx) {
          const noRotation = getNoRotationTransform(baseTransform);
          gsap.to(`.card-${i}`, {
            transform: noRotation,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          const offsetX = i < hoveredIdx ? -120 : 120;
          const pushedTransform = getPushedTransform(baseTransform, offsetX);
          const distance = Math.abs(hoveredIdx - i);
          const delay = distance * 0.03;

          gsap.to(`.card-${i}`, {
            transform: pushedTransform,
            duration: 0.3,
            ease: "power2.out",
            delay,
            overwrite: "auto",
          });
        }
      });
    },
    [
      enableHover,
      images,
      transformStyles,
      getNoRotationTransform,
      getPushedTransform,
    ]
  );

  const resetSiblings = useCallback(() => {
    if (!enableHover) return;

    images.forEach((_, i) => {
      gsap.killTweensOf(`.card-${i}`);
      const baseTransform = transformStyles[i] || "none";
      gsap.to(`.card-${i}`, {
        transform: baseTransform,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [enableHover, images, transformStyles]);

  return (
    <div
      ref={containerRef}
      className={`${styles.bounceCardsContainer} ${className}`}
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx} ${styles.card}`}
          style={{ transform: transformStyles[idx] ?? "none" }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className={styles.image} src={src} alt={`Fundador ${idx + 1}`} />
        </div>
      ))}
    </div>
  );
}
