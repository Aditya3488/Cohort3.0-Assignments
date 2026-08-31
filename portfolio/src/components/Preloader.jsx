import { useLayoutEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import gsap from 'gsap'
import { setLoading } from '../features/ui/uiSlice'

export default function Preloader() {
  const dispatch = useDispatch()
  const containerRef = useRef(null)
  const counterRef = useRef(null)

  useLayoutEffect(() => {
    const counter = { val: 0 }
    const tl = gsap.timeline()

    tl.to(counter, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.val)
        }
      },
    }).to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.1,
      onComplete: () => dispatch(setLoading(false)),
    })

    return () => tl.kill()
  }, [dispatch])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-ink flex flex-col justify-between p-8 md:p-12">
      <p className="uppercase tracking-widest text-sm text-muted">Loading</p>
      <div className="flex items-end justify-between">
        <p className="font-display text-2xl md:text-3xl">Aditya.dev</p>
        <p className="font-display text-[18vw] md:text-[10vw] leading-none tabular-nums">
          <span ref={counterRef}>0</span>
          <span className="text-accent">%</span>
        </p>
      </div>
    </div>
  )
}