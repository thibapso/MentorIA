"use client";

import styles from "./Product.module.scss";
import Typewriter from "@/components/ui/Typewriter";
import SkillsComparison from "./SkillsComparison";

interface ProductProps {
  id?: string;
}

export default function Product({ id }: ProductProps) {
  return (
    <section id={id} className={styles.product}>
      <div className={styles.container}>
        <Typewriter
          text="Compare suas Competências"
          className={styles.title}
          tag="h2"
          speed={80}
          delay={200}
          showCursor={false}
        />
        
        <p className={styles.subtitle}>
          <i>Descubra como seu perfil se alinha com as competências essenciais da sua área</i>
        </p>

        <div className={styles.comparisonWrapper}>
          <SkillsComparison />
        </div>
      </div>
    </section>
  );
}
