import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import profileImg from '../assets/profile.jpeg'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Base geometry — in par hi lanyard ban ke shuru hoti hai. Top points
// FIXED rehte hain (ceiling se anchored), sirf neeche wale points
// drag offset ke hisaab se move honge.
const LEFT_TOP = [46, 0]
const LEFT_TOP_2 = [70, 0]
const LEFT_BOTTOM = [100, 208]
const LEFT_BOTTOM_2 = [88, 208]

const RIGHT_TOP = [134, 0]
const RIGHT_TOP_2 = [110, 0]
const RIGHT_BOTTOM = [80, 208]
const RIGHT_BOTTOM_2 = [92, 208]

const BUCKLE = { x: 78, y: 204, w: 24, h: 16 }
const SHORT_STRAP = { x: 85, y: 218, w: 10, h: 24 }
const CLIP = { cx: 90, cy: 248, r: 8 }

export default function IDCard() {
  const wrapperRef = useRef(null)
  const cardRef = useRef(null)
  const swingRef = useRef(null)
  const isFlippedRef = useRef(false)
  const swingTweenRef = useRef(null)

  // SVG element refs — inke attributes ko seedha update karenge, taaki
  // lanyard EXACTLY wahi pixel-distance stretch ho jitna card khud move
  // hua hai (approximation nahi, real geometry).
  const leftPolyRef = useRef(null)
  const rightPolyRef = useRef(null)
  const buckleRef = useRef(null)
  const buckleBorderRef = useRef(null)
  const shortStrapRef = useRef(null)
  const clipRef = useRef(null)

  // Har frame yahi function call hoga — dx,dy = card kitna pixel move
  // hua hai (Draggable ka this.x, this.y). Straps ke bottom points aur
  // buckle/clip sab isi offset se shift honge, top points fixed rahenge.
  function updateLanyard(dx, dy) {
    const lb = [LEFT_BOTTOM[0] + dx, LEFT_BOTTOM[1] + dy]
    const lb2 = [LEFT_BOTTOM_2[0] + dx, LEFT_BOTTOM_2[1] + dy]
    const rb = [RIGHT_BOTTOM[0] + dx, RIGHT_BOTTOM[1] + dy]
    const rb2 = [RIGHT_BOTTOM_2[0] + dx, RIGHT_BOTTOM_2[1] + dy]

    leftPolyRef.current?.setAttribute(
      'points',
      `${LEFT_TOP.join(',')} ${LEFT_TOP_2.join(',')} ${lb.join(',')} ${lb2.join(',')}`
    )
    rightPolyRef.current?.setAttribute(
      'points',
      `${RIGHT_TOP.join(',')} ${RIGHT_TOP_2.join(',')} ${rb.join(',')} ${rb2.join(',')}`
    )
    buckleRef.current?.setAttribute('x', BUCKLE.x + dx)
    buckleRef.current?.setAttribute('y', BUCKLE.y + dy)
    buckleBorderRef.current?.setAttribute('x', BUCKLE.x + dx)
    buckleBorderRef.current?.setAttribute('y', BUCKLE.y + dy)
    shortStrapRef.current?.setAttribute('x', SHORT_STRAP.x + dx)
    shortStrapRef.current?.setAttribute('y', SHORT_STRAP.y + dy)
    clipRef.current?.setAttribute('cx', CLIP.cx + dx)
    clipRef.current?.setAttribute('cy', CLIP.cy + dy)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current
      const swing = swingRef.current

      gsap.set(swing, { transformOrigin: 'top center' })

      gsap.from(swing, {
        y: -600,
        opacity: 0,
        duration: 1.6,
        delay: 0.6,
        ease: 'bounce.out',
        clearProps: 'opacity',
      })

      swingTweenRef.current = gsap.to(swing, {
        rotation: 3,
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      })

      // proxy object jo animate hoga jab card wapas snap hota hai —
      // GSAP SVG "points" attribute ko directly tween nahi kar sakta,
      // isliye ek plain {dx,dy} object tween karke onUpdate mein
      // updateLanyard() call karte hain, jaise Preloader ke counter mein tha.
      const proxy = { dx: 0, dy: 0 }

      Draggable.create(card, {
        type: 'x,y',
        inertia: true,
        onPress: function () {
          swingTweenRef.current?.pause()
          gsap.to(card, { scale: 1.04, duration: 0.2 })
        },
        onDrag: function () {
          gsap.set(card, { rotation: this.x * 0.04 })
          proxy.dx = this.x
          proxy.dy = this.y
          updateLanyard(this.x, this.y)
        },
        onDragEnd: function () {
          gsap.to(card, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.3,
            ease: 'elastic.out(1, 0.3)',
            onComplete: () => swingTweenRef.current?.play(),
          })
          gsap.to(proxy, {
            dx: 0,
            dy: 0,
            duration: 1.3,
            ease: 'elastic.out(1, 0.3)',
            onUpdate: () => updateLanyard(proxy.dx, proxy.dy),
          })
        },
        onRelease: function () {
          gsap.to(card, { scale: 1, duration: 0.3 })
        },
        onClick: () => flipAndGlow(),
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  function flipAndGlow() {
    const card = cardRef.current
    const toFlipped = !isFlippedRef.current
    isFlippedRef.current = toFlipped

    gsap.to(card, { rotateY: toFlipped ? 180 : 0, duration: 0.8, ease: 'power3.inOut' })

    gsap.fromTo(
      card,
      { boxShadow: '0 0 0px 0px rgba(255,77,46,0)' },
      {
        boxShadow: '0 0 45px 10px rgba(255,77,46,0.5)',
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      }
    )
  }

  return (
    <div ref={wrapperRef} className="flex flex-col items-center">
      <div ref={swingRef} className="flex flex-col items-center">
        <svg width="180" height="260" viewBox="0 0 180 260" className="overflow-visible">
          <defs>
            <linearGradient id="strapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-line)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
            <pattern id="stripes" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <rect width="4" height="8" fill="rgba(255,255,255,0.07)" />
            </pattern>
          </defs>

          <polygon
            ref={leftPolyRef}
            points={`${LEFT_TOP.join(',')} ${LEFT_TOP_2.join(',')} ${LEFT_BOTTOM.join(',')} ${LEFT_BOTTOM_2.join(',')}`}
            fill="url(#strapGrad)"
          />
          <polygon
            points={`${LEFT_TOP.join(',')} ${LEFT_TOP_2.join(',')} ${LEFT_BOTTOM.join(',')} ${LEFT_BOTTOM_2.join(',')}`}
            fill="url(#stripes)"
            style={{ pointerEvents: 'none' }}
          />

          <polygon
            ref={rightPolyRef}
            points={`${RIGHT_TOP.join(',')} ${RIGHT_TOP_2.join(',')} ${RIGHT_BOTTOM.join(',')} ${RIGHT_BOTTOM_2.join(',')}`}
            fill="url(#strapGrad)"
          />
          <polygon
            points={`${RIGHT_TOP.join(',')} ${RIGHT_TOP_2.join(',')} ${RIGHT_BOTTOM.join(',')} ${RIGHT_BOTTOM_2.join(',')}`}
            fill="url(#stripes)"
            style={{ pointerEvents: 'none' }}
          />

          <rect ref={buckleRef} x={BUCKLE.x} y={BUCKLE.y} width={BUCKLE.w} height={BUCKLE.h} rx="3" fill="var(--color-paper)" opacity="0.9" />
          <rect ref={buckleBorderRef} x={BUCKLE.x} y={BUCKLE.y} width={BUCKLE.w} height={BUCKLE.h} rx="3" fill="none" stroke="var(--color-line)" strokeWidth="1" />

          <rect ref={shortStrapRef} x={SHORT_STRAP.x} y={SHORT_STRAP.y} width={SHORT_STRAP.w} height={SHORT_STRAP.h} fill="url(#strapGrad)" />

          <circle ref={clipRef} cx={CLIP.cx} cy={CLIP.cy} r={CLIP.r} fill="none" stroke="var(--color-paper)" strokeWidth="3" opacity="0.85" />
        </svg>

        <div style={{ perspective: 1400 }} className="-mt-3">
          <div
            ref={cardRef}
            className="relative w-80 aspect-[3/4.3] rounded-2xl cursor-grab active:cursor-grabbing select-none shadow-2xl shadow-black/60"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border border-line bg-[#161618] flex flex-col"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="h-9 bg-accent flex items-center justify-between px-5">
                <span className="text-xs font-semibold tracking-widest text-ink">DEV ID</span>
                <span className="w-2.5 h-2.5 rounded-full bg-ink/70" />
              </div>

              <div className="flex justify-center pt-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-paper/90 bg-paper">
                  <img
                    src={profileImg}
                    alt="Portrait"
                    className="w-full h-full object-cover pointer-events-none"
                    draggable="false"
                  />
                </div>
              </div>

              <div className="text-center mt-5 px-4">
                <p className="font-display text-xl leading-tight">ADITYA TIWARI</p>
                <p className="text-accent text-sm uppercase tracking-widest mt-1">
                  Frontend Developer
                </p>
              </div>

              <div className="mt-auto px-6 pb-5">
                <div className="h-px bg-line mb-3" />
                <div className="flex justify-between text-xs text-muted uppercase tracking-wide">
                  <span>ID · 0042</span>
                  <span>Est. 2026</span>
                </div>
                <div className="flex gap-[2px] mt-3 h-5 items-end">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1].map((h, i) => (
                    <span key={i} className="bg-muted/60" style={{ width: 2, height: `${h * 3.5}px` }} />
                  ))}
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border border-line bg-[#161618] p-6 flex flex-col justify-between"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div>
                <p className="text-accent uppercase text-xs tracking-widest mb-2">About</p>
                <p className="font-display text-2xl">ADITYA TIWARI</p>
                <p className="text-muted text-sm mt-1">Frontend Developer</p>
              </div>
              <ul className="text-sm text-muted space-y-1">
                <li>React · GSAP · Redux</li>
                <li>Based in India</li>
                <li>Available for work</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted mt-5">Drag the card · Click to flip</p>
    </div>
  )
}