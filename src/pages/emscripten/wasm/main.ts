import { imgToRgba } from "@/utils/media";

export class MainThread {
  private worker: Worker;
  private _canvas: HTMLCanvasElement;

  private _ctx: ImageBitmapRenderingContext;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._ctx = this._canvas.getContext('bitmaprenderer') as ImageBitmapRenderingContext;
    this.worker = new Worker(
       /* webpackChunkName: "emscripten-wasm-worker" */ new URL('./worker.ts', import.meta.url)
    );

  }

  async init(w: number, h: number) {
    return new Promise<void>((resolve, reject) => {
      this.worker.addEventListener('message', (e) => {
        this._initEvents();
        if (e.data.type === 'init' && e.data.status === 'success') {
          resolve();
        } else {
          reject(new Error('Failed to init'));
        }
      }, { once: true });
      this.worker.postMessage({ type: 'init', w, h });
    });
    
  }

  private _initEvents() {
    this.worker.onmessage = async e => {
      const { type, ...data } = e.data;
      switch (type) {
        case 'render':
          this._ctx.transferFromImageBitmap(data.bitmap);
          break;
      }
    }
  }

  async renderImage(imageUrl: string) {
    const { data, w, h } = await imgToRgba(imageUrl);
    this.worker.postMessage({ type: 'render', imageData: data, w, h });
  }
}