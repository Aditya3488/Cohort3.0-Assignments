import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * WHY THIS HOOK EXISTS:
 *
 * Lenis intercepts native scroll and replaces it with an animated,
 * inertia-based scroll. Problem: GSAP's ScrollTrigger listens to the
 * NATIVE scroll event by default. If you just drop <ReactLenis> in and
 * walk away, ScrollTrigger's scroll-position math goes stale and your
 * pinned/scrubbed animations jitter or fire at the wrong scroll offset.
 *
 * The fix is two-way sync:
 *   1. On every Lenis scroll tick, tell ScrollTrigger to re-check ("update").
 *   2. Put ScrollTrigger's own refresh (which runs on gsap's ticker) in
 *      lockstep with Lenis's render loop via lenis.on / gsap.ticker.
 *
 * This hook is called ONCE at the app root (see App.jsx) — smooth scroll
 * is a page-level concern, not something you re-initialize per component.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    })

    // 1. Keep ScrollTrigger's internal scroll position in sync with Lenis.
    lenis.on('scroll', ScrollTrigger.update)

    // 2. Drive Lenis's raf loop from GSAP's ticker instead of its own
    //    requestAnimationFrame, so both stay perfectly in the same frame.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
}
