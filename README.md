# Electron 3D Slideshow with React Three Fiber

This project demonstrates a 3D slideshow using React Three Fiber, showcasing various 3D effects and animations.

## Features

- Four unique 3D slides with different effects
- Automatic slide transitions every 5 seconds
- Manual navigation with Previous and Next buttons
- Post-processing effects (Bloom and Vignette)

## Slide Descriptions

### Slide 1: Pulsating Wireframe Sphere

- Pulsating green wireframe sphere
- Rotating floating text
- Uses `useFrame` for animations

### Slide 2: Particle Field

- 1000 particles with emission and movement
- Particles rotate and move in a wave-like pattern
- Uses `useMemo` for particle generation and `useFrame` for animation

### Slide 3: Floating Text and Spinning Cube

- Floating text using HTML overlay
- Spinning red cube
- Uses `useFrame` for cube rotation

### Slide 4: Moving Cube

- Blue cube moving up and down
- Changes direction when reaching top or bottom
- Uses `useState` and `useFrame` for movement and direction change

## Key Technologies

- React
- Three.js
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing

## How to Run

1. Install dependencies: `yarn install`
2. Start the development server: `yarn start`
3. Open in browser.

