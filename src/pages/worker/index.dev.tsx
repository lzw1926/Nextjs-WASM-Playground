import { useEffect, useRef, useCallback } from "react";

export default function Index() {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL("../wasm-pack/worker.ts", import.meta.url));
    workerRef.current.onmessage = (event: MessageEvent<number>) => {
      console.log('WebWorker Response =>', event.data);
    }
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage(100000);
  }, []);

  return (
    <>
      <p>Do work in a WebWorker!</p>
      <button onClick={handleWork}>Calculate PI</button>
    </>
  );
}
