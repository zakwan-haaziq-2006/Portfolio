import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NeuralCloudVanilla() {
  const mountRef = useRef(null)

  useEffect(() => {
    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement)

    // 2. Global Background Particles
    const count = 5500
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        positions[i*3] = (Math.random()-0.5)*22; positions[i*3+1] = (Math.random()-0.5)*18; positions[i*3+2] = (Math.random()-0.5)*12
    }
    const bgGeometry = new THREE.BufferGeometry()
    bgGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const bgMaterial = new THREE.PointsMaterial({ color: 0x000000, size: 0.038, sizeAttenuation: true, transparent: true, opacity: 0.16, depthWrite: false })
    const bgPoints = new THREE.Points(bgGeometry, bgMaterial)
    scene.add(bgPoints)

    // 3. THE PRO-WORKSTATION (HERO)
    const laptopGroup = new THREE.Group(); laptopGroup.visible = false 
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 })
    const solidShadeMat = new THREE.MeshBasicMaterial({ color: 0x010101, transparent: true, opacity: 0 })
    const solidBlackMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 })
    const trackMat = new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0, side: THREE.DoubleSide })
    const keyMat = new THREE.PointsMaterial({ color: 0x444444, size: 0.015, transparent: true, opacity: 0 })
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x00ccff, transparent: true, opacity: 0, side: THREE.DoubleSide })
    const logoMat = new THREE.MeshBasicMaterial({ color: 0xdd0000, transparent: true, opacity: 0, side: THREE.DoubleSide })
    const greenMat = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0 })

    const createCleanBox = (w, h, d) => {
        const g = new THREE.Group(); const geo = new THREE.BoxGeometry(w, h, d)
        g.add(new THREE.Mesh(geo, solidShadeMat)); g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat)); return g
    }
    const baseGroup = new THREE.Group(); baseGroup.add(createCleanBox(2.2, 0.1, 1.4)); const bP = createCleanBox(2.0, 0.05, 1.25); bP.position.y = -0.07; baseGroup.add(bP); laptopGroup.add(baseGroup)
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.0, 8), solidBlackMat); hinge.rotation.z = Math.PI/2; hinge.position.set(0, 0.05, -0.7); laptopGroup.add(hinge)
    const lidGroup = new THREE.Group(); lidGroup.add(createCleanBox(2.2, 1.4, 0.05)); const sc = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.25), screenMat); sc.position.z = 0.03; lidGroup.add(sc);
    lidGroup.position.set(0, 0.72, -0.72); lidGroup.rotation.x = -0.15; laptopGroup.add(lidGroup)
    // Restore Position to user's favorite
    const initialPos = { x: -4.2, y: -1.4, z: 0 };
    laptopGroup.position.set(initialPos.x, initialPos.y, initialPos.z);
    laptopGroup.rotation.y = 0.6;
    scene.add(laptopGroup)

    // 5. THE TECH RIVER (REMOVED)
    // The complex floating 3D tech stack has been removed in favor of a clean, minimalist
    // 2D DOM layout in TechStackSection.jsx to honor the 'Clinical Editorial' aesthetic.

    // 6. INSTANT STATE SYNC ENGINE
    // 6. INSTANT STATE SYNC ENGINE
    const opStates = { techOp: 0 }; // Removed lapOp from GSAP, handling it via raw math
    
    // Legacy triggers removed for tech stack.

    // 7. Animation loop
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => { mouseX=(e.clientX/innerWidth-0.5)*0.4; mouseY=(e.clientY/innerHeight-0.5)*0.4 }
    const onResize = () => { camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight) }
    window.addEventListener('mousemove', onMouseMove); window.addEventListener('resize', onResize)

    let animationID
    const animate = () => {
        animationID = requestAnimationFrame(animate); const time = Date.now() * 0.001
        
        // --- PRECISE MATH-BASED VISIBILITY (FRAME-PERFECT PRO) ---
        const scroll = window.pageYOffset || document.documentElement.scrollTop;
        const aboutSection = document.getElementById('about-section');
        const aboutTop = aboutSection ? aboutSection.offsetTop : 99999;
        
        let calculatedLapOp = 0;

        // Condition 1: "appear when the name is animated"
        // The Name animates over the first ~400px of scroll in the Hero section.
        // We fade the laptop from 0 to 1 over scroll 0 -> 400.
        if (scroll <= 400) {
            calculatedLapOp = scroll / 400; 
        } 
        // Condition 2: Stay visible until About section approaches
        else if (scroll > 400 && scroll < (aboutTop - window.innerHeight + 100)) {
            calculatedLapOp = 1;
        }
        // Condition 3: "fade out as the next sections topic appears"
        // We fade it out as About section enters viewport (fade out over a 400px window)
        else {
            const fadeStart = Math.max(800, aboutTop - window.innerHeight + 100);
            const fadeEnd = fadeStart + 400;
            if (scroll >= fadeEnd) {
                calculatedLapOp = 0;
            } else {
                calculatedLapOp = 1 - ((scroll - fadeStart) / 400);
            }
        }

        const lapOp = Math.max(0, Math.min(1, calculatedLapOp));
        const globalOp = 0.16;

        bgMaterial.opacity = globalOp
        laptopGroup.visible = lapOp>0.01; if(laptopGroup.visible){ edgeMat.opacity=0.3*lapOp; solidShadeMat.opacity=0.95*lapOp; solidBlackMat.opacity=lapOp; trackMat.opacity=0.8*lapOp; keyMat.opacity=lapOp; logoMat.opacity=lapOp; screenMat.opacity=(0.12+Math.sin(time*3)*0.04)*lapOp; greenMat.opacity=(0.5+Math.sin(time*2)*0.5)*lapOp; laptopGroup.rotation.y += 0.003 }
        
        // The floating 3D TechRiver logic has been removed.

        bgPoints.rotation.y += 0.0001; scene.rotation.x += (mouseY - scene.rotation.x) * 0.05; scene.rotation.y += (mouseX - scene.rotation.y) * 0.05; renderer.render(scene, camera)
    }
    animate()


    return () => {
        window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('resize', onResize); cancelAnimationFrame(animationID)
        if (mountRef.current) mountRef.current.removeChild(renderer.domElement)
        scene.traverse((obj) => { if(obj.geometry)obj.geometry.dispose(); if(obj.material){ if(Array.isArray(obj.material))obj.material.forEach(m=>m.dispose()); else obj.material.dispose(); if(obj.material.map)obj.material.map.dispose() } })
        renderer.dispose(); renderer.forceContextLoss()
    }
  }, [])

  return (
    <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} />
  )
}
