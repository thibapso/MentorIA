"use client";

import styles from "./Product.module.scss";
import Typewriter from "@/components/ui/Typewriter";

interface ProductProps {
  id?: string;
}

export default function Product({ id }: ProductProps) {
  return (
    <section id={id} className={styles.product}>
      <div className={styles.container}>
        <Typewriter
          text="Transforme seu Currículo"
          className={styles.title}
          tag="h2"
          speed={80}
          delay={200}
          showCursor={false}
        />
      </div>
    </section>
  );
}
