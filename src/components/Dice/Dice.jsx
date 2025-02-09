import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './Dice.css';

const DiceMesh = ({ isRolling, finalResult, onRollComplete }) => {
  const meshRef = useRef();
  const animationTime = useRef(0);
  const [rotation, setRotation] = useState([0, 0, 0]);

  useFrame((state, delta) => {
    if (isRolling) {
      meshRef.current.rotation.x += 0.15;
      meshRef.current.rotation.y += 0.2;
      meshRef.current.rotation.z += 0.1;
      
      animationTime.current += delta;
      
      // Stop rolling after 2 seconds
      if (animationTime.current >= 2) {
        onRollComplete();
        animationTime.current = 0;
      }
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="white" />
        {/* Dice Numbers */}
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.8}
          color="black"
        >
          {isRolling ? "?" : finalResult}
        </Text>
      </mesh>
    </group>
  );
};

const Dice = ({ onRoll }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const handleRollClick = () => {
    if (!isRolling) {
      setIsRolling(true);
      setShowResult(false);
      const newResult = Math.floor(Math.random() * 6) + 1;
      setResult(newResult);
    }
  };

  const handleRollComplete = () => {
    setIsRolling(false);
    setShowResult(true);
    
    // Set result message based on dice value
    const messages = {
      1: "Unexpected expense: -$500",
      2: "No extra income",
      3: "Bonus income: +$500",
      4: "Bonus income: +$500",
      5: "Bonus income: +$1,000",
      6: "Large bonus: +$2,000"
    };
    setResultMessage(messages[result]);

    // Wait a moment before calling onRoll to show the result
    setTimeout(() => {
      onRoll(result);
    }, 2000);
  };

  return (
    <div className="dice-container">
      <h3>Roll for Extra Income!</h3>
      
      <div className="dice-stage">
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }}
          shadows
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <DiceMesh 
            isRolling={isRolling}
            finalResult={result}
            onRollComplete={handleRollComplete}
          />
        </Canvas>
      </div>

      {showResult && (
        <div className="dice-result">
          <p className="result-text">{resultMessage}</p>
        </div>
      )}

      <button 
        className={`roll-button ${isRolling ? 'disabled' : ''}`}
        onClick={handleRollClick}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default Dice;