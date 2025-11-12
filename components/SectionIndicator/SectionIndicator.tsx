"use client";

import { useEffect, useState } from "react";
import styles from "./SectionIndicator.module.scss";

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target as HTMLElement);
            setActiveSection(index);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const sections = ["Hero", "Discover", "Footer"];

  const scrollToSection = (index: number) => {
    const section = document.querySelectorAll("section")[index];
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.indicator}>
      {sections.map((_, index) => (
        <button
          key={index}
          className={`${styles.bar} ${index === activeSection ? styles.active : ""}`}
          onClick={() => scrollToSection(index)}
          aria-label={`Ir para seção ${index + 1}`}
        />
      ))}
    </div>
  );
}

