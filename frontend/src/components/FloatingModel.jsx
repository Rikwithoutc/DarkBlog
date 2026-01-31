import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

const FloatingModel = () => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.002;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
};

export default FloatingModel;
