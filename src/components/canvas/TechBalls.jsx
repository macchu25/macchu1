import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Ball = ({ imgUrl, position }) => {
  if (!imgUrl) return null;
  const [decal] = useTexture([imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh castShadow receiveShadow scale={4} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const TechBalls = ({ icons }) => {
  // Arrange balls in a grid
  const gridSize = Math.ceil(Math.sqrt(icons.length));
  const spacing = 3;
  return (
    <Canvas frameloop="demand" dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 0, 20], fov: 50 }}>
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <OrbitControls enableZoom={false} />
        {icons.map((icon, i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          // Center the grid
          const x = (col - (gridSize - 1) / 2) * spacing;
          const y = (-(row - (gridSize - 1) / 2)) * spacing;
          return <Ball key={icon + i} imgUrl={icon} position={[x, y, 0]} />;
        })}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default TechBalls; 