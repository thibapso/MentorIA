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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const validCards = cardRefs.current.filter(Boolean);
      if (validCards.length === 0) return;

      validCards.forEach((card, idx) => {
        if (card) {
          gsap.set(card, {
            transform: transformStyles[idx] ?? "none",
            clearProps: "transition",
          });

          gsap.to(card, {
            transform: transformStyles[idx] ?? "none",
            duration: 0,
          });
        }
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [transformStyles]);

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
        threshold: 0.1,
        rootMargin: "50px",
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

    const validCards = cardRefs.current.filter(Boolean);
    if (validCards.length === 0) return;

    setCanHover(false);

    const totalDuration = animationDelay + 1 + (validCards.length * animationStagger);

    gsap.fromTo(
      validCards,
      { scale: 0 },
      {
        scale: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
        duration: 1,
        onComplete: () => {
          validCards.forEach((card, idx) => {
            if (card) {
              const baseTransform = transformStyles[idx] || "none";
              gsap.set(card, { transform: baseTransform });
            }
          });
        },
      }
    );

    const timer = setTimeout(() => {
      setCanHover(true);
    }, totalDuration * 1000);

    return () => clearTimeout(timer);
  }, [isVisible, animationStagger, easeType, animationDelay, enableHover, transformStyles]);

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
      if (!enableHover || !canHover) return;

      images.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;

        void card.offsetHeight;

        gsap.killTweensOf(card);
        const baseTransform = transformStyles[i] || "none";

        if (i === hoveredIdx) {
          const noRotation = getNoRotationTransform(baseTransform);
          gsap.to(card, {
            transform: noRotation,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
            force3D: true,
          });
        } else {
          const offsetX = i < hoveredIdx ? -120 : 120;
          const pushedTransform = getPushedTransform(baseTransform, offsetX);
          const distance = Math.abs(hoveredIdx - i);
          const delay = distance * 0.03;

          gsap.to(card, {
            transform: pushedTransform,
            duration: 0.3,
            ease: "power2.out",
            delay,
            overwrite: true,
            force3D: true,
          });
        }
      });
    },
    [
      enableHover,
      canHover,
      images,
      transformStyles,
      getNoRotationTransform,
      getPushedTransform,
    ]
  );

  const resetSiblings = useCallback(() => {
    if (!enableHover || !canHover) return;

    images.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      void card.offsetHeight;

      gsap.killTweensOf(card);
      const baseTransform = transformStyles[i] || "none";
      gsap.to(card, {
        transform: baseTransform,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
        force3D: true,
      });
    });
  }, [enableHover, canHover, images, transformStyles]);

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
          ref={(el) => {
            cardRefs.current[idx] = el;
          }}
          className={styles.card}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className={styles.image} src={src} alt={`Fundador ${idx + 1}`} />
        </div>
      ))}
    </div>
  );
}
