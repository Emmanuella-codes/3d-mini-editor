/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { FC, Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

type MainViewProps = {
  modelUrl: string;
  hotspots: HotspotProps[];
  onClick: (e: any) => void;
};

const MainView: FC<MainViewProps> = ({ modelUrl, hotspots, onClick }) => {
  return (
    <div className=" w-full flex items-center border">
      <Canvas onPointerDown={onClick}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enablePan={true} enableZoom={true} />
        <Suspense fallback={null}>
          {modelUrl && <ModelLoader url={modelUrl} />}
          {hotspots.map((hotspot, idx) => (
            <Hotspot
              key={`h-${idx}`}
              position={hotspot.position}
              label={hotspot.label}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MainView;

type ModelLoaderProps = {
  url: string;
};

const ModelLoader: FC<ModelLoaderProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  const { camera } = useThree();
  const sceneRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene) {
      const fitIntoView = () => {
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = 70;
        const cameraZ = Math.abs(
          (maxDim / 4) * Math.tan((Math.PI * fov) / 360)
        );
        camera.position.set(center.x, center.y, cameraZ);
        camera.lookAt(center.x, center.y, center.z);
      };
      fitIntoView();
    }
  }, [camera, scene]);

  return <primitive ref={sceneRef} object={scene} />;
};

type HotspotProps = {
  position: [number, number, number];
  label: string;
};

const Hotspot: FC<HotspotProps> = ({ position, label }) => {
  return (
    <mesh position={position}>
      <sphereBufferGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="blue" />
      <Html position={[0, 0.2, 0]}>
        <div className="text-white p-2 bg-red-800">{label}</div>
      </Html>
    </mesh>
  );
};
