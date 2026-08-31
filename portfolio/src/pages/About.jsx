import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Download } from 'lucide-react'
import { experience, education } from '../data/experience'
import { techIcons } from '../data/techIcons'
import TechScreen from '../components/TechScreen'
import ExperienceCard from '../components/ExperienceCard'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef(null)
  const cardRefs = useRef([])

  const timelineEntries = [
    { ...education, isEducation: true },
    ...experience,
  ]

  useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.timeline-dot-current', {
      scale: 1.6,
      opacity: 0.4,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.from('.skill-pill', {
      opacity: 0,
      y: 12,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, containerRef)

  return () => ctx.revert()
}, [])

  return (
    <div ref={containerRef} className="px-8 md:px-16 pt-32 pb-32 max-w-4xl mx-auto">
      <p className="text-accent uppercase tracking-widest text-sm mb-3">About</p>
      <h1 className="font-display text-5xl md:text-6xl mb-6">The journey so far.</h1>
      <p className="text-muted text-lg max-w-2xl mb-4">
        Web developer based in Delhi, building fast, conversion-focused
        interfaces — from Shopify storefronts serving real customers to
        React and Next.js applications from the ground up.
      </p>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm border border-line px-4 py-2 rounded-full hover:border-accent transition-colors mb-24"
      >
        <Download size={16} /> Download Resume
      </a>

      {/* STACKED CARDS — har entry apna sticky offset le raha hai
          (24px badhta jaata hai), isliye jab cards stack hote hain to
          pichhle cards ka thoda top-edge peeking rehta hai */}
      <div className="space-y-8">
        {timelineEntries.map((entry, i) => (
          <ExperienceCard
            key={entry.company || entry.school}
            entry={entry}
            index={i}
            cardRef={(el) => (cardRefs.current[i] = el)}
            topOffset={96 + i * 24}
          />
        ))}
      </div>

      {/* TECH */}
      <div className="mt-40">
        <p className="text-accent uppercase tracking-widest text-sm mb-8 text-center">
          Tech I work with
        </p>
        <TechScreen items={techIcons} />
      </div>
    </div>
  )
}