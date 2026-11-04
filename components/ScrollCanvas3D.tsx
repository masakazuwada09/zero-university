"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ScrollCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06130d, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent
    container.appendChild(renderer.domElement);

    // 4. Main World Anchor Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Primary Core: High-density Torus Knot
    const coreGeometry = new THREE.TorusKnotGeometry(1.8, 0.42, 160, 24, 2, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x4cdaa0,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    worldGroup.add(coreMesh);

    // Secondary Inner Nucleus: Multi-faceted Icosahedron
    const nucleusGeometry = new THREE.IcosahedronGeometry(1.1, 1);
    const nucleusMaterial = new THREE.MeshStandardMaterial({
      color: 0xa3ff75,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.9,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    worldGroup.add(nucleusMesh);

    // Dual Polar Rings (used in Section 2: Legacy vs Zero paradox)
    const polarRing1Geo = new THREE.TorusGeometry(2.6, 0.04, 16, 100);
    const polarRing1Mat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e, // Crimson for legacy
      transparent: true,
      opacity: 0,
      wireframe: true,
    });
    const polarRing1 = new THREE.Mesh(polarRing1Geo, polarRing1Mat);
    worldGroup.add(polarRing1);

    const polarRing2Geo = new THREE.TorusGeometry(2.4, 0.05, 16, 100);
    const polarRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xa3ff75, // Mint for zero
      transparent: true,
      opacity: 0,
      wireframe: true,
    });
    const polarRing2 = new THREE.Mesh(polarRing2Geo, polarRing2Mat);
    worldGroup.add(polarRing2);

    // 4 Orbital Satellites (for Section 5: The 4 Tracks)
    const satelliteGroup = new THREE.Group();
    const satellites: THREE.Mesh[] = [];
    const satColors = [0xa3ff75, 0x4cdaa0, 0x83ecc1, 0xe8e2d3];

    for (let i = 0; i < 4; i++) {
      const satGeo = new THREE.OctahedronGeometry(0.35, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: satColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satellites.push(satMesh);
      satelliteGroup.add(satMesh);
    }
    worldGroup.add(satelliteGroup);

    // 5. Living Particle Constellation (800 particles with individual dynamics)
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const initialPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorMint = new THREE.Color(0x83ecc1);
    const colorLime = new THREE.Color(0xa3ff75);
    const colorWhite = new THREE.Color(0xf5f6f2);

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 5.0 + 1.2;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      const col = i % 3 === 0 ? colorLime : i % 2 === 0 ? colorMint : colorWhite;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particleSystem);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLightPrimary = new THREE.PointLight(0xa3ff75, 3.5, 18);
    pointLightPrimary.position.set(5, 6, 5);
    scene.add(pointLightPrimary);

    const pointLightSecondary = new THREE.PointLight(0x4cdaa0, 2.5, 18);
    pointLightSecondary.position.set(-5, -5, 3);
    scene.add(pointLightSecondary);

    // Dynamic state tracking
    let scrollProgress = 0;
    let targetScroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetScroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 7. Animation Loop with Cinematic Scroll Keyframes
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp for scroll and mouse inertia
      scrollProgress += (targetScroll - scrollProgress) * 0.06;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const p = scrollProgress; // 0.0 to 1.0

      // Calculate Section Milestones:
      // Section 0 (Hero): 0.0 - 0.14
      // Section 1 (Manifesto): 0.14 - 0.30
      // Section 2 (Paradox / Problem): 0.30 - 0.48
      // Section 3 (Metamorphosis): 0.48 - 0.68
      // Section 4 (Experience / OS): 0.68 - 0.84
      // Section 5 (Possibilities / Tracks): 0.84 - 0.94
      // Section 6 (Final CTA): 0.94 - 1.0

      // 1. Dynamic World Group Position & Rotation based on scroll
      if (p < 0.15) {
        // Hero: Centered, imposing, responding to mouse
        const t = p / 0.15;
        worldGroup.position.x = THREE.MathUtils.lerp(0, 2.2, t);
        worldGroup.position.y = THREE.MathUtils.lerp(0, -0.2, t);
        worldGroup.position.z = THREE.MathUtils.lerp(0, -1.0, t);
        worldGroup.scale.setScalar(THREE.MathUtils.lerp(1.0, 0.85, t));

        coreMaterial.opacity = 0.4;
        nucleusMaterial.opacity = 0.7;
        polarRing1Mat.opacity = 0;
        polarRing2Mat.opacity = 0;
      } else if (p < 0.32) {
        // Section 1: Drifting to right side to frame the manifesto typography
        const t = (p - 0.15) / 0.17;
        worldGroup.position.x = THREE.MathUtils.lerp(2.2, -2.4, t);
        worldGroup.position.y = THREE.MathUtils.lerp(-0.2, 0.3, t);
        worldGroup.position.z = THREE.MathUtils.lerp(-1.0, -0.6, t);
        worldGroup.scale.setScalar(THREE.MathUtils.lerp(0.85, 0.95, t));

        polarRing1Mat.opacity = 0;
        polarRing2Mat.opacity = 0;
      } else if (p < 0.5) {
        // Section 2: The Paradox: Dual polar rings illuminate, representing legacy vs zero
        const t = (p - 0.32) / 0.18;
        worldGroup.position.x = THREE.MathUtils.lerp(-2.4, 0, t);
        worldGroup.position.y = THREE.MathUtils.lerp(0.3, -0.1, t);
        worldGroup.position.z = THREE.MathUtils.lerp(-0.6, -1.8, t);
        worldGroup.scale.setScalar(THREE.MathUtils.lerp(0.95, 1.25, t));

        // Fade in opposing polar rings with tension
        polarRing1Mat.opacity = THREE.MathUtils.lerp(0, 0.65, Math.sin(t * Math.PI));
        polarRing2Mat.opacity = THREE.MathUtils.lerp(0, 0.8, Math.sin(t * Math.PI));
        polarRing1.rotation.x = elapsedTime * 0.4;
        polarRing1.rotation.y = elapsedTime * 0.6;
        polarRing2.rotation.x = -elapsedTime * 0.5;
        polarRing2.rotation.z = elapsedTime * 0.7;
      } else if (p < 0.7) {
        // Section 3: Metamorphosis: Camera dives into the structure, wireframe unfolds
        const t = (p - 0.5) / 0.2;
        worldGroup.position.x = THREE.MathUtils.lerp(0, 1.8, t);
        worldGroup.position.y = THREE.MathUtils.lerp(-0.1, 0.2, t);
        worldGroup.position.z = THREE.MathUtils.lerp(-1.8, 1.5, t); // Zoom close
        worldGroup.scale.setScalar(THREE.MathUtils.lerp(1.25, 0.8, t));

        // Color shift for warm beige background compatibility
        coreMaterial.color.setHex(0x1f4f3b);
        nucleusMaterial.color.setHex(0x22c55e);
        polarRing1Mat.opacity = 0;
        polarRing2Mat.opacity = 0;
      } else if (p < 0.88) {
        // Section 4: Interface OS: Expands into background neural network
        const t = (p - 0.7) / 0.18;
        worldGroup.position.x = THREE.MathUtils.lerp(1.8, -1.5, t);
        worldGroup.position.y = THREE.MathUtils.lerp(0.2, -0.4, t);
        worldGroup.position.z = THREE.MathUtils.lerp(1.5, -2.5, t);
        worldGroup.scale.setScalar(THREE.MathUtils.lerp(0.8, 1.4, t));

        // Restore vibrant mint
        coreMaterial.color.setHex(0x4cdaa0);
        nucleusMaterial.color.setHex(0xa3ff75);
      } else if (p < 0.95) {
        // Section 5: The 4 Satellites revolve around the 4 tracks
        const t = (p - 0.88) / 0.07;
        worldGroup.position.x = THREE.MathUtils.lerp(-1.5, 0, t);
        worldGroup.position.y = THREE.MathUtils.lerp(-0.4, 0, t);
        worldGroup.position.z = THREE.MathUtils.lerp(-2.5, -1.2, t);
        worldGroup.scale.setScalar(THREE.MathUtils.lerp(1.4, 1.0, t));

        // Orbit satellites
        satellites.forEach((sat, i) => {
          (sat.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(0, 0.85, t);
          const angle = elapsedTime * 0.6 + (i * Math.PI) / 2;
          const dist = 3.2;
          sat.position.set(Math.cos(angle) * dist, Math.sin(angle * 1.5) * 0.8, Math.sin(angle) * dist);
          sat.rotation.x = elapsedTime;
          sat.rotation.y = elapsedTime * 1.5;
        });
      } else {
        // Section 6: Final CTA: Supernova / Singularity Warp
        const t = (p - 0.95) / 0.05;
        worldGroup.position.x = 0;
        worldGroup.position.y = 0;
        worldGroup.position.z = THREE.MathUtils.lerp(-1.2, 2.2, t);
        worldGroup.scale.setScalar(THREE.MathUtils.lerp(1.0, 1.8, t));

        satellites.forEach((sat) => {
          (sat.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(0.85, 0, t);
        });
      }

      // Continuous rotation with scroll-speed acceleration & mouse parallax
      const scrollSpinBoost = 1.0 + Math.abs(targetScroll - scrollProgress) * 15;
      coreMesh.rotation.y = elapsedTime * 0.18 * scrollSpinBoost + mouseX * 0.5;
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15 + mouseY * 0.4;
      coreMesh.rotation.z = scrollProgress * Math.PI * 4;

      nucleusMesh.rotation.y = -elapsedTime * 0.35 * scrollSpinBoost - mouseX * 0.3;
      nucleusMesh.rotation.x = elapsedTime * 0.2 + mouseY * 0.3;

      // Particle Constellation Dynamic Warp
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ix = initialPositions[i3];
        const iy = initialPositions[i3 + 1];
        const iz = initialPositions[i3 + 2];

        // Particle warp based on scroll progress and time
        const wave = Math.sin(elapsedTime * 1.5 + ix * 0.5) * 0.15;
        const scrollDisplace = Math.sin(p * Math.PI * 3 + iy * 0.8) * 0.5;

        // If near end (warp climax), stretch particles toward camera
        if (p > 0.92) {
          const warpFactor = (p - 0.92) / 0.08;
          posArray[i3 + 2] = iz + Math.sin(elapsedTime * 6 + i) * warpFactor * 4;
        } else {
          posArray[i3] = ix + wave;
          posArray[i3 + 1] = iy + scrollDisplace;
          posArray[i3 + 2] = iz + wave;
        }
      }
      posAttr.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.04 + scrollProgress * Math.PI;

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Cleanup GPU memory
      coreGeometry.dispose();
      coreMaterial.dispose();
      nucleusGeometry.dispose();
      nucleusMaterial.dispose();
      polarRing1Geo.dispose();
      polarRing1Mat.dispose();
      polarRing2Geo.dispose();
      polarRing2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      satellites.forEach((sat) => {
        sat.geometry.dispose();
        (sat.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-forest-700/20 blur-[160px] rounded-full animate-pulse-slow" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
