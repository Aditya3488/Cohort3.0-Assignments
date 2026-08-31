import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { Mail, MapPin, Check, Copy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'

const EMAIL = 'adityatiwari062@gmail.com'

export default function VisitingCard() {
  const wrapperRef = useRef(null)
  const cardRef = useRef(null)
  const glareRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const card = cardRef.current
    const glare = glareRef.current

    const rotateX = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3' })
    const rotateY = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3' })
    const glareX = gsap.quickTo(glare, 'x', { duration: 0.3, ease: 'power3' })
    const glareY = gsap.quickTo(glare, 'y', { duration: 0.3, ease: 'power3' })

    function onMove(e) {
      const rect = card.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height

      rotateY((px - 0.5) * 24)
      rotateX((0.5 - py) * 24)
      glareX(px * rect.width - 100)
      glareY(py * rect.height - 100)

      gsap.to(glare, { opacity: 0.5, duration: 0.2 })
    }

    function onLeave() {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1, ease: 'elastic.out(1, 0.4)' })
      gsap.to(glare, { opacity: 0, duration: 0.4 })
    }

    wrapper.addEventListener('mousemove', onMove)
    wrapper.addEventListener('mouseleave', onLeave)

    return () => {
      wrapper.removeEventListener('mousemove', onMove)
      wrapper.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={wrapperRef} style={{ perspective: 1200 }} className="w-full max-w-md mx-auto">
      <div
        ref={cardRef}
        className="relative rounded-3xl border border-line bg-[#141416] p-8 md:p-10 text-fixed-paper overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={glareRef}
          className="absolute w-[200px] h-[200px] rounded-full pointer-events-none opacity-0"
          style={{
            top: 0,
            left: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
          }}
        />

        <div className="absolute top-8 right-8 w-9 h-7 rounded-md bg-gradient-to-br from-accent to-accent/50" />

        <p className="text-accent uppercase tracking-widest text-xs mb-1">Frontend Developer</p>
        <h3 className="font-display text-3xl mb-6">Aditya Tiwari</h3>

        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={handleCopy}
            className="flex items-center justify-between gap-3 text-fixed-muted hover:text-fixed-paper transition-colors group"
          >
            <span className="flex items-center gap-3">
              <Mail size={16} />
              {EMAIL}
            </span>
            {copied ? (
              <Check size={15} className="text-accent" />
            ) : (
              <Copy size={15} className="opacity-0 group-hover:opacity-60 transition-opacity" />
            )}
          </button>
          <div className="flex items-center gap-3 text-fixed-muted">
            <MapPin size={16} />
            Rohini, New Delhi
          </div>
        </div>

        <div className="flex gap-[2px] h-5 items-end mb-6">
          {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2].map((h, i) => (
            <span key={i} className="bg-fixed-muted/50" style={{ width: 2, height: `${h * 3.5}px` }} />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <SocialLink href="https://github.com/Aditya3488">
            <GithubIcon size={16} />
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/codeinreact">
            <LinkedinIcon size={16} />
          </SocialLink>
        </div>
      </div>
    </div>
  )
}

function SocialLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
    >
      {children}
    </a>
  )
}