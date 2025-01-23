import { Button } from "@/components/button";
import { css } from "@/styles/css";
import { ChangeEvent, MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { type Renderer } from "../main";

interface FileViewerProps {
  renderer: MutableRefObject<Renderer | undefined>
}

export const FileViewer = (props: FileViewerProps) => {
  const { renderer } = props;
  const [fileName, setFileName] = useState<string>();
  const [totalSize, setTotalSize] = useState<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {

      setFileName(file.name);
      renderer.current?.writeFile(file.name, file);
      e.target.value = '';
    }
  }, []);

  const handleSelectFile = useCallback(() => {
    inputRef.current?.click();
  }, []);

  useEffect(() => {
    renderer.current?.on('fs_size_change', (size) => {
      setTotalSize(size);
    });
  }, [renderer]);

  return <div className={css({ position: 'relative', border: 'darkgray', p: 2.5, borderRadius: 'md', display: 'flex',
    gap: 2.5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderStyle: 'solid', w: '600px', minHeight: 200 })}>
    <input type="file" ref={inputRef} className={css({ display: 'none' })} onChange={handleFileChange} />
    <span className={css({ fontSize: '1.5rem', color: 'gray', display: !!totalSize ? 'block' : 'none', position: 'absolute', right: '1', top: '1' })}>{totalSize}</span>
    <Button onClick={handleSelectFile}>
      {fileName || 'Select File'}
    </Button>
  </div>
}