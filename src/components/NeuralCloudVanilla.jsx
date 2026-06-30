import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NeuralCloudVanilla() {
  const mountRef = useRef(null)

  useEffect(() => {
    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement)

    // Lighting — studio 3-point so the aluminium reads as metal
    const ambient = new THREE.AmbientLight(0xffffff, 0.55)
    scene.add(ambient)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4)
    keyLight.position.set(4, 6, 6)
    scene.add(keyLight)
    const fillLight = new THREE.DirectionalLight(0xbfd4ff, 0.5)
    fillLight.position.set(-5, 2, 3)
    scene.add(fillLight)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8)
    rimLight.position.set(-2, 3, -5)
    scene.add(rimLight)
    // Subtle environment so metal has something to reflect
    const envLight = new THREE.HemisphereLight(0xffffff, 0x222233, 0.6)
    scene.add(envLight)

    // 2. Background particles
    const count = 5500
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i*3]   = (Math.random()-0.5)*22
      positions[i*3+1] = (Math.random()-0.5)*18
      positions[i*3+2] = (Math.random()-0.5)*12
    }
    const bgGeometry = new THREE.BufferGeometry()
    bgGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const bgMaterial = new THREE.PointsMaterial({ color: 0x000000, size: 0.038, sizeAttenuation: true, transparent: true, opacity: 0.16, depthWrite: false })
    const bgPoints = new THREE.Points(bgGeometry, bgMaterial)
    scene.add(bgPoints)

    // 3. THE REALISTIC LAPTOP
    const laptopGroup = new THREE.Group(); laptopGroup.visible = false

    // Materials (all start at opacity 0, faded in by scroll)
    const aluMat    = new THREE.MeshStandardMaterial({ color: 0xc8ccd0, metalness: 0.95, roughness: 0.32, transparent: true, opacity: 0 })
    const aluDarkMat= new THREE.MeshStandardMaterial({ color: 0x2b2e33, metalness: 0.85, roughness: 0.45, transparent: true, opacity: 0 })
    const deckMat   = new THREE.MeshStandardMaterial({ color: 0xb9bdc2, metalness: 0.9,  roughness: 0.38, transparent: true, opacity: 0 })
    const keyMat    = new THREE.MeshStandardMaterial({ color: 0x1a1c1f, metalness: 0.3,  roughness: 0.7,  transparent: true, opacity: 0 })
    const trackMat  = new THREE.MeshStandardMaterial({ color: 0xcdd1d5, metalness: 0.6,  roughness: 0.25, transparent: true, opacity: 0 })
    const bezelMat  = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, metalness: 0.5,  roughness: 0.55, transparent: true, opacity: 0 })
    const hingeMat  = new THREE.MeshStandardMaterial({ color: 0x3a3d42, metalness: 0.9,  roughness: 0.4,  transparent: true, opacity: 0 })
    const footMat   = new THREE.MeshStandardMaterial({ color: 0x141414, metalness: 0.1,  roughness: 0.9,  transparent: true, opacity: 0 })
    const logoMat   = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.2,  roughness: 0.3,  emissive: 0xffffff, emissiveIntensity: 0.25, transparent: true, opacity: 0 })
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x0a1424, emissive: 0x0a1424, emissiveIntensity: 1.0, transparent: true, opacity: 0, side: THREE.DoubleSide })
    const codeMat   = new THREE.MeshStandardMaterial({ color: 0x39d98a, emissive: 0x39d98a, emissiveIntensity: 1.4, transparent: true, opacity: 0 })
    const codeMat2  = new THREE.MeshStandardMaterial({ color: 0x4aa8ff, emissive: 0x4aa8ff, emissiveIntensity: 1.4, transparent: true, opacity: 0 })

    const allMats = [aluMat, aluDarkMat, deckMat, keyMat, trackMat, bezelMat, hingeMat, footMat, logoMat]

    // Rounded box helper (bevelled edges for a premium feel)
    const roundedBox = (w, h, d, r, mat) => {
      const shape = new THREE.Shape()
      const x = -w/2, y = -h/2
      shape.moveTo(x + r, y)
      shape.lineTo(x + w - r, y)
      shape.quadraticCurveTo(x + w, y, x + w, y + r)
      shape.lineTo(x + w, y + h - r)
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      shape.lineTo(x + r, y + h)
      shape.quadraticCurveTo(x, y + h, x, y + h - r)
      shape.lineTo(x, y + r)
      shape.quadraticCurveTo(x, y, x + r, y)
      const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: true, bevelThickness: r*0.5, bevelSize: r*0.5, bevelSegments: 3, steps: 1 })
      geo.center()
      return new THREE.Mesh(geo, mat)
    }

    // ── BASE (keyboard deck chassis) ──
    const base = roundedBox(2.4, 1.5, 0.08, 0.06, aluMat)
    base.rotation.x = -Math.PI / 2
    base.position.y = 0
    laptopGroup.add(base)

    // Inner deck (slightly recessed darker plate that keys sit in)
    const deck = roundedBox(2.25, 1.38, 0.02, 0.04, deckMat)
    deck.rotation.x = -Math.PI / 2
    deck.position.set(0, 0.045, 0.08)
    laptopGroup.add(deck)

    // Keyboard — grid of individual keycaps
    const keyGroup = new THREE.Group()
    const keyGeo = new THREE.BoxGeometry(0.12, 0.04, 0.12)
    const cols = 13, rows = 5
    const kStartX = -1.02, kStartZ = -0.42
    const kGapX = 0.155, kGapZ = 0.155
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = new THREE.Mesh(keyGeo, keyMat)
        key.position.set(kStartX + c * kGapX, 0.07, kStartZ + r * kGapZ)
        keyGroup.add(key)
      }
    }
    // Spacebar (wide key) replaces a few bottom-row keys
    const spaceKey = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.04, 0.12), keyMat)
    spaceKey.position.set(0, 0.07, kStartZ + (rows - 1) * kGapZ)
    keyGroup.add(spaceKey)
    laptopGroup.add(keyGroup)

    // Trackpad
    const trackpad = roundedBox(0.78, 0.5, 0.012, 0.03, trackMat)
    trackpad.rotation.x = -Math.PI / 2
    trackpad.position.set(0, 0.058, 0.5)
    laptopGroup.add(trackpad)

    // Rubber feet (underside)
    const footGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.03, 12)
    const feetPos = [[-1.0, -0.62], [1.0, -0.62], [-1.0, 0.62], [1.0, 0.62]]
    feetPos.forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(footGeo, footMat)
      foot.position.set(fx, -0.06, fz)
      laptopGroup.add(foot)
    })

    // ── HINGE ──
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.3, 16), hingeMat)
    hinge.rotation.z = Math.PI / 2
    hinge.position.set(0, 0.04, -0.74)
    laptopGroup.add(hinge)

    // ── LID (screen assembly) ──
    const lidGroup = new THREE.Group()

    // Lid back (aluminium shell)
    const lidShell = roundedBox(2.4, 1.5, 0.05, 0.06, aluMat)
    lidShell.position.set(0, 0.75, -0.02)
    lidGroup.add(lidShell)

    // Bezel (black frame)
    const bezel = roundedBox(2.3, 1.42, 0.02, 0.04, bezelMat)
    bezel.position.set(0, 0.75, 0.015)
    lidGroup.add(bezel)

    // Screen (emissive display)
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.08, 1.22), screenMat)
    screen.position.set(0, 0.75, 0.03)
    lidGroup.add(screen)

    // Fake code lines on screen (glowing bars of varying width)
    const codeLines = new THREE.Group()
    const lineH = 0.05, lineGap = 0.085
    for (let i = 0; i < 11; i++) {
      const w = 0.4 + Math.random() * 1.3
      const useBlue = i % 3 === 1
      const bar = new THREE.Mesh(new THREE.PlaneGeometry(w, lineH), useBlue ? codeMat2 : codeMat)
      const indent = (i % 4 === 2) ? 0.18 : 0
      bar.position.set(-0.9 + w / 2 + indent, 1.22 - i * lineGap, 0.032)
      codeLines.add(bar)
    }
    lidGroup.add(codeLines)

    // Brand logo on lid back
    const logo = new THREE.Mesh(new THREE.CircleGeometry(0.12, 24), logoMat)
    logo.position.set(0, 0.75, -0.046)
    logo.rotation.y = Math.PI
    lidGroup.add(logo)

    // Tilt the lid open
    lidGroup.position.set(0, 0, -0.72)
    lidGroup.rotation.x = -0.12
    laptopGroup.add(lidGroup)

    // Position / orientation
    laptopGroup.position.set(-4.2, -1.4, 0)
    laptopGroup.rotation.y = 0.6
    laptopGroup.scale.set(0.92, 0.92, 0.92)
    scene.add(laptopGroup)

    // 4. Animation loop
    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => { mouseX = (e.clientX/innerWidth-0.5)*0.4; mouseY = (e.clientY/innerHeight-0.5)*0.4 }
    const onResize = () => { camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight) }
    window.addEventListener('mousemove', onMouseMove); window.addEventListener('resize', onResize)

    let animationID
    const animate = () => {
      animationID = requestAnimationFrame(animate); const time = Date.now() * 0.001

      // --- PRECISE MATH-BASED VISIBILITY ---
      const scroll = window.pageYOffset || document.documentElement.scrollTop
      const aboutSection = document.getElementById('about-section')
      const aboutTop = aboutSection ? aboutSection.offsetTop : 99999

      let calc = 0
      if (scroll <= 400) {
        calc = scroll / 400
      } else if (scroll > 400 && scroll < (aboutTop - window.innerHeight + 100)) {
        calc = 1
      } else {
        const fadeStart = Math.max(800, aboutTop - window.innerHeight + 100)
        const fadeEnd = fadeStart + 400
        calc = scroll >= fadeEnd ? 0 : 1 - ((scroll - fadeStart) / 400)
      }
      const lapOp = Math.max(0, Math.min(1, calc))

      bgMaterial.opacity = 0.16
      laptopGroup.visible = lapOp > 0.01

      if (laptopGroup.visible) {
        allMats.forEach(m => { m.opacity = lapOp })
        screenMat.opacity = lapOp
        screenMat.emissiveIntensity = 1.0 + Math.sin(time * 2) * 0.15
        codeMat.opacity = (0.85 + Math.sin(time * 3) * 0.15) * lapOp
        codeMat2.opacity = (0.85 + Math.sin(time * 3 + 1) * 0.15) * lapOp
        laptopGroup.rotation.y = 0.6 + Math.sin(time * 0.5) * 0.12 // gentle showroom turntable
      }

      bgPoints.rotation.y += 0.0001
      scene.rotation.x += (mouseY - scene.rotation.x) * 0.05
      scene.rotation.y += (mouseX - scene.rotation.y) * 0.05
      renderer.render(scene, camera)
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
