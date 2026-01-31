import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WireframeWave = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const geometry = meshRef.current.geometry;
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);

      const wave =
        Math.sin(x * 0.4 + time) * 0.6 +
        Math.cos(y * 0.4 + time) * 0.6;

      position.setZ(i, wave);
    }

    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshBasicMaterial
        color="#a855f7"
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
};

export default WireframeWave;
