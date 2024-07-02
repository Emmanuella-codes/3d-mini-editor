/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html, useGLTF } from "@react-three/drei";
import { FC, useEffect, useRef, useState } from "react";
import deleteIcon from "/assets/delete.svg";
import { Box3, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

type HotspotProps = {
  position: Vector3;
  label: string;
  onLabelChange: (label: string, idx: number) => void;
  idx: number;
  onDelete: () => void;
  // animate: boolean;
};

type ModelLoaderProps = {
  url: string;
  onClick: (e: any) => void;
};

export const ModelLoader: FC<ModelLoaderProps> = ({ url, onClick }) => {
  const { scene } = useGLTF(url);
  const meshRef = useRef<any>();

  useEffect(() => {
    if (meshRef.current) {
      const box = new Box3().setFromObject(meshRef.current);
      const center = box.getCenter(new Vector3());
      meshRef.current.position.sub(center);
    }
  }, [scene]);

  return <primitive ref={meshRef} object={scene} onClick={onClick} />;
};

export const Hotspot: FC<HotspotProps> = ({
  position,
  label,
  onLabelChange,
  idx,
  onDelete,
}) => {
  const meshRef = useRef<any>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }  
  });

  const [localLabel, setLocalLabel] = useState(label);

  useEffect(() => {
    setLocalLabel(label);
  }, [label]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLabel(e.target.value);
  };

  const handleBlur = () => {
    onLabelChange(localLabel, idx);
  };

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="red" />
      <Html>
        <div
          style={{
            color: "#000",
            padding: 2,
            backgroundColor: "#000",
            position: "relative",
          }}
        >
          <input
            type="text"
            value={localLabel}
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={onDelete} className="w-6 absolute top-0">
            <img src={deleteIcon} alt="delete" className="w-5" />
          </button>
        </div>
      </Html>
    </mesh>
  );
};
