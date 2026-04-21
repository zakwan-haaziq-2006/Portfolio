import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = ['Projects', 'About', 'Skills', 'Contact']
const ROLES = ['ML Engineer', 'Deep Learning', 'AI Developer']
const ROLE_INTERVAL = 2800
const TRANSITION_MS = 480

export default function HeroSection() {
  const [phase, setPhase] = useState('visible')
  const [displayedRole, setDisplayedRole] = useState(ROLES[0])
  const timerRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setPhase('exiting')
      setTimeout(() => {
        setDisplayedRole((prev) => {
          const idx = ROLES.indexOf(prev)
          return ROLES[(idx + 1) % ROLES.length]
        })
        setPhase('entering')
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase('visible'))
        )
      }, TRANSITION_MS)
    }, ROLE_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [])

  const roleStyle = {
    display: 'block',
    transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1), transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
    opacity: phase === 'visible' ? 1 : 0,
    transform:
      phase === 'entering' ? 'translateY(14px)'
      : phase === 'exiting'  ? 'translateY(-14px)'
      : 'translateY(0)',
  }

  return (
    <div id="hero" ref={heroRef} className="relative min-h-screen bg-transparent text-black overflow-hidden flex flex-col">

      {/* ── Navbar ──────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-12 py-6 flex-shrink-0">
        <span className="text-[13px] font-normal tracking-wide text-black">
          Zakwan Haaziq
        </span>
        <ul className="flex items-center gap-7 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                onClick={(e) => {
                  e.preventDefault();
                  const ids = {
                    'Projects': 'projects',
                    'About': 'about-section',
                    'Skills': 'skills',
                    'Contact': 'contact'
                  };
                  const target = document.getElementById(ids[link]);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-[13px] font-normal tracking-wide text-black no-underline transition-opacity duration-200 hover:opacity-40"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Red dot — tight below navbar ─────────────────── */}
      <span
        aria-hidden="true"
        className="w-[7px] h-[7px] rounded-full ml-12 mb-1 flex-shrink-0"
        style={{ background: '#dd0000' }}
      />

      {/* ── Giant name — full width ───────────────────────── */}
      <div style={{ overflow: 'hidden' }}>
        <h1
          className="zakwan-name font-normal leading-none tracking-tight text-black m-0 px-12 whitespace-nowrap flex-shrink-0"
          style={{ fontSize: 'clamp(60px, 11vw, 160px)' }}
        >
          Zakwan Haaziq
        </h1>
      </div>

      {/* ── Lower section — content block ─────────── */}
      <div className="flex-1 flex items-center justify-center px-12">
        <div className="flex flex-col items-start max-w-[750px] ml-[35%] mt-12">
          
          {/* Animated role */}
          <div
            aria-live="polite"
            aria-label={displayedRole}
            className="overflow-hidden mb-5"
            style={{ lineHeight: 1 }}
          >
            <span
              className="font-black tracking-tighter text-black uppercase"
              style={{
                fontSize: 'clamp(32px, 4vw, 64px)',
                lineHeight: 1,
                ...roleStyle,
              }}
            >
              {displayedRole}
            </span>
          </div>

          {/* Bio / Objective */}
          <p className="text-[18px] font-normal leading-[1.7] text-black/80 m-0 tracking-tight">
            I specialize in building end-to-end{' '}
            <span className="font-semibold text-black">Machine Learning</span> and{' '}
            <span className="font-semibold text-black">Deep Learning</span> applications
            across healthcare — helping ideas reach
            production through FastAPI, Docker, and HuggingFace Spaces.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <a
              id="get-in-touch"
              href="#contact"
              className="inline-block px-10 py-[14px] border border-black text-[11px] uppercase font-semibold tracking-widest text-white bg-black no-underline transition-all duration-300 hover:bg-transparent hover:text-black"
              style={{ borderRadius: '0px' }}
            >
              Get in touch
            </a>
          </div>

        </div>
      </div>

    </div>
  )
}
