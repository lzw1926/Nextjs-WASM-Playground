import { imgToRgba } from '@/utils/media';
import initializeWasm from './urzx';

// declare global {
//   interface Window {
//     Module: {
//       ImageRenderer: typeof ImageRenderer;
//     };
//   }
// }

export class WebGLRenderer {
  private module: any;
  private renderer: ImageRenderer;
  private canvas: HTMLCanvasElement;

  private _canvas: OffscreenCanvas;
  private _ctx: ImageBitmapRenderingContext;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    const { width, height } = canvas;
    // this._canvas = new OffscreenCanvas(width, height);
    // this._ctx = this.canvas.getContext('bitmaprenderer') as ImageBitmapRenderingContext;
  }

  async initialize() {
    // 加载WASM模块
    return new Promise<void>((resolve, reject) => {
      /* initialize wasm manually */
      // const script = document.createElement('script');
      // script.src = '/urzx.js';
      // script.onload = () => {
      //   console.log('wasm loaded');
      //   console.log(window.Module.ImageRenderer);
      //   const { ImageRenderer } = window.Module;
      //   this.renderer = new ImageRenderer();
      //   this.renderer.initGL(
      //     this.canvas.width,
      //     this.canvas.height
      //   );
      //   resolve(this.renderer);
      // }
      // document.body.appendChild(script);
      // resolve();
      initializeWasm({
        // canvas: this.canvas,
        print: console.log,
        printErr: console.error,
      }).then((mod) => {
        console.log(mod);
        this.renderer = new mod.ImageRenderer();
        this.renderer.initGL(
          this.canvas.id,
          this.canvas.width,
          this.canvas.height,
        );
        resolve();
      });
    })
  }

  async renderImage(imageUrl: string) {
    const { data, w, h } = await imgToRgba(imageUrl);
    this.renderer.loadAndRender(data, w, h);

    // this._ctx.transferFromImageBitmap(this._canvas.transferToImageBitmap());
  }
}
