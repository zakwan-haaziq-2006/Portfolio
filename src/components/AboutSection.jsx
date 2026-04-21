import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line-by-line Highlighter Animation
      const lines = gsap.utils.toArray('.highlight-text')
      
      lines.forEach((line) => {
        gsap.fromTo(line, 
          { color: '#cccccc' }, 
          {
            color: '#000000',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              end: 'top 40%',
              scrub: true,
            }
          }
        )
      })

      // Sidebar floating entrance
      gsap.from('.fact-item', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.facts-container',
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="relative min-h-screen py-32 px-12 lg:px-24 flex items-center overflow-hidden bg-transparent"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background Numeral */}
      <div className="absolute top-0 right-0 text-[35vw] font-black text-black/5 leading-none select-none pointer-events-none">
        01
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Heading & Quick Facts */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          
          {/* THE NAME ALONE - Styled like Experience Narrative */}
          <h2 className="about-title text-4xl lg:text-7xl font-bold tracking-tighter mb-12 text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
             THE NARRATIVE<span className="text-black/10 mx-4">—</span><br />
             <span className="text-black/30 font-light italic">About.</span>
          </h2>

          <div className="facts-container space-y-8">
            <FactItem title="06+" desc="DL Apps Deployed" />
            <FactItem title="Domain" desc="Healthcare Specialist" />
            <FactItem title="Focus" desc="End-to-End Production" />
          </div>
        </div>

        {/* Right Column: The Narrative Narrative */}
        <div className="lg:col-span-8 lg:pl-12 flex flex-col justify-center">
          <div ref={textRef} className="space-y-6">
            <p className="highlight-text text-3xl lg:text-4xl font-normal leading-tight tracking-tight text-[#cccccc]">
              I am a Computer Science specialist who designs, trains, and deploys high-performance Deep Learning applications.
            </p>
            <p className="highlight-text text-3xl lg:text-4xl font-normal leading-tight tracking-tight text-[#cccccc]">
              My work spans the complete ML pipeline—from raw data preprocessing to production deployment with Docker and FastAPI.
            </p>
            <p className="highlight-text text-3xl lg:text-4xl font-normal leading-tight tracking-tight text-[#cccccc]">
              I have built production-ready CNN classifiers and real-time inference systems that are currently live across healthcare domains.
            </p>
            <p className="highlight-text text-3xl lg:text-4xl font-normal leading-tight tracking-tight text-[#cccccc]">
              I focus on creating technical solutions that aren't just models, but publicly accessible, end-to-end user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FactItem({ title, desc }) {
  return (
    <div className="fact-item flex items-center gap-4 group">
      <div className="w-2 h-2 rounded-full bg-[#dd0000] group-hover:scale-150 transition-transform duration-300" />
      <div>
        <p className="text-xs uppercase tracking-widest text-black/40 font-bold mb-1">{title}</p>
        <p className="text-xl font-medium tracking-tight">{desc}</p>
      </div>
    </div>
  )
}
