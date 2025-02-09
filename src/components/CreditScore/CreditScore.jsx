import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import './CreditScore.css';

const ScoreMeter = ({ score, prevScore }) => {
  const ringRef = useRef();
  const targetProgress = (score - 300) / (850 - 300);
  const currentProgress = useRef((prevScore - 300) / (850 - 300));

  useFrame(() => {
    currentProgress.current += (targetProgress - currentProgress.current) * 0.1;
    ringRef.current.scale.x = currentProgress.current;
  });

  return (
    <group>
      {/* Background ring */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[0.7, 0.8, 64]} />
        <meshStandardMaterial color="#1a237e" opacity={0.3} transparent />
      </mesh>
      
      {/* Progress ring */}
      <mesh ref={ringRef} rotation={[0, 0, 0]} scale={[targetProgress, 1, 1]}>
        <ringGeometry args={[0.7, 0.8, 64]} />
        <meshStandardMaterial color={score >= 750 ? "#4caf50" : "#2196f3"} />
      </mesh>
      
      {/* Score text */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {score}
      </Text>
    </group>
  );
};

const CreditScore = ({ score }) => {
  const [prevScore, setPrevScore] = React.useState(score);

  useEffect(() => {
    setPrevScore(score);
  }, [score]);

  const getScoreCategory = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
  };

  return (
    <div className="credit-score">
      <h2>Credit Score</h2>
      <div className="score-display">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <ScoreMeter score={score} prevScore={prevScore} />
        </Canvas>
      </div>
      <div className="score-category">
        {getScoreCategory(score)}
      </div>
      <div className="score-scale">
        <div className="scale-marker" style={{ left: '0%' }}>300</div>
        <div className="scale-marker" style={{ left: '25%' }}>500</div>
        <div className="scale-marker" style={{ left: '50%' }}>650</div>
        <div className="scale-marker" style={{ left: '75%' }}>750</div>
        <div className="scale-marker" style={{ left: '100%' }}>850</div>
      </div>
    </div>
  );
};

export default CreditScore;