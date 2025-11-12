'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './BackToTop.module.scss'
import { animateBackToTop, initBackToTopAnimation } from '@/lib/animations/backToTopAnimation'

export default function BackToTop() {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Inicializa a animação com o estado escondido
    initBackToTopAnimation(buttonRef.current)

    const handleScroll = () => {
      // Obtém a altura da primeira section (Hero)
      const firstSection = document.querySelector('#hero')
      
      if (firstSection) {
        const firstSectionHeight = firstSection.getBoundingClientRect().height
        const scrollPosition = window.scrollY
        
        // Mostra o botão quando passar da primeira section
        const shouldShow = scrollPosition > firstSectionHeight
        
        if (shouldShow !== isVisible) {
          setIsVisible(shouldShow)
          animateBackToTop(buttonRef.current, shouldShow)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // Verifica a posição inicial
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={buttonRef} className={styles.button} onClick={handleClick}>
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
        >
          <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
        </svg>
      </a>
    </div>
  )
}
