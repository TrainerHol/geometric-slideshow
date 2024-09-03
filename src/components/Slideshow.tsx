import React, { useState, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

// Slide 1: Green wireframe sphere with floating text
const Slide1 = () => (
  <>
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="green" wireframe />
    </mesh>
    <Html position={[0, 0, 0]}>
      <div style={{ color: 'white', fontSize: '20px' }}>
        Lorem ipsum dolor sit amet
      </div>
    </Html>
  </>
);

// Slide 2: Particle field with emission
const Slide2 = () => {
  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3);
    for (let i = 0; i < temp.length; i += 3) {
      temp[i] = Math.random() * 10 - 5;
      temp[i + 1] = Math.random() * 10 - 5;
      temp[i + 2] = Math.random() * 10 - 5;
    }
    return temp;
  }, []);

  return (
    <points>
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
  const { rotation } = useSpring({
    from: { rotation: 0 },
    to: { rotation: Math.PI * 2 },
    loop: true,
    config: { duration: 3000 },
  });

  return (
    <>
      <Html position={[0, 1, 0]}>
        <div style={{ color: 'white', fontSize: '20px' }}>
          Floating Text
        </div>
      </Html>
      <animated.mesh rotation-y={rotation}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </animated.mesh>
    </>
  );
};

// Slide 4: Cube moving up and down
const Slide4 = () => {
  const { position } = useSpring({
    from: { position: [0, -1, 0] },
    to: { position: [0, 1, 0] },
    loop: { reverse: true },
    config: { duration: 2000 },
  });

  return (
    <animated.mesh >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="blue" />
    </animated.mesh>
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

  return (
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
  );
};

export default Slideshow;