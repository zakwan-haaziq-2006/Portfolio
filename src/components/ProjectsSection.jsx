import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: 'NeuroScan AI',
    role: 'Lead Deep Learning Engineer',
    desc: 'Advanced neural diagnostic system for automated Brain Tumor detection using a refined VGG16 architecture. Trained on 7,000+ clinical MRI samples with integrated Grad-CAM overlays for neurosurgeon explainability.',
    metrics: { accuracy: '98.2%', latency: '45ms', params: '138M' },
    tech: ['TensorFlow', 'FastAPI', 'Gemini 2.0', 'Docker'],
    image: 'projects/neuroscan_hi.png',
    accent: '#00f0ff', // Electric Cyan
  },
  {
    title: 'MedTrust',
    role: 'Backend & ML Architect',
    desc: 'Comprehensive consultant ecosystem featuring 4 specialized ML modules for disease risk profiling. Built with a high-performance FastAPI back-end and production-grade Pydantic schemas for deep data validation.',
    metrics: { uptime: '99.9%', coverage: '4 Modules', api: 'REST' },
    tech: ['PyTorch', 'FastAPI', 'Firebase', 'HuggingFace'],
    image: 'projects/medtrust_hi.png',
    accent: '#10b981', // Emerald Green
  },
  {
    title: 'Heart Health AI',
    role: 'Full Stack AI Developer',
    desc: 'Real-time predictive analytics suite for cardiac assessment. Leverages feature-engineered clinical datasets to provide instantaneous risk scoring via a custom Streamlit orchestration layer.',
    metrics: { precision: '96.5%', f1: '0.94', status: 'Live' },
    tech: ['Scikit-Learn', 'Streamlit', 'Pandas'],
    image: 'projects/heart_hi.png',
    accent: '#ef4444', // Heart Red
  },
  {
    title: 'Face Mask Det',
    role: 'Computer Vision Lead',
    desc: 'Real-time safety monitoring application utilizing custom CNN topologies. Engineered for low-latency inference on edge devices, achieving high mAP even in low-light clinical environments.',
    metrics: { fps: '60+', mAP: '0.89', inference: 'Edge' },
    tech: ['PyTorch', 'OpenCV', 'Streamlit'],
    image: 'projects/mask_hi.png',
    accent: '#6366f1', // Indigo Pulse
  }
]

export default function ProjectsSection() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Section Title Reveal
      gsap.fromTo('.projects-title', 
        { opacity: 0, y: 100, rotateX: -20 },
        { 
          opacity: 1, y: 0, rotateX: 0,
          duration: 1.5, ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      )

      // 2. Project Stage Animations
      const stages = gsap.utils.toArray('.project-stage')
      stages.forEach((stage, i) => {
        const q = gsap.utils.selector(stage)
        
        // Image Parallax & Float
        gsap.to(q('.img-wrapper'), {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })

        // Content Reveal
        gsap.fromTo(q('.content-block'),
          { opacity: 0, x: i % 2 === 0 ? 50 : -50 },
          {
            opacity: 1, x: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: stage,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Metrics Stagger
        gsap.fromTo(q('.metric-item'),
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: stage,
              start: 'top 60%',
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-48 bg-transparent overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-24 relative z-10">
        
        {/* Cinematic Section Title */}
        <div className="projects-title mb-48 text-center lg:text-left">
           <p className="text-black/30 uppercase tracking-[0.6em] font-medium text-xs mb-4">Case Studies</p>
           <h2 className="text-6xl lg:text-9xl font-bold tracking-tighter text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
             SELECTED <span className="italic font-light text-black/20">Works.</span>
           </h2>
        </div>

        {/* Narrative Grid */}
        <div className="space-y-[35vh]">
          {PROJECTS.map((proj, idx) => (
            <div 
              key={idx} 
              className={`project-stage group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              
              {/* Image Column (Floating Entity) */}
              <div className={`lg:col-span-7 relative ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="img-wrapper relative z-10 rounded-sm overflow-hidden group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-shadow duration-700">
                  <div className="absolute inset-0 bg-black/5 mix-blend-overlay z-10 pointer-events-none" />
                  <img 
                    src={`${import.meta.env.BASE_URL}${proj.image}`} 
                    alt={proj.title}
                    className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-1000"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/1280x800/f5f5f5/999999?text=Neural+Interface' }}
                  />
                  {/* Subtle Accent Glow */}
                  <div 
                    className="absolute -inset-4 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 pointer-events-none"
                    style={{ background: proj.accent }}
                  />
                </div>
              </div>

              {/* Content Column (Technical Narrative) */}
              <div className={`lg:col-span-5 content-block flex flex-col justify-center ${idx % 2 !== 0 ? 'lg:order-1 lg:text-right lg:items-end' : ''}`}>
                
                <div className="space-y-6">
                  {/* Metadata & Role */}
                  <div className={`flex items-center gap-3 ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: proj.accent }} />
                    <span className="text-black/40 uppercase tracking-widest text-xs font-bold">{proj.role}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl lg:text-6xl font-bold tracking-tight text-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {proj.title}
                  </h3>

                  {/* Performance Metrics (Premium Detail) */}
                  <div className={`flex flex-wrap gap-4 py-4 ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                    {Object.entries(proj.metrics).map(([key, val]) => (
                      <div key={key} className="metric-item flex flex-col">
                        <span className="text-[10px] uppercase text-black/30 tracking-widest leading-none mb-1">{key}</span>
                        <span className="text-lg font-bold text-black/80 tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-black/60 text-lg lg:text-xl leading-relaxed font-light max-w-lg">
                    {proj.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className={`flex flex-wrap gap-2 pt-6 ${idx % 2 !== 0 ? 'justify-end' : ''}`}>
                    {proj.tech.map((t, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] uppercase font-bold tracking-widest border border-black/5 px-3 py-1 rounded-full text-black/40 group-hover:border-black/20 group-hover:text-black transition-all duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Background Section Number */}
      <div className="absolute top-24 right-12 text-[20vw] font-black text-black/[0.02] pointer-events-none select-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        03
      </div>

    </section>
  )
}
