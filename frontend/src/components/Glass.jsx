import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";

const GlassOrb = ({ position, color }) => {
  const mesh = useRef();

  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} position={position} scale={1.1}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.4}
          roughness={0}
          chromaticAberration={0.04}
          anisotropicBlur={0.1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.15}
          color={color}
        />
      </mesh>
    </Float>
  );
};

const GlassOrbs = () => {
  return (
    <>
      <GlassOrb position={[-3, 1, -2]} color="#a855f7" />
      <GlassOrb position={[3, -1, -1]} color="#ec4899" />
      <GlassOrb position={[0, 2.5, -3]} color="#22d3ee" />
    </>
  );
};

export default GlassOrbs;
