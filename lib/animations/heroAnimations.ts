import { gsap } from 'gsap'

export function cycleWords(wordElement: HTMLElement | null) {
  if (!wordElement) return

  const words = ['direção.', 'clareza.', 'uma chance.', 'MentorIA.']
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 }) // pequena pausa entre ciclos

  words.forEach((word, i) => {
    const isLast = i === words.length - 1
    const fadeDuration = 0.3 // transição suave de opacidade
    const moveDistance = 2.5 // leve movimento vertical
    const holdDuration = isLast ? 1.5 : 1 // tempo de exibição da palavra

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
      .to({}, { duration: holdDuration }) // pausa antes da próxima palavra
  })
}
