import { NavLink } from 'react-router-dom'
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-ink/70 backdrop-blur-md border-b border-line">
      <NavLink to="/" className="font-display text-lg tracking-tight">
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
        <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
          <GithubIcon size={18} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedinIcon size={18} />
        </a>
      </div>
    </header>
  )
}