import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ArrowUpRight, Sparkle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/icons/BrandIcons'
import VisitingCard from '../components/VisitingCard'

const EMAIL = 'adityatiwari062@gmail.com'

const links = [
  { label: 'GitHub', value: '@Aditya3488', href: 'https://github.com/Aditya3488' },
  { label: 'LinkedIn', value: '/in/codeinreact', href: 'https://linkedin.com/in/codeinreact' },
  { label: 'Resume', value: 'Download PDF', href: '/resume.pdf' },
]

const marqueeItems = ['Frontend Development', 'Open to Collaborations', 'Available for Freelance', 'React & GSAP']

export default function Contact() {
  const containerRef = useRef(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  // Yahi hissa words ko neeche se upar reveal karta hai — har word
  // pehle apni hi height ke barabar neeche (yPercent: 110) chhupa hota
  // hai (outer span ke overflow-hidden ki wajah se dikhta nahi), phir
  // GSAP usse upar 0 tak animate karta hai, stagger ke saath ek-ek
  // karke — isliye "neeche se upar aana" wala effect milta hai.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-word', {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.07,
        ease: 'power4.out',
        delay: 0.3,
        clearProps: 'transform',
      })

      const tl = gsap.timeline({ delay: 1.1, defaults: { ease: 'power3.out' } })
      tl.from('.contact-sub', { opacity: 0, y: 16, duration: 0.6 })
        .from('.contact-email', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from('.contact-row', { opacity: 0, x: -20, duration: 0.5, stagger: 0.07 }, '-=0.3')
        .from('.contact-meta', { opacity: 0, y: 16, duration: 0.5 }, '-=0.2')
        .from('.contact-card-col', { opacity: 0, y: 30, scale: 0.96, duration: 0.8, ease: 'back.out(1.3)' }, '-=0.5')

      gsap.delayedCall(3, () => {
        gsap.set(
          '.reveal-word, .contact-sub, .contact-email, .contact-row, .contact-meta, .contact-card-col',
          { clearProps: 'all' }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const headingWords = [
    { text: "Let's", accent: false },
    { text: 'build', accent: false },
    { text: 'something', accent: false },
    { text: 'worth', accent: true },
    { text: 'seeing.', accent: true },
  ]

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* h-screen se navbar ki height minus ki gayi, isliye poora hero
          bilkul ek viewport ke andar fit hota hai — scroll ki zaroorat
          nahi padti is section ko dekhne ke liye */}
      <section className="relative min-h-[calc(100vh-88px)] flex items-center px-8 md:px-16 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(255,77,46,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center w-full">
          <div>
            <p className="text-accent uppercase tracking-widest text-sm font-semibold mb-4">Contact</p>

            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.08] mb-5">
              {headingWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-3 pb-1 align-bottom">
                  <span
                    className={`reveal-word inline-block ${
                      word.accent ? 'italic text-accent' : 'text-paper'
                    }`}
                  >
                    {word.text}
                  </span>
                </span>
              ))}
            </h1>

            <p className="contact-sub text-muted text-base md:text-lg max-w-md mb-8">
              No forms, no ticket numbers. Send a note and it lands directly
              with me — usually answered within a day.
            </p>

            < a
              href={`mailto:${EMAIL}`}
              className="contact-email group flex items-center gap-3 mb-10 w-fit"
            >
              <h2 className="font-display text-xl md:text-3xl group-hover:text-accent transition-colors break-all">
                {EMAIL}
              </h2>
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
            </a>

            <p className="text-muted uppercase tracking-widest text-xs mb-2">Elsewhere</p>
            <div className="border-t border-line">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-row group flex items-center justify-between py-3.5 border-b border-line hover:pl-2 transition-all duration-300"
                >
                  <span className="flex items-center gap-3 font-display text-lg">
                    {link.label === 'GitHub' && <GithubIcon size={16} />}
                    {link.label === 'LinkedIn' && <LinkedinIcon size={16} />}
                    {link.label}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="text-muted text-sm hidden sm:inline">{link.value}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </span>
                </a>
              ))}
            </div>

            <div className="contact-meta flex flex-wrap gap-x-10 gap-y-3 mt-6 text-sm">
              <div>
                <p className="text-muted uppercase tracking-widest text-xs mb-1">Based in</p>
                <p className="font-display text-base">Delhi, India</p>
              </div>
              <div>
                <p className="text-muted uppercase tracking-widest text-xs mb-1">Local time</p>
                <p className="font-display text-base tabular-nums">{time} IST</p>
              </div>
              <div>
                <p className="text-muted uppercase tracking-widest text-xs mb-1">Response time</p>
                <p className="font-display text-base">Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="contact-card-col">
            <VisitingCard />
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden border-t border-line py-4 bg-[#0a0a0b] shrink-0">
        <div className="flex animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-6 mx-6 text-xs uppercase tracking-widest text-muted whitespace-nowrap"
            >
              {item}
              <Sparkle size={12} className="text-accent shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}