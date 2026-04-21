import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
  {
    year: '2025',
    company: 'Novi Tech R&D',
    role: 'Machine Learning Intern',
    period: 'Aug – Sep 2025',
    location: 'India',
    bullets: [
      'End-to-end ML pipelines for classification & regression using PyTorch and Scikit-learn',
      'Convolutional Neural Networks (CNN) for computer vision and object detection tasks',
      'Model optimization via hyperparameter tuning and k-fold cross-validation',
      'Deployed real-time inference apps via interactive Streamlit web applications',
    ],
  },
  {
    year: '2025',
    company: 'CodSoft',
    role: 'Machine Learning Intern',
    period: 'Sep – Oct 2025',
    location: 'India',
    bullets: [
      '5+ ML tasks spanning binary and multi-class classification with Scikit-learn & NumPy',
      'Robust data preprocessing: imputation, encoding, and outlier removal pipelines',
      'Performance evaluation using F1-score, ROC-AUC, and rigorous cross-validation',
    ],
  },
]

export default function ExperienceSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section Title Slide
      gsap.fromTo('.exp-title', 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, x: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )

      // 2. Animate each experience stage
      const stages = gsap.utils.toArray('.exp-stage')
      stages.forEach((stage, i) => {
        const q = gsap.utils.selector(stage)
        
        // Parallax for the giant Year marker
        gsap.to(q('.parallax-year'), {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })

        // Entrance for the text content
        gsap.fromTo(q('.exp-content'),
          { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
          {
            opacity: 1, scale: 1, filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stage,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        )

        // Neural Trace Connection Pulse
        gsap.fromTo(q('.trace-path'),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience-section"
      ref={containerRef}
      className="relative py-48 overflow-hidden bg-transparent"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
        
        {/* Editorial Section Title */}
        <h2 className="exp-title text-4xl lg:text-7xl font-bold tracking-tighter mb-48 text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
           THE TRAJECTORY<span className="text-black/10 mx-4">—</span><br />
           <span className="text-black/30 font-light italic">Experience.</span>
        </h2>

        {/* Floating Chronology */}
        <div className="space-y-[45vh]">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="exp-stage relative group">
              
              {/* Background Parallax Year */}
              <div className="parallax-year absolute -top-32 -left-12 lg:-left-32 text-[25vw] font-black text-black/[0.03] select-none pointer-events-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {exp.year}
              </div>

              {/* Narrrative Content Grid */}
              <div className="exp-content relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                
                {/* Left Column: Visual Node & Identity */}
                <div className="lg:col-span-5 flex flex-col items-start lg:items-end lg:text-right">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="trace-dot w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform duration-500" />
                    <span className="text-black/30 uppercase tracking-[0.4em] font-medium text-xs">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-4xl lg:text-6xl font-bold tracking-tight text-black mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {exp.company}
                  </h3>
                  <div className="w-16 h-[1px] bg-black/10 lg:ml-auto" />
                </div>

                {/* Vertical Trace Line (Floating between columns) */}
                <div className="hidden lg:flex lg:col-span-1 justify-center h-full min-h-[300px]">
                   <div className="w-[1px] h-full bg-black/[0.03] relative overflow-hidden">
                      <div className="trace-path absolute top-0 left-0 w-full h-full bg-black/40 origin-top" />
                   </div>
                </div>

                {/* Right Column: Roles & Impact */}
                <div className="lg:col-span-6">
                  <h4 className="text-2xl lg:text-3xl font-medium text-black/80 mb-8 tracking-tight">
                    {exp.role}
                  </h4>
                  <ul className="space-y-6">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="group/item flex items-start gap-4">
                        <span className="text-black/10 group-hover/item:text-black transition-colors duration-300 font-bold mt-1.5">→</span>
                        <p className="text-black/60 text-lg lg:text-xl leading-relaxed font-light hover:text-black transition-colors duration-300">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  )
}
