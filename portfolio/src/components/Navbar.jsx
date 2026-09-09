import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen) return
    const ctx = gsap.context(() => {
      gsap.from('.mobile-link', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, menuRef)
    return () => ctx.revert()
  }, [isOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-ink/70 backdrop-blur-md border-b border-line">
        <NavLink to="/" className="font-display text-lg tracking-tight" onClick={() => setIsOpen(false)}>
          Aditya Tiwari
        </NavLink>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `uppercase tracking-wide transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Aditya3488" target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden md:block">
            <GithubIcon size={18} />
          </a>
          <a href="https://linkedin.com/in/codeinreact" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hidden md:block">
            <LinkedinIcon size={18} />
          </a>

          <button onClick={() => setIsOpen(true)} aria-label="Open menu" className="md:hidden p-1">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile menu ab header ke BAHAR hai, poori tarah independent —
          header ke backdrop-blur se koi interaction/interference nahi ho
          sakta ab. #0e0e10 seedha hardcoded hai (CSS variable pe bhi
          depend nahi kar raha), isliye ye guaranteed solid render hoga. */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 flex flex-col"
          style={{ zIndex: 9999, backgroundColor: '#0e0e10' }}
        >
          <div className="flex items-center justify-between px-8 py-6 border-b border-line">
            <span className="font-display text-lg">Aditya Tiwari</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2 px-8 pt-10">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `mobile-link font-display text-4xl py-3 border-b border-line ${
                    isActive ? 'text-accent' : 'text-paper'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-6 px-8 py-8 border-t border-line">
            <a href="https://github.com/Aditya3488" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href="https://linkedin.com/in/codeinreact" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
      )}
    </>
  )
}