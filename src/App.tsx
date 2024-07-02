/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Hotspot, ModelLoader } from "./components/MainView";
import deleteIcon from "/assets/delete.svg";
import { toast } from "sonner";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Raycaster, Vector2, Vector3 } from "three";

type HotspotProps = {
  position: Vector3;
  label: string;
};

function App() {
  const [modelUrl, setModelUrl] = useState("");
  const [hotspots, setHotspots] = useState<HotspotProps[]>([]);
  const [editLabelIdx, setEditLabelIdx] = useState<number | null>(null);
  const [newLabel, setNewLabel] = useState<string>("");
  // const [animate, setAnimate] = useState<boolean>(false);
  const canvasRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);
  const isOrbiting = useRef<any>(false);

  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
    toast("Upload Successfull");
  };

  const handleDeleteFile = () => {
    setModelUrl("");
    setHotspots([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCanvasClick = (e: any) => {
    if (isOrbiting.current) return;
    const canvasBounds = canvasRef.current.getBoundingClientRect();

    const camera = cameraRef.current;
    const scene = sceneRef.current;

    mouse.x = ((e.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.y = -((e.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const point = intersect.point;
      const newHotspot = {
        position: point,
        label: "",
      };
      setHotspots([...hotspots, newHotspot]);
    }
  };

  const handleLabelChange = (newLabel: string, idx: number) => {
    const updatedHotspots = hotspots.map((h, i) =>
      i === idx ? { ...h, label: newLabel } : h
    );
    setHotspots(updatedHotspots);
  };

  const handleDeleteHotspot = (idx: number) => {
    const updatedHotspots = hotspots.filter((_, i) => i !== idx);
    setHotspots(updatedHotspots);
  };

  const handleEditLabelClick = (idx: number) => {
    setEditLabelIdx(idx);
    setNewLabel(hotspots[idx].label);
  };

  const handleSaveLabelClick = () => {
    if (editLabelIdx !== null) {
      handleLabelChange(newLabel, editLabelIdx);
      setEditLabelIdx(null);
      setNewLabel("");
    }
  };

  // const toggleAnimation = () => {
  //   setAnimate(!animate);
  // };

  const handleOrbitStart = () => {
    isOrbiting.current = true;
  };

  const handleOrbitEnd = () => {
    isOrbiting.current = false;
  };

  const ContextBridge: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { scene, camera } = useThree();
    useEffect(() => {
      cameraRef.current = camera;
      sceneRef.current = scene;
    }, [camera, scene]);
    return <>{children}</>;
  };

  return (
    <>
      <div className="w-screen flex flex-col h-dvh px-4 lg:px-16 pb-3">
        <Header
          hotspots={hotspots}
          onDeleteHotspot={handleDeleteHotspot}
          editLabelIdx={editLabelIdx}
          newLabel={newLabel}
          setNewLabel={setNewLabel}
          onEditLabelClick={handleEditLabelClick}
          onSaveLabelClick={handleSaveLabelClick}
          // toggleAnimation={toggleAnimation}
          // animate={animate}
        />
        <div className="w-full flex mt-6 md:px-4 gap-2 md:gap-7 md:max-h-[450px]">
          <main className="w-full">
            <div className="w-full pb-6">
              <div>
                <input
                  type="file"
                  accept=".glb"
                  onChange={handleFileUpload}
                  className="w-4/5"
                  ref={fileInputRef}
                />
              </div>
              {modelUrl && (
                <button
                  onClick={handleDeleteFile}
                  className="w-[100px] mt-5 flex flex-row items-center justify-between py-1 px-2 rounded-md border"
                >
                  <span>Delete</span>
                  <span>
                    <img src={deleteIcon} alt="delete" className="w-5" />
                  </span>
                </button>
              )}
            </div>
            <div className="h-[70vh]">
              <div className="w-full flex items-center border rounded-2xl relative">
                <Canvas
                  onClick={handleCanvasClick}
                  ref={canvasRef}
                  camera={{ fov: 20, position: [0, 0, 30] }}
                  className="relative z-10"
                >
                  <ContextBridge>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls
                      enablePan={true}
                      enableZoom={true}
                      onStart={handleOrbitStart}
                      onEnd={handleOrbitEnd}
                    />
                    <Suspense fallback={null}>
                      {modelUrl && (
                        <ModelLoader url={modelUrl} onClick={() => {}} />
                      )}
                      {hotspots.map((hotspot, idx) => (
                        <Hotspot
                          key={`h-${idx}`}
                          position={hotspot.position}
                          label={hotspot.label}
                          onLabelChange={handleLabelChange}
                          idx={idx}
                          onDelete={() => handleDeleteHotspot(idx)}
                          // animate={animate}
                        />
                      ))}
                    </Suspense>
                  </ContextBridge>
                </Canvas>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
