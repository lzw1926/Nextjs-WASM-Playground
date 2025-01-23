import { css } from "@/styles/css";
import { ImgViewer } from "./components/ImgViewer";
import { useCallback, useEffect, useRef } from "react";
import { MainThread } from "./wasm/main";

export default function EmscriptenWasmWorker() {

  const refCanvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<MainThread>();
  
  useEffect(() => {
    if (!refCanvas.current) return;
    renderer.current = new MainThread(refCanvas.current);
    renderer.current.init(1280, 960).then(() => {
      console.log('urzx wasm worker init success');
    });
  }, []);

  const handleImageChange = useCallback((file: File) => {
    renderer.current?.renderImage(URL.createObjectURL(file));
  }, []);

  return <div>
    <h3 className={css({ fontSize: 20, mb: 2.5 })}>emscripten wasm + Web Worker</h3>
    <p className={css({ fontSize: '14', mb: 2.5, color: 'gray.500' })}>emscripten wasm GL renderer in worker</p>
    <ImgViewer ref={refCanvas} width={1280} height={960} onImageChange={handleImageChange}></ImgViewer>
  </div>;
}