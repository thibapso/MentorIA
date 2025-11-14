"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AnimatedList.module.scss";

interface Notification {
  name: string;
  message: string;
  time: string;
  icon: string;
}

interface AnimatedListProps {
  notifications: Notification[];
  stackGap?: number;
  columnGap?: number;
  scaleFactor?: number;
  scrollDownDuration?: number;
  formationDuration?: number;
}

export default function AnimatedList({
  notifications,
  stackGap = 20,
  columnGap = 85,
  scaleFactor = 0.05,
  scrollDownDuration = 5,
  formationDuration = 1,
}: AnimatedListProps) {
  const [phase, setPhase] = useState<
    "idle" | "forming" | "scrolling" | "resetting"
  >("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const currentContainer = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
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

    const cycle = async () => {
      setPhase("idle");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPhase("forming");
      await new Promise((resolve) =>
        setTimeout(resolve, formationDuration * 1000)
      );

      setPhase("scrolling");
      await new Promise((resolve) =>
        setTimeout(resolve, scrollDownDuration * 1000)
      );

      setPhase("resetting");
      await new Promise((resolve) => setTimeout(resolve, 500));

      cycle();
    };

    cycle();
  }, [isVisible, scrollDownDuration, formationDuration]);

  const getItemStyle = (index: number) => {
    const reverseIndex = notifications.length - 1 - index;

    switch (phase) {
      case "idle":
        return {
          y: -reverseIndex * stackGap,
          scale: 1 - reverseIndex * scaleFactor,
          opacity: 1 - reverseIndex * 0.04,
          zIndex: notifications.length - reverseIndex,
        };
      case "forming":
        return {
          y: -index * columnGap,
          scale: 1,
          opacity: 1,
          zIndex: notifications.length - index,
        };
      case "scrolling":
        return {
          y: -index * columnGap + notifications.length * columnGap,
          scale: 1,
          opacity: 1,
          zIndex: notifications.length - index,
        };
      case "resetting":
        return {
          y: -reverseIndex * stackGap,
          scale: 1 - reverseIndex * scaleFactor,
          opacity: 1 - reverseIndex * 0.04,
          zIndex: notifications.length - reverseIndex,
        };
      default:
        return {
          y: 0,
          scale: 1,
          opacity: 1,
          zIndex: 1,
        };
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <AnimatePresence>
        {notifications.map((notification, index) => {
          const style = getItemStyle(index);
          return (
            <motion.div
              key={index}
              className={styles.notification}
              initial={{ scale: 0.8 }}
              animate={{
                ...style,
                transition: {
                  duration:
                    phase === "forming"
                      ? formationDuration
                      : phase === "scrolling"
                      ? scrollDownDuration
                      : 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{ scale: 0.8 }}
            >
              <div className={styles.icon}>
                <img src={notification.icon} alt={notification.name} />
              </div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <span className={styles.name}>{notification.name}</span>
                  <span className={styles.time}>{notification.time}</span>
                </div>
                <span className={styles.message}>{notification.message}</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
