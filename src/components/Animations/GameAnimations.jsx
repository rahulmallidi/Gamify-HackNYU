import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './GameAnimations.css';

const VictoryParticles = () => {
  const particlesRef = useRef();
  const count = 100;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = -5;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Random colors
      colors[i3] = Math.random();
      colors[i3 + 1] = Math.random();
      colors[i3 + 2] = Math.random();

      speeds[i] = Math.random() * 0.1 + 0.05;
    }
  }, []);

  useFrame(() => {
    const positions = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += speeds[i];

      if (positions[i3 + 1] > 5) {
        positions[i3 + 1] = -5;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const GameOverEffect = () => {
  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial
        color="red"
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export const VictoryAnimation = () => {
  return (
    <div className="victory-overlay">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <VictoryParticles />
      </Canvas>
      <div className="victory-text">
        <h1>Congratulations!</h1>
        <p>You've achieved an excellent credit score!</p>
      </div>
    </div>
  );
};

export const GameOverAnimation = () => {
  return (
    <div className="game-over-overlay">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <GameOverEffect />
      </Canvas>
      <div className="game-over-text">
        <h1>Game Over</h1>
        <p>Keep trying to improve your credit score!</p>
      </div>
    </div>
  );
};