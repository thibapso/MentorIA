"use client";

import styles from "./Product.module.scss";
import Typewriter from "@/components/ui/Typewriter";
import SkillsAutocomplete from "./SkillsAutocomplete";

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
        
        <p className={styles.subtitle}>
          Descubra as competências essenciais para sua área
        </p>

        <div className={styles.autocompleteWrapper}>
          <SkillsAutocomplete />
        </div>

        <p className={styles.hint}>
          Digite para buscar entre 15 áreas profissionais disponíveis
        </p>
      </div>
    </section>
  );
}
