import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function DataPoints() {
  const ref = useRef();
  
  // Generate random points on sphere surface
  const particlesCount = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const x = Math.sin(phi) * Math.cos(theta) * 0.8;
      const y = Math.sin(phi) * Math.sin(theta) * 0.8;
      const z = Math.cos(phi) * 0.8;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#06b6d4"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Globe() {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {/* Main sphere with wireframe */}
      <Sphere args={[0.8, 32, 32]}>
        <meshPhongMaterial
          color="#1f2937"
          emissive="#0ea5e9"
          emissiveIntensity={0.1}
          opacity={0.8}
          transparent
          wireframe
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[0.85, 32, 32]}>
        <meshBasicMaterial
          color="#06b6d4"
          opacity={0.1}
          transparent
        />
      </Sphere>
    </group>
  );
}

const DataGlobe = () => {
  return (
    <div className="w-full h-full" style={{ minHeight: '100%' }}>
      <Canvas 
        camera={{ position: [0, 0, 3.5], fov: 35 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Globe />
        <DataPoints />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default DataGlobe;