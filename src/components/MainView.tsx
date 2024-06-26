/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html, useGLTF } from "@react-three/drei";
import { FC, useEffect, useRef, useState } from "react";
import deleteIcon from "/assets/delete.svg";
import { Vector3 } from "three";

type HotspotProps = {
  position: Vector3;
  label: string;
  onLabelChange: (label: string, idx: number) => void;
  idx: number;
  onDelete: () => void;
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

export const Hotspot: FC<HotspotProps> = ({
  position,
  label,
  onLabelChange,
  idx,
  onDelete,
}) => {
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
    <mesh position={position}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="red" />
      <Html>
        <div
          style={{
            color: "#000",
            padding: 2,
            backgroundColor: "#000",
            position: "relative"
          }}
        >
          <input
            type="text"
            value={localLabel}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button onClick={onDelete} className="w-6 absolute top-0">
            <img src={deleteIcon} alt="delete" className="w-5" />
          </button>
        </div>
      </Html>
    </mesh>
  );
};
