import { Core } from './core';

class WorkerRenderer extends Core {
  private _timer: ReturnType<typeof setTimeout> | undefined;
  private _isPaused = false;
  private _tick = 0;
  private _lastRenderTime = 0;
  
  constructor() {
    super();
  }

  async startRender(cb: (self: WorkerRenderer) => void) {
    this._lastRenderTime = this._lastRenderTime || performance.now();
    requestAnimationFrame(() => {
      this.startRender(cb);
      const now = performance.now();
      const delta = now - this._lastRenderTime;
      if (delta > 18) {
        this._lastRenderTime = now;
        console.log('skip', Math.floor(delta));
        // 跳过或做降级处理
        return;
      }
      if (this._isPaused) return;
      const w = 400;
      const h = 300;
      this._tick += 1;
      const data = this.wasm.randomPattern(w, h, this._tick);
      // console.log(data);
      this.canvas.width = 400;
      this.canvas.height = 300;
      const imageData = new ImageData(
        new Uint8ClampedArray(data),
        w,
        h,
      );
      this.ctx.putImageData(imageData, 0, 0);
      cb(this);
      this._lastRenderTime = now;
    })
  }

  async getBitmap() {
    return this.canvas.transferToImageBitmap();
  }

  async pause() {
    this._isPaused = true;
  }

  async resume() {
    this._isPaused = false;
  }

  async getImageBitmap() {
    return this.canvas.transferToImageBitmap();
  }
}

const isWorker = typeof WorkerGlobalScope != 'undefined';
if (isWorker) {
  
  const render = new WorkerRenderer();
  self.onmessage = function handleMessage(e) {
    if (e.data?.type === 'init') {
      render.init()
        .then(() => {
          self.postMessage({
            type: 'init',
            data: {
              status: 'ready'
            },
          });
          setTimeout(() => {
            render.startRender(render => {
              render.getBitmap().then(bitmap => {
                self.postMessage({
                  type: 'render',
                  data: bitmap,
                }, {
                  transfer: [bitmap]
                });
              });
            });
          }, 50);
        })
    }
    if (e.data?.type === 'writeFile') {
      render.writeFile(e.data.path, e.data.data);
      console.log('writeFile', e.data.path, e.data.data);
      self.postMessage({
        type: 'fs_size_change',
        data: render.getTotalSize(),
      })
    }
  }
}