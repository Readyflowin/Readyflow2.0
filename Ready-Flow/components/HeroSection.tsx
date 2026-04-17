"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Youtube, MousePointer2, ShieldCheck, Code2 } from 'lucide-react';
import * as THREE from 'three';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // --- THREE.JS ANIMATION EFFECT ---
  useEffect(() => {
    setIsLoaded(true);
    
    if (!canvasRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // 2. Create Floating Geometry (Wireframes)
    const geometries = [
      new THREE.IcosahedronGeometry(0.6, 0), // Complex shape
      new THREE.OctahedronGeometry(0.5, 0),  // Diamond shape
      new THREE.TetrahedronGeometry(0.5, 0)  // Triangle shape
    ];

    // ReadyFlow Orange Material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff6b35, // Orange
      emissive: 0xff4500,
      emissiveIntensity: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const shapes: THREE.Mesh[] = [];
    
    // Create 15 floating particles
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geometry, material.clone());
      
      // Random spread
      mesh.position.x = (Math.random() - 0.5) * 15;
      mesh.position.y = (Math.random() - 0.5) * 15;
      mesh.position.z = (Math.random() - 0.5) * 8;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      // Store movement data
      mesh.userData = {
        velocity: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          rotation: (Math.random() - 0.5) * 0.01
        }
      };
      
      scene.add(mesh);
      shapes.push(mesh);
    }

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff6b35, 2, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // 4. Interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape) => {
        // Continuous movement
        shape.position.x += shape.userData.velocity.x;
        shape.position.y += shape.userData.velocity.y;
        shape.rotation.x += shape.userData.velocity.rotation;
        shape.rotation.y += shape.userData.velocity.rotation;

        // Mouse Repulsion Effect (Subtle push away)
        const dist = Math.sqrt(
            Math.pow(shape.position.x - mouseRef.current.x * 5, 2) + 
            Math.pow(shape.position.y - mouseRef.current.y * 5, 2)
        );
        if (dist < 3) {
             shape.position.x += (shape.position.x - mouseRef.current.x * 5) * 0.01;
             shape.position.y += (shape.position.y - mouseRef.current.y * 5) * 0.01;
        }

        // Keep inside bounds
        if (Math.abs(shape.position.x) > 8) shape.userData.velocity.x *= -1;
        if (Math.abs(shape.position.y) > 8) shape.userData.velocity.y *= -1;
      });

      // Camera sway
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col justify-center">
      
      {/* 1. 3D BACKGROUND LAYER */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s' }}
      />

      {/* 2. GRADIENT OVERLAYS (For readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-0 pointer-events-none" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/10 blur-[100px] rounded-full animate-pulse z-0 pointer-events-none" />

      {/* 3. MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
       
        {/* Headline */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1]"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.2s'
          }}
        >
          Scale Indian eCommerce <br />
          <span className="relative inline-block mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 animate-gradient">
              Without Bleeding Cash.
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p 
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.4s'
          }}
        >
          Stop paying monthly fees for basic tools. Get <span className="text-white font-bold">Pop-ups, Chatbots & Policies</span> designed for the Indian market—all in one place.
        </p>

        {/* Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.6s'
          }}
        >
          {/* Primary Button */}
          <Link href="/pricing" className="group relative w-full sm:w-auto">
             <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
             <button className="relative w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                Get Started Now <ArrowRight className="w-5 h-5" />
             </button>
          </Link>

          {/* Secondary Button */}
          <Link href="https://youtube.com/@readyflow" target="_blank" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-md">
                <Youtube className="w-5 h-5 text-red-500" /> Watch Tutorial
            </button>
          </Link>
        </div>

        {/* REALISTIC STATS BAR */}
        <div 
          className="mt-20 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-gray-500 font-medium"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out 0.8s'
          }}
        >
            <div className="flex items-center gap-2">
                <div className="bg-green-500/10 p-2 rounded-lg"><Code2 size={16} className="text-green-500"/></div>
                <span><strong className="text-white block text-lg">100%</strong> Free Tools</span>
            </div>
            
            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>

            <div className="flex items-center gap-2">
                <div className="bg-blue-500/10 p-2 rounded-lg"><MousePointer2 size={16} className="text-blue-500"/></div>
                <span><strong className="text-white block text-lg">120+</strong> Beta Users</span>
            </div>

            <div className="w-px h-10 bg-white/10 hidden sm:block"></div>

            <div className="flex items-center gap-2">
                <div className="bg-orange-500/10 p-2 rounded-lg"><ShieldCheck size={16} className="text-orange-500"/></div>
                <span><strong className="text-white block text-lg">Secure</strong> Codebase</span>
            </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;