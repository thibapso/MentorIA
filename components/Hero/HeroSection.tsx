'use client'

import LightRays from './LightRays'
import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <LightRays />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Bem-vindo à <span>Minha Landing</span>
        </h1>
        <p className={styles.subtitle}>
          Explore o conteúdo e descubra o poder do design e da performance.
        </p>
      </div>
    </section>
  )
}
