import { Button } from "@/components/button";
import { css } from "@/styles/css";
import { WebGLRenderer } from './wasm';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

export default function UrzxWASMPage() {

  const refInput = useRef<HTMLInputElement>(null);
  const [filename, setFileName] = useState<string>();
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<WebGLRenderer>();
  
  useEffect(() => {
    if (!refCanvas.current) return;
    renderer.current = new WebGLRenderer(refCanvas.current);
    renderer.current.initialize().then(() => {
      console.log('urzx wasm init success');
    });
  }, []);
  
  const handleInputClick = useCallback(() => {
    refInput.current?.click();
  }, [])

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      renderer.current?.renderImage(URL.createObjectURL(file));
    }
  }, [])

  return <div>
    <h3 className={css({ fontSize: 20, mb: 2.5 })}>emscripten wasm</h3>
    <p className={css({ fontSize: '14', mb: 2.5, color: 'gray.500' })}>emscripten wasm GL renderer in main thread</p>
    <div
      className={css({ position: 'relative', float: 'left', border: '1px solid #ccc', borderRadius: 'md', overflow: 'hidden', cursor: filename ? 'pointer' : 'default' })}
      onClick={handleInputClick}
    >
      <canvas ref={refCanvas} id="canvas" height={960} width={1280} className={css({ width: 400, height: 300 })}></canvas>
      <input ref={refInput} type="file" accept="image/*" className={css({ display: 'none' })} onChange={handleImageChange} />
      <Button className={css({ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: filename ? 'none' : 'block' })}>select image</Button>
    </div>
  </div>;
}