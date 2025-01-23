import EventEmitter from "eventemitter3";

type RenderEvent = 'render' | 'init' | 'destroy' | 'fs_size_change';
export class Renderer extends EventEmitter<RenderEvent> {
  
  readonly ctx: ImageBitmapRenderingContext;
  readonly worker: Worker;
  private _init = false;

  constructor(private canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    const ctx = this.canvas.getContext('bitmaprenderer');
    if (!ctx) throw new Error('Failed to get bitmaprenderer context');
    this.ctx = ctx;
    this.worker = new Worker(
      /* webpackChunkName: "rs-worker" */ new URL('./worker.ts', import.meta.url)
    );
  }

  async init() {
    this._initEvents();
    return new Promise((resolve, reject) => {
      this.worker.addEventListener('message', (e) => {
        if (e.data.type === 'init' && e.data.data.status === 'ready') {
          resolve(e.data);
          this._init = true;
        } else {
          reject(new Error('Failed to init'));
        }
      }, { once: true });
      this.worker.postMessage({
        type: 'init',
      });
    })
  }

  private async _initEvents() {
    console.log('====== init render events ======');
    // this.worker.addEventListener('message', (e) => {
      
    // });
    this.worker.onmessage = (e) => {
      switch (e.data.type) {
        case 'render':
          if (this._init) {
            this.ctx.transferFromImageBitmap(e.data.data);
            this.emit('render');
          }
          break;
        case 'fs_size_change':
          console.log('fs_size_change', e.data);
          this.emit('fs_size_change', e.data);
          break;
        default:
          break;
      }
    }
  }

  public writeFile(path: string,data: File) {
    this.worker.postMessage({
      type: 'writeFile',
      path,
      data,
    });
  }

  public readFile(path: string) {
    this.worker.postMessage({
      type: 'readFile',
      path,
    });
  }

  private _workerHandle<T extends string, R>(name: T, data?: R) {
    return new Promise((resolve, reject) => {
      this.worker.addEventListener('message', (e) => {
        console.log(e.data);
        if (e.data.type === name) {
          if (e.data.status === 'ready') {
            resolve(e.data);
          } else {
            reject(new Error('Failed to get total size'));
          }
        }
      }, { once: true });
      this.worker.postMessage({
        type: name,
        data,
      });
    })
  }

  destroy() {
    this.worker.postMessage({
      type: 'destroy',
    });
    this.worker.terminate();
  }
}