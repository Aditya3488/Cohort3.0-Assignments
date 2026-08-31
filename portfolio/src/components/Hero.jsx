import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import IDCard from './IDCard'
import CodeRainBackground from './CodeRainBackground'
import { useTypewriter } from '../hooks/useTypewriter'

export default function Hero() {
  const containerRef = useRef(null)

  const name = useTypewriter("Hi, I'm Aditya", { loop: false, typingSpeed: 70 })
  const role = useTypewriter(
    ['Frontend Developer', 'React Developer', 'UI Engineer'],
    { loop: true, typingSpeed: 80, deletingSpeed: 45, pauseTime: 1500 }
  )

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('.hero-line', { opacity: 0, y: 60, duration: 0.9, stagger: 0.08 })
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col lg:flex-row items-center gap-12 px-8 md:px-16 pt-32 lg:pt-0 overflow-hidden"
    >
      <CodeRainBackground className="z-0" />

      <div className="relative z-10 flex-1">
        <p className="font-display text-2xl md:text-3xl mb-2 min-h-[2.5rem]">
          {name}
          <span className="typing-cursor">|</span>
        </p>

        <p className="text-accent uppercase tracking-widest text-sm mb-4 min-h-[1.25rem]">
          {role}
          <span className="typing-cursor">|</span>
        </p>

        <h1 className="font-display text-[12vw] lg:text-[5.5vw] leading-[0.95] tracking-tight overflow-hidden">
          <span className="hero-line block">Building things</span>
          <span className="hero-line block">for the web.</span>
        </h1>
        <p className="hero-sub mt-8 max-w-md text-muted text-lg">
          I design and build fast, motion-driven interfaces — this site
          included, built with React, GSAP and Lenis.
        </p>
      </div>

      <div className="relative z-10 self-start pt-20 lg:pt-16">
        <IDCard />
      </div>
    </section>
  )
}