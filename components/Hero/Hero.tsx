'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { cycleWords } from '@/lib/animations/heroAnimations'
import LightRays from './LightRays'
import HeroParticles from './HeroParticles'
import styles from './Hero.module.scss'

export default function Hero() {
  const wordRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    cycleWords(wordRef.current)
  }, [])

  return (
    <section className={styles.hero}>
      <LightRays />
      <HeroParticles />

      <div className={styles.content}>
        <span className={styles.name}>MentorIA</span>

        <h1 className={styles.title}>
          Às vezes, o que falta não é talento. É{' '}
          <span ref={wordRef} className={styles.word}>
            direção.
          </span>
        </h1>

        <p className={styles.subtitle}>
          <i>O MentorIA te guia com propósito, evolução e autoconfiança.</i>
          <br />
          Toda jornada começa quando alguém aponta o norte. Está pronto para ouvir quem quer te ver crescer?
        </p>

        <div className={styles.cta}>
          <Link href="#discover" className={styles.ctaPrimary}>
            Viva o novo
            <Image
              src="/brain-cta.svg"
              alt="Ícone de cérebro"
              width={20}
              height={20}
            />
          </Link>
          <Link href="#" className={styles.ctaSecondary}>
            Utilize
          </Link>
        </div>
      </div>
    </section>
  )
}
