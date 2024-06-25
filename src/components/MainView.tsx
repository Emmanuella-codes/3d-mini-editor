/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html, useGLTF } from "@react-three/drei";
import { FC, useRef } from "react";
import { Vector3 } from "three";

type HotspotProps = {
  position: Vector3;
  label: string;
  onLabelChange: (e: any) => void;
};

type ModelLoaderProps = {
  url: string;
  onClick: (e: any) => void;
};

export const ModelLoader: FC<ModelLoaderProps> = ({ url, onClick }) => {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  return <primitive ref={meshRef} object={scene} onClick={onClick} />;
};

export const Hotspot: FC<HotspotProps> = ({ position, label, onLabelChange }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="red" />
      <Html>
        <div style={{ color: "white", padding: 2, backgroundColor: "#000" }}>
          <input type="text" value={label} onChange={(e) => onLabelChange(e.target.value)} />
        </div>
      </Html>
    </mesh>
  );
};
