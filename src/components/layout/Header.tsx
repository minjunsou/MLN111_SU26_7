import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Trang Chủ' },
  { to: '/theory', label: 'Lý Thuyết' },
  { to: '/game', label: 'Trò Chơi' },
]

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-parchment-light/95 backdrop-blur-md border-b border-sepia/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-gold-classic/60 flex items-center justify-center group-hover:border-gold-classic transition-colors">
            <span className="font-playfair text-gold-classic text-xs font-bold">M</span>
          </div>
          <span className="font-playfair text-sepia text-base tracking-[0.2em] uppercase group-hover:text-gold-classic transition-colors">
            MLN111
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `font-prata text-sm tracking-[0.18em] uppercase transition-all duration-300 relative group ${
                  isActive ? 'text-gold-classic' : 'text-sepia/60 hover:text-sepia'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold-classic transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#c8b99a] transition-all duration-300 ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-5 h-px bg-[#c8b99a] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#c8b99a] transition-all duration-300 ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-parchment-light/98 border-t border-sepia/15 px-6 py-4">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `block py-3 font-prata text-sm tracking-[0.18em] uppercase border-b border-gold-classic/10 transition-colors ${
                  isActive ? 'text-gold-classic' : 'text-sepia/60'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
