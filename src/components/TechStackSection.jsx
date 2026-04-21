import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_GROUPS = [
  {
    title: 'Machine Learning Core',
    items: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'HuggingFace']
  },
  {
    title: 'Data & Infrastructure',
    items: ['FastAPI', 'Docker', 'NumPy', 'Pandas']
  },
  {
    title: 'Languages',
    items: ['Python', 'C / C++', 'Java']
  }
]

const TechStackSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo('.tech-heading', 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, x: 0, duration: 1.5, ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // List stagger animation
      gsap.fromTo('.tech-group',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="tech-section"
      ref={containerRef}
      className="relative min-h-screen flex items-center py-32 px-12 lg:px-24 bg-transparent overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-4 tech-heading">
          <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter text-black/20 uppercase">
            The<br />
            <span className="text-black font-medium">Stack.</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#dd0000] mt-6" />
        </div>
        
        {/* DOM-Based Simple Stack Grid */}
        <div className="lg:col-span-8 flex flex-col gap-10 mt-12 lg:mt-0">
          {TECH_GROUPS.map((group, idx) => (
            <div key={idx} className="tech-group">
              <h3 className="text-sm lg:text-base uppercase tracking-widest text-black/40 font-bold mb-4">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3 lg:gap-4">
                {group.items.map(item => (
                  <span 
                    key={item} 
                    className="px-6 py-3 lg:px-8 lg:py-4 border border-black/10 text-[18px] lg:text-2xl font-medium tracking-tight text-black hover:border-black/40 hover:bg-black/5 transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default TechStackSection;
