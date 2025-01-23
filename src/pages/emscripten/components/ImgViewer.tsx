import { Button } from "@/components/button";
import { css } from "@/styles/css";
import { ChangeEvent, forwardRef, useCallback, useRef, useState } from "react";

interface ImgViewerProps {
  width: number;
  height: number;
  onImageChange: (file: File) => void;
}
export const ImgViewer = forwardRef<HTMLCanvasElement, ImgViewerProps>(({ width, height, onImageChange }, ref) => {
  const refInput = useRef<HTMLInputElement>(null);
  const [filename, setFileName] = useState<string>();
  
  const handleInputClick = useCallback(() => {
    refInput.current?.click();
  }, [])

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onImageChange(file);
    }
  }, [])
  return <div
    className={css({ position: 'relative', float: 'left', border: '1px solid #ccc', borderRadius: 'md', overflow: 'hidden', cursor: filename ? 'pointer' : 'default' })}
    onClick={handleInputClick}
  >
    <canvas ref={ref} id="canvas" height={width} width={height} className={css({ width: 400, height: 300 })}></canvas>
    <input ref={refInput} type="file" accept="image/*" className={css({ display: 'none' })} onChange={handleImageChange} />
    <Button className={css({ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: filename ? 'none' : 'block' })}>select image</Button>
  </div>
})