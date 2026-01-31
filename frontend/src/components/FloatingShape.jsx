import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const Shape = ({ type, position, color, scale = 1 }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.elapsedTime * 0.15;
    ref.current.rotation.y = clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        {type === "cube" ? (
          <boxGeometry args={[1, 1, 1]} />
        ) : (
          <sphereGeometry args={[0.6, 32, 32]} />
        )}
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

const FloatingShapes = () => {
  return (
    <>
      <Shape type="cube" position={[-4, 1, -2]} color="#a855f7" scale={1} />
      <Shape type="sphere" position={[4, -1, -3]} color="#22d3ee" scale={1.2} />
      <Shape type="cube" position={[0, 3, -4]} color="#ec4899" scale={0.9} />
    </>
  );
};

export default FloatingShapes;
