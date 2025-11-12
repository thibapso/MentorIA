'use client'

import { useEffect, useRef } from 'react'

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const particles: { x: number; y: number; r: number; speed: number; drift: number }[] = []
    const numParticles = 1500
    const fadeZone = 150 

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        drift: (Math.random() - 0.5) * 0.3
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach(p => {
        // movimento
        p.y -= p.speed
        p.x += p.drift

        // reinicia quando sai da tela
        if (p.y < 0) p.y = height
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        // opacidade normal
        let alpha = 0.05 + Math.random() * 0.05

        // diminui opacidade na parte inferior
        if (p.y > height - fadeZone) {
          const factor = (height - p.y) / fadeZone // 0 na base, 1 no limite do fade
          alpha *= factor
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none'
      }}
    />
  )
}
