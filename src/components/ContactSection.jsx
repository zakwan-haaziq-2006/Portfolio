import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for the huge text and elements
      gsap.fromTo('.contact-reveal', 
        { y: 80, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%'
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-[80vh] flex flex-col justify-end pb-24 px-12 lg:px-24 bg-transparent overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between h-full relative z-10 gap-24">
        
        {/* Top Spacer / Tiny Title */}
        <div className="contact-reveal flex items-center gap-4 mt-32">
          <div className="w-2 h-2 rounded-full bg-[#dd0000]" />
          <span className="text-xs uppercase tracking-widest text-black/40 font-bold">What's Next</span>
        </div>

        {/* Giant Statement */}
        <div className="flex flex-col">
          <div className="overflow-hidden">
            <h2 className="contact-reveal text-[clamp(50px,10vw,150px)] font-normal tracking-tighter leading-[0.9] text-black">
              Let's craft
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="contact-reveal text-[clamp(50px,10vw,150px)] font-normal tracking-tighter leading-[0.9] text-black/30">
              the future.
            </h2>
          </div>
        </div>

        {/* Links Footer Grid */}
        <div className="contact-reveal grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-black/10">
          
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-black/40 font-bold mb-4">Email</span>
            <a href="mailto:zakwanhaaziq06@gmail.com" className="text-2xl lg:text-3xl font-medium tracking-tight text-black hover:text-[#dd0000] transition-colors w-fit">
              zakwanhaaziq06@gmail.com
            </a>
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-black/40 font-bold mb-4">Network</span>
            <a href="https://www.linkedin.com/in/zakwan-haaziq-533392322/" target="_blank" rel="noreferrer" className="text-2xl lg:text-3xl font-medium tracking-tight text-black hover:text-[#dd0000] transition-colors w-fit">
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-black/40 font-bold mb-4">Code</span>
            <a href="https://github.com/zakwan-haaziq-2006" target="_blank" rel="noreferrer" className="text-2xl lg:text-3xl font-medium tracking-tight text-black hover:text-[#dd0000] transition-colors w-fit">
              GitHub
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
