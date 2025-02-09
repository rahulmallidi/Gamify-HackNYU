import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CardMesh = ({ isFlipped }) => {
  const meshRef = useRef();
  const flipProgress = useRef(0);

  useFrame(() => {
    if (isFlipped && flipProgress.current < 1) {
      flipProgress.current += 0.05;
    } else if (!isFlipped && flipProgress.current > 0) {
      flipProgress.current -= 0.05;
    }

    const rotation = THREE.MathUtils.lerp(0, Math.PI, flipProgress.current);
    meshRef.current.rotation.y = rotation;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[3, 4, 0.1]} />
      <meshStandardMaterial 
        color={isFlipped ? "#1976d2" : "#2196f3"}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
};

export const CoinMesh = ({ isSpinning, onSpinComplete }) => {
  const meshRef = useRef();
  const spinProgress = useRef(0);
  const spinSpeed = useRef(0.2);
  const totalSpins = useRef(0);

  useFrame(() => {
    if (isSpinning) {
      meshRef.current.rotation.y += spinSpeed.current;
      spinProgress.current += spinSpeed.current;

      if (spinProgress.current >= Math.PI * 2) {
        spinProgress.current = 0;
        totalSpins.current += 1;

        if (totalSpins.current >= 5) {
          spinSpeed.current *= 0.95; // Slow down
          if (spinSpeed.current < 0.01) {
            onSpinComplete();
            totalSpins.current = 0;
            spinSpeed.current = 0.2;
          }
        }
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[1, 1, 0.2, 32]} />
      <meshStandardMaterial 
        color="#ffd700"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

export const ScoreParticles = ({ score, prevScore }) => {
  const particlesRef = useRef();
  const particles = useRef([]);

  useFrame(() => {
    particles.current.forEach((particle, i) => {
      particle.position.y += particle.velocity.y;
      particle.position.x += particle.velocity.x;
      particle.velocity.y -= 0.01; // Gravity

      if (particle.position.y < -10) {
        // Reset particle
        particle.position.set(0, 0, 0);
        particle.velocity.set(
          (Math.random() - 0.5) * 0.2,
          Math.random() * 0.2,
          0
        );
      }
    });
  });

  React.useEffect(() => {
    if (score > prevScore) {
      // Create positive particles
      particles.current = Array(20).fill().map(() => ({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          Math.random() * 0.2,
          0
        ),
        color: new THREE.Color(0x4caf50)
      }));
    } else if (score < prevScore) {
      // Create negative particles
      particles.current = Array(20).fill().map(() => ({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          Math.random() * 0.2,
          0
        ),
        color: new THREE.Color(0xf44336)
      }));
    }
  }, [score, prevScore]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particles.current.length}
          array={new Float32Array(particles.current.length * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          count={particles.current.length}
          array={new Float32Array(particles.current.length * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors />
    </points>
  );
};