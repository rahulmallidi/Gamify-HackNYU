import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './ScoreEffects.css';

const Particles = ({ scoreChange }) => {
  const particlesRef = useRef();
  const count = 50;
  const particles = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        Math.random() * 0.05,
        (Math.random() - 0.5) * 0.02
      ),
      size: Math.random() * 0.1 + 0.05
    });
  }

  useFrame(() => {
    const positions = particlesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      particles[i].position.add(particles[i].velocity);

      positions[i3] = particles[i].position.x;
      positions[i3 + 1] = particles[i].position.y;
      positions[i3 + 2] = particles[i].position.z;

      // Reset particles that move too far
      if (particles[i].position.y > 2) {
        particles[i].position.y = -2;
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
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={scoreChange >= 0 ? '#4caf50' : '#f44336'}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const ScoreChange = ({ amount }) => {
  const isPositive = amount >= 0;
  
  return (
    <div className={`score-change ${isPositive ? 'positive' : 'negative'}`}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <Particles scoreChange={amount} />
      </Canvas>
      <div className="change-amount">
        {isPositive ? '+' : ''}{amount}
      </div>
    </div>
  );
};

export const ScoreEffect = ({ scoreChange }) => {
  if (!scoreChange) return null;

  return (
    <div className="score-effect-container">
      <ScoreChange amount={scoreChange} />
    </div>
  );
};

export default ScoreEffect;