import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LandingScreen() {
  const hiRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // "Hi" fades in gently
      gsap.from(hiRef.current, {
        opacity: 0,
        y: 10,
        duration: 1.0,
        ease: 'power2.out',
        delay: 0.3,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      style={{
        width: '100%',
        height: '100vh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        overflow: 'hidden',
      }}
    >
      {/* The "Hi" — back to black text on white */}
      <h2
        ref={hiRef}
        style={{
          margin: 0,
          fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(42px, 5vw, 72px)',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: '#000000',
          userSelect: 'none',
        }}
      >
        Hi
      </h2>
    </section>
  )
}
