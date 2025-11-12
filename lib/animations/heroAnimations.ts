import { gsap } from 'gsap'

export function cycleWords(wordElement: HTMLElement | null) {
  if (!wordElement) return

  const words = ['direção.', 'clareza.', 'uma chance.', 'MentorIA.']
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 }) 

  words.forEach((word, i) => {
    const isLast = i === words.length - 1
    const fadeDuration = 0.3 
    const moveDistance = 2.5 
    const holdDuration = isLast ? 1.5 : 1

    tl.to(wordElement, {
      opacity: 0,
      y: -moveDistance,
      duration: fadeDuration,
      ease: 'power1.out',
      onComplete: () => {
        wordElement.textContent = word
      }
    })
      .to(wordElement, {
        opacity: 1,
        y: 0,
        duration: fadeDuration,
        ease: 'power1.inOut'
      })
      .to({}, { duration: holdDuration }) 
  })
}
