import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Slide 1: Pulsating green wireframe sphere with rotating floating text
const Slide1 = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1);
    }
    if (textRef.current) {
      textRef.current.style.transform = `rotate(${state.clock.elapsedTime * 30}deg)`;
    }
  });

  return (
    <>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="green" wireframe />
      </mesh>
      <Html position={[0, 0, 0]}>
        <div ref={textRef} style={{ color: 'white', fontSize: '20px' }}>
          Lorem ipsum dolor sit amet
        </div>
      </Html>
    </>
  );
};

// Slide 2: Particle field with emission and movement
const Slide2 = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3);
    for (let i = 0; i < temp.length; i += 3) {
      temp[i] = Math.random() * 10 - 5;
      temp[i + 1] = Math.random() * 10 - 5;
      temp[i + 2] = Math.random() * 10 - 5;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.1;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="white" />
    </points>
  );
};

// Slide 3: Floating text and spinning red cube
const Slide3 = () => {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <Html position={[0, 1, 0]}>
        <div style={{ color: 'white', fontSize: '20px' }}>
          Floating Text
        </div>
      </Html>
      <mesh ref={cubeRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
};

// Slide 4: Cube moving up and down
const Slide4 = () => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const [direction, setDirection] = useState(1);

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.position.y += direction * delta;
      if (cubeRef.current.position.y > 1 || cubeRef.current.position.y < -1) {
        setDirection(prev => -prev);
      }
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
};

const slides = [Slide1, Slide2, Slide3, Slide4];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const CurrentSlide = slides[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas>
        <color attach="background" args={['#001a33']} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CurrentSlide />
        <OrbitControls />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={1.5} />
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
      </Canvas>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Slideshow;