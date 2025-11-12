import { gsap } from 'gsap'

export function animateBackToTop(element: HTMLElement | null, show: boolean) {
  if (!element) return

  if (show) {
    // Anima de baixo para cima (aparece)
    gsap.to(element, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      pointerEvents: 'auto'
    })
  } else {
    // Anima de cima para baixo (desaparece)
    gsap.to(element, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      pointerEvents: 'none'
    })
  }
}

export function initBackToTopAnimation(element: HTMLElement | null) {
  if (!element) return

  // Estado inicial: escondido abaixo
  gsap.set(element, {
    y: 100,
    opacity: 0,
    pointerEvents: 'none'
  })
}

