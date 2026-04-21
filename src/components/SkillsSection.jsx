import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILL_CATEGORIES = [
  {
    title: 'Layer 01. Core AI',
    accent: '#00f0ff', // Cyan
    skills: [
      { name: 'TensorFlow' },
      { name: 'PyTorch' },
      { name: 'OpenCV' },
      { name: 'Scikit-Learn' },
      { name: 'GradCAM Explainability' }
    ]
  },
  {
    title: 'Layer 02. Systems Eng',
    accent: '#6366f1', // Indigo
    skills: [
      { name: 'FastAPI Architecture' },
      { name: 'Docker Virtualization' },
      { name: 'Pydantic Schemas' },
      { name: 'Firebase Ecosystem' },
      { name: 'Git Workflow' }
    ]
  },
  {
    title: 'Layer 03. Data Science',
    accent: '#10b981', // Emerald
    skills: [
      { name: 'NumPy / Pandas' },
      { name: 'Matplotlib / Seaborn' },
      { name: 'Data Preprocessing' },
      { name: 'Feature Engineering' },
      { name: 'Statistical Analysis' }
    ]
  }
]

export default function SkillsSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Title Reveal
      gsap.fromTo('.skills-title', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )

      // 2. Category Reveal
      const categories = gsap.utils.toArray('.skill-category')
      categories.forEach((cat, i) => {
        const q = gsap.utils.selector(cat)
        
        gsap.fromTo(cat,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 1.5,
            delay: i * 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: cat,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Text & Dots stagger
        gsap.fromTo(q('.skill-item'),
          { opacity: 0, x: -10 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cat,
              start: 'top 75%',
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-48 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="skills-title mb-24">
           <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
             Technical <span className="text-black/10">INTELLIGENCE.</span>
           </h2>
           <p className="mt-4 text-black/40 uppercase tracking-[0.4em] text-xs font-bold">Comprehensive Capabilities Matrix</p>
        </div>

        {/* The Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="skill-category">
              
              {/* Category Title */}
              <div className="flex items-center gap-3 mb-10 border-b border-black/[0.05] pb-6">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.accent }} />
                <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {cat.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item group flex items-center gap-4">
                    <span className="text-black/10 group-hover:text-black transition-colors duration-300 font-bold">/</span>
                    <span className="text-black/60 text-lg lg:text-xl font-light hover:text-black transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Background Parallax Layer */}
      <div className="absolute bottom-12 right-24 text-[15vw] font-black text-black/[0.02] pointer-events-none select-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        SKL
      </div>

    </section>
  )
}
