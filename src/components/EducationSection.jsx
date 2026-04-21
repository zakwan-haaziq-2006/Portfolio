import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ACADEMIC_RECORDS = [
  {
    year: '2024 – PRESENT',
    degree: 'B. E. Computer Science and Engineering',
    institution: 'C. Abdul Hakeem College of Engineering and Technology, Melvisharam.',
    metric: '9.13 CGPA',
    side: 'left'
  },
  {
    year: '2023 – 2024',
    degree: 'Senior Secondary (XII), Tamil Nadu State board',
    institution: 'K. H. Matriculation Boys Higher Secondary School, Melvisharam.',
    metric: '86.6%',
    side: 'right'
  },
  {
    year: '2021 – 2022',
    degree: 'Secondary Education (X), Tamil Nadu State Board',
    institution: 'K. H. Matriculation Boys Higher Secondary School, Melvisharam.',
    metric: '86.8%',
    side: 'left'
  }
]

export default function EducationSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Reveal
      gsap.fromTo('.edu-header', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1.5, ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )

      // 2. Central Line Pulse
      gsap.fromTo('.central-axis',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          }
        }
      )

      // 3. Animate Each Entry
      const entries = gsap.utils.toArray('.edu-entry')
      entries.forEach((entry, i) => {
        const side = ACADEMIC_RECORDS[i].side
        const xOffset = side === 'left' ? -50 : 50
        
        gsap.fromTo(entry,
          { opacity: 0, x: xOffset, filter: 'blur(10px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="education-section"
      ref={containerRef}
      className="relative py-48 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
        
        {/* Massive Topic Header */}
        <div className="edu-header mb-48">
           <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
             THE FOUNDATION<span className="text-black/10 mx-4">—</span><br />
             <span className="text-black/30 font-light italic text-4xl lg:text-7xl">Education.</span>
           </h2>
        </div>

        {/* The Chronicle Timeline */}
        <div className="relative">
          
          {/* Central Vertical Axis */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-[1px] h-full bg-black/[0.05] origin-top transform -translate-x-1/2">
             <div className="central-axis w-full h-full bg-black/40 origin-top" />
          </div>

          <div className="space-y-32 lg:space-y-12">
            {ACADEMIC_RECORDS.map((record, idx) => (
              <div key={idx} className={`edu-entry flex flex-col lg:flex-row items-center w-full ${record.side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content Card (Transparent Editorial Style) */}
                <div className={`w-full lg:w-5/12 ${record.side === 'left' ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'}`}>
                   <div className="flex flex-col gap-2 mb-6">
                      <span className="text-black/30 font-bold uppercase tracking-[0.4em] text-[10px]">{record.year}</span>
                      <h3 className="text-2xl lg:text-4xl font-bold tracking-tight text-black leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {record.degree}
                      </h3>
                   </div>
                   
                   <p className="text-lg lg:text-xl font-light text-black/60 mb-6 leading-relaxed italic">
                      {record.institution}
                   </p>

                   <div className={`flex items-baseline gap-2 ${record.side === 'left' ? 'lg:justify-end' : ''}`}>
                      <span className="text-4xl lg:text-6xl font-black text-black tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {record.metric}
                      </span>
                      <span className="text-xs text-black/20 font-bold uppercase tracking-widest">Achieved</span>
                   </div>
                </div>

                {/* Central Visual Node */}
                <div className="hidden lg:flex w-2/12 justify-center relative items-center">
                   <div className="w-3 h-3 rounded-full bg-black z-20" />
                   <div className="absolute w-8 h-8 rounded-full border border-black/5 animate-ping opacity-20" />
                </div>

                {/* Empty Spacer for Balance */}
                <div className="hidden lg:block w-5/12" />
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Atmospheric Background Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black/[0.01] select-none pointer-events-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        LOG
      </div>

    </section>
  )
}
