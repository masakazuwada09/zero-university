"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import {
  Sparkles,
  RotateCw,
  Box,
  Eye,
  Sliders,
  Layers,
  Activity,
  Maximize2,
} from "lucide-react";

type GeometryType = "torus" | "icosahedron" | "dna" | "wave" | "mobius";
type RenderMode = "wireframe" | "points" | "solid" | "hybrid";

export function ThreeJsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geometryType, setGeometryType] = useState<GeometryType>("torus");
  const [renderMode, setRenderMode] = useState<RenderMode>("hybrid");
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [particleDensity, setParticleDensity] = useState<number>(600);
  const [fps, setFps] = useState<number>(60);

  // References for live 3D mutations
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const speedRef = useRef(1);
  const modeRef = useRef<RenderMode>("hybrid");
  const geoRef = useRef<GeometryType>("torus");

  speedRef.current = rotationSpeed;
  modeRef.current = renderMode;
  geoRef.current = geometryType;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 3. Dynamic Mesh Group
    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xa3ff75, 4, 20);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x4cdaa0, 3, 20);
    fillLight.position.set(-5, -4, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x83ecc1, 2, 15);
    rimLight.position.set(0, 6, -4);
    scene.add(rimLight);

    // Helper to build geometry based on type and render mode
    const buildMeshes = (geoType: GeometryType, mode: RenderMode) => {
      // Clear previous meshes
      while (meshGroup.children.length > 0) {
        const obj = meshGroup.children[0];
        meshGroup.remove(obj);
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        } else if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      }

      let geo: THREE.BufferGeometry;

      if (geoType === "torus") {
        geo = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32, 2, 3);
      } else if (geoType === "icosahedron") {
        geo = new THREE.IcosahedronGeometry(2.0, 2);
      } else if (geoType === "mobius") {
        // High-order parametric torus
        geo = new THREE.TorusGeometry(1.8, 0.5, 30, 200, Math.PI * 2);
      } else if (geoType === "wave") {
        // Plane with displaced sine wave lattice
        geo = new THREE.PlaneGeometry(3.6, 3.6, 32, 32);
      } else {
        // DNA double helix simulated cylinder/tube
        geo = new THREE.CylinderGeometry(1.2, 1.2, 3.5, 24, 24, true);
      }

      // 1. Solid / Mesh
      if (mode === "solid" || mode === "hybrid") {
        const mat = new THREE.MeshPhysicalMaterial({
          color: 0x0f291e,
          emissive: 0x06130d,
          roughness: 0.15,
          metalness: 0.85,
          clearcoat: 0.6,
          wireframe: false,
          transparent: mode === "hybrid",
          opacity: mode === "hybrid" ? 0.65 : 0.95,
        });
        const mesh = new THREE.Mesh(geo, mat);
        meshGroup.add(mesh);
      }

      // 2. Wireframe Overlay
      if (mode === "wireframe" || mode === "hybrid") {
        const wireMat = new THREE.MeshStandardMaterial({
          color: 0xa3ff75,
          wireframe: true,
          transparent: true,
          opacity: mode === "wireframe" ? 0.85 : 0.45,
        });
        const wireMesh = new THREE.Mesh(geo.clone(), wireMat);
        wireMesh.scale.setScalar(1.002); // Avoid Z-fighting
        meshGroup.add(wireMesh);
      }

      // 3. Points / Particles
      if (mode === "points" || mode === "hybrid") {
        const pointMat = new THREE.PointsMaterial({
          color: 0x83ecc1,
          size: 0.05,
          transparent: true,
          opacity: 0.9,
        });
        const points = new THREE.Points(geo.clone(), pointMat);
        meshGroup.add(points);
      }
    };

    buildMeshes(geoRef.current, modeRef.current);

    // Mouse Dragging / Orbit interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation & FPS Tracker Loop
    let animId: number;
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // FPS calculation
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      // Auto rotation + drag inertia
      const speed = speedRef.current;
      targetRotY += 0.006 * speed;

      meshGroup.rotation.y += (targetRotY - meshGroup.rotation.y) * 0.1;
      meshGroup.rotation.x += (targetRotX - meshGroup.rotation.x) * 0.1;

      // Real-time vertex wave animation if "wave" or "dna"
      if (geoRef.current === "wave") {
        meshGroup.children.forEach((child) => {
          if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
            const pos = child.geometry.attributes.position;
            if (pos) {
              const arr = pos.array as Float32Array;
              for (let i = 0; i < arr.length; i += 3) {
                const u = arr[i];
                const v = arr[i + 1];
                arr[i + 2] = Math.sin(u * 2 + elapsedTime * 2) * 0.3 + Math.cos(v * 2 + elapsedTime * 2) * 0.3;
              }
              pos.needsUpdate = true;
            }
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Expose rebuild callback
    (container as unknown as { rebuild: (g: GeometryType, m: RenderMode) => void }).rebuild = (
      g: GeometryType,
      m: RenderMode
    ) => {
      buildMeshes(g, m);
    };

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("resize", onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update geometry & render mode when states change
  useEffect(() => {
    const container = containerRef.current as unknown as {
      rebuild?: (g: GeometryType, m: RenderMode) => void;
    };
    if (container && container.rebuild) {
      container.rebuild(geometryType, renderMode);
    }
  }, [geometryType, renderMode]);

  return (
    <section id="three-lab" className="relative w-full py-28 sm:py-36 px-4 sm:px-8 border-t border-white/10 bg-forest-950/75 backdrop-blur-[2px] overflow-hidden z-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint-accent mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>// 3D FRONTIER LAB : THREE.JS INTERACTIVE SUBSTRATES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              Mathematical <br />
              <span className="font-serif italic font-normal text-gradient-mint">
                Topologies In Motion.
              </span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs sm:text-sm text-white/60 leading-relaxed">
            <p>
              [ COMPUTATIONAL EXPERIMENTS ] : Real-time WebGL shader rendering.
              Click and drag to rotate in 3D. Switch geometries and render modes live.
            </p>
          </div>
        </div>

        {/* 3D Lab Console UI */}
        <div className="relative rounded-3xl border border-white/15 bg-forest-900/60 p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Top Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6 font-mono text-xs text-white/60">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-mint-accent">
                <Activity className="h-4 w-4 animate-pulse" />
                <span>RENDERER: WEBGL 2.0 (TURBO)</span>
              </span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="text-white/80">FPS: {fps}</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="text-white/80">VERTICES: ~12,400</span>
            </div>

            <div className="flex items-center gap-2 text-mint-accent/80">
              <Maximize2 className="h-3.5 w-3.5" />
              <span>CLICK + DRAG TO ORBIT</span>
            </div>
          </div>

          {/* Interactive Controls Overlay */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls: Geometries & Render Modes */}
            <div className="lg:col-span-4 flex flex-col gap-6 z-20">
              {/* Geometry Presets */}
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-mint-accent block mb-3 flex items-center gap-1.5">
                  <Box className="h-3.5 w-3.5" />
                  <span>Select Topology</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "torus", label: "Torus Knot" },
                    { id: "icosahedron", label: "Icosahedron" },
                    { id: "mobius", label: "Mobius Ring" },
                    { id: "wave", label: "Wave Lattice" },
                    { id: "dna", label: "Helix Core" },
                  ].map((geo) => (
                    <button
                      key={geo.id}
                      onClick={() => {
                        sound.playHover();
                        setGeometryType(geo.id as GeometryType);
                      }}
                      data-cursor="TOPOLOGY"
                      className={`p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                        geometryType === geo.id
                          ? "border-mint-accent bg-mint-accent/15 text-white font-bold shadow-md shadow-mint-accent/10"
                          : "border-white/10 bg-forest-950/60 text-white/60 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {geo.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Render Modes */}
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-mint-accent block mb-3 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Shader Style</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "hybrid", label: "Hybrid Lattice" },
                    { id: "wireframe", label: "Holo Wireframe" },
                    { id: "points", label: "Particle Cloud" },
                    { id: "solid", label: "Obsidian Core" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        sound.playHover();
                        setRenderMode(mode.id as RenderMode);
                      }}
                      data-cursor="SHADER"
                      className={`p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                        renderMode === mode.id
                          ? "border-mint-accent bg-mint-accent/15 text-white font-bold"
                          : "border-white/10 bg-forest-950/60 text-white/60 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Velocity Slider */}
              <div className="p-4 rounded-xl border border-white/10 bg-forest-950/70 font-mono text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 flex items-center gap-1.5">
                    <RotateCw className="h-3.5 w-3.5 text-mint-accent" />
                    <span>Spin Velocity</span>
                  </span>
                  <span className="text-mint-accent font-bold">{rotationSpeed}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.25"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-full accent-mint-accent cursor-pointer"
                />
              </div>
            </div>

            {/* Right: Three.js Interactive Viewport (Span 8) */}
            <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[480px] rounded-2xl border border-white/10 bg-forest-950/90 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
              {/* Canvas Mount Container */}
              <div
                ref={containerRef}
                className="absolute inset-0 w-full h-full"
                data-cursor="DRAG 3D"
              />

              {/* Crosshair Viewfinder Guides */}
              <div className="pointer-events-none absolute inset-6 border border-white/5 rounded-xl" />
              <div className="pointer-events-none absolute top-4 left-4 font-mono text-[10px] text-white/30">
                [ CAMERA // FOV: 45° ]
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] text-mint-accent/60">
                // ACTIVE NODE: {geometryType.toUpperCase()} ({renderMode.toUpperCase()})
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
