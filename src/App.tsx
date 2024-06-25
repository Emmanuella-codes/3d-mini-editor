/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MainView from "./components/MainView";
import * as THREE from "three";

type HotspotProps = {
  position: [number, number, number];
  label: string;
};

function App() {
  const [modelUrl, setModelUrl] = useState("");
  const [hotspots, setHotspots] = useState<HotspotProps[]>([]);
  const canvasRef = useRef<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  const handleCanvasClick = (e: any) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { camera, scene } = canvas;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const [x, y, z] = intersect.point.toArray();
      const label = prompt("Enter label for the hotspot:");
      if (label) {
        setHotspots((prevHotspots) => [
          ...prevHotspots,
          { position: [x, y, z], label },
        ]);
      }
    }
  };

  return (
    <>
      <div className="w-screen flex flex-col h-dvh px-4 pb-3">
        <Header />
        <div className="w-full flex mt-6 md:px-4 gap-2 md:gap-7 md:max-h-[450px]">
          <main className="w-full">
            <div className="w-full pb-6">
              <input
                type="file"
                accept=".glb"
                onChange={handleFileUpload}
                className="w-4/5"
              />
            </div>
            <div className="h-[70vh]">
              <MainView
                modelUrl={modelUrl}
                hotspots={hotspots}
                onClick={handleCanvasClick}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}


export default App;
