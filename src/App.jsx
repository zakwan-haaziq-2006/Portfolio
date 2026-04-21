import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import LandingScreen from './components/LandingScreen'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import EducationSection from './components/EducationSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import TechStackSection from './components/TechStackSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import NeuralCloudVanilla from './components/NeuralCloudVanilla'
import CustomCursor from './components/CustomCursor'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Lenis for smooth scroll
    const lenis = new Lenis({ duration: 1.0 })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Force a total layout refresh deeply down the tree so all section triggers read the correct coordinates
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 1000)

    const ctx = gsap.context(() => {
      // Create a scrubbed timeline bound to a pinned container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.pinned-wrapper',
          start: 'top top',
          end: '+=1000px', // More room for a premium feel
          pin: true,
          scrub: true,
          refreshPriority: 1, 
        }
      })

      // 1. Fade the "Hi" Landing screen out QUICKLY
      tl.to('.landing-screen', { opacity: 0, duration: 0.4 }, 0)
      
      // 2. The Hero screen is already under it, but we can ensure it's fully opaque
      tl.fromTo('.hero-screen', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
      
      // 3. Slide the Zakwan name in IMMEDIATELY with the fade
      tl.fromTo('.zakwan-name', 
        { x: '-60vw' }, 
        { x: '0vw', ease: 'power2.out', duration: 0.4 }, 
        0 // Start exactly when the scroll begins
      )

    }, containerRef)

    return () => {
      lenis.destroy()
      ctx.revert()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      
      {/* Custom Signature Cursor (Black Dot) */}
      <CustomCursor />

      {/* 3D Background Layer (Bulletproof Vanilla Version) */}
      <NeuralCloudVanilla />

      {/* Main Content Wrapper (sitting on top of 3D) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Pinned Wrapper holding both sections on top of each other */}
        <div 
          className="pinned-wrapper" 
          style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
        >
          
          {/* Layer 1: Hero Section (Sitting underneath, starts invisible) */}
          <div 
            className="hero-screen" 
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          >
            <HeroSection />
          </div>

          {/* Layer 2: Landing Screen (Sitting on top, fades out to reveal Hero) */}
          {/* pointerEvents: 'none' prevents it from acting as an invisible shield blocking clicks after fade */}
          <div 
            className="landing-screen" 
            style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
          >
            <LandingScreen />
          </div>

        </div>

        {/* Standard scrolling sections */}
        <AboutSection />
        <EducationSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </div>

    </div>
  )
}
