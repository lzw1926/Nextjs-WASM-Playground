import initializeWasm from './urzx';

interface WASM {
  ImageRenderer: typeof ImageRenderer;
}

let renderer: WebGLRenderer;

export class WebGLRenderer {
  
  protected static mod: WASM;
  protected static renderer: ImageRenderer;
  protected static instance: WebGLRenderer;

  private _canvas: OffscreenCanvas;

  constructor(w: number, h: number) {
    this._canvas = new OffscreenCanvas(w, h);
  }

  static async initialize(w: number, h: number) {
    if (this.mod) {
      return this.instance;
    }
    this.instance = new WebGLRenderer(w, h);
    this.mod = await initializeWasm({
      canvas: this.instance._canvas,
      print: console.log,
      printErr: console.error,
    });
    const { ImageRenderer } = this.mod;
    this.renderer = new ImageRenderer();
    WebGLRenderer.renderer.initGL(
      '',
      this.instance._canvas.width,
      this.instance._canvas.height,
    );
    return this.instance;
  }

  renderImage(imageData: Uint8ClampedArray, w: number, h: number) {
    WebGLRenderer.renderer.loadAndRender(imageData, w, h);
  }

  getImgBitmap() {
    return this._canvas.transferToImageBitmap();
  }

}

const isWorker = typeof WorkerGlobalScope != 'undefined';

if (isWorker) {
  self.onmessage = async (e) => {
    const { type, ...data } = e.data;
    switch (type) {
      case 'init':
        renderer = await WebGLRenderer.initialize(data.w, data.h);
        self.postMessage({ type: 'init', status: 'success' });
        break;
      case 'render':
        renderer.renderImage(data.imageData, data.w, data.h);
        const bitmap = renderer.getImgBitmap();
        self.postMessage({ type: 'render', bitmap }, { transfer: [bitmap] });
        break;
    }
  }
}