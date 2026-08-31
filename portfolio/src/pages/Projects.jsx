import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current

      // Kitni horizontal distance move karni hai = track ki poori width
      // minus jitna already viewport mein visible hai.
      const getScrollDistance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // end: jitni door horizontally scroll karna hai, utni hi vertical
          // scroll "duration" chahiye — isliye end value scroll-distance
          // pe based hai, na ki fixed pixel pe.
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,       // 1 second lag — Lenis ke smooth feel se match karta hai
          pin: true,       // section screen pe chipka rahega jab tak horizontal scroll poora na ho
          anticipatePin: 1,
          invalidateOnRefresh: true, // resize pe distances recalculate honge
        },
      })

      return () => tween.scrollTrigger?.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen overflow-hidden flex items-center">
      <div className="px-8 md:px-16 mb-10 absolute top-28">
        <h1 className="font-display text-5xl mb-2 ">Projects</h1>
        <p className="text-muted">Scroll to explore — drag or use your scroll wheel.</p>
      </div>

      <div ref={trackRef} className="flex gap-8 px-8 md:px-16 pt-24">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}