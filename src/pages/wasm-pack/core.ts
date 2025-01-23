import * as wasm from 'wasm-pack-play';
import { type Mfs } from 'wasm-pack-play';

export class Core {
  readonly wasm = wasm;
  // readonly WASM_URL = new URL('wasm-pack-play/wasm_pack_play_bg.wasm', import.meta.url);
  readonly canvas: OffscreenCanvas;
  readonly ctx: OffscreenCanvasRenderingContext2D;
  
  protected fs: Mfs | undefined;

  constructor() {
    this.canvas = new OffscreenCanvas(1, 1);
    this.ctx = this.canvas.getContext('2d')!;
    // this._timer = undefined;
  }

  async init() {
    await this.loadWasm();
    // TODO: http request by wasm
    // this._get('http://localhost:3000/api/hello').then((res) => {
    //   console.log('response', res);
    // }).catch(err => {
    //   console.log('wrong');
    //   console.info(err);
    // });
    const { Mfs } = this.wasm;
    this.fs = new Mfs();
  }

  private async loadWasm() {
    // fetch(this.WASM_URL).then(res => res.arrayBuffer()).then(bytes => {
    //   wasm.initSync({ module: bytes })
    // });
    return wasm.default();
  }

  public async writeFile(path: string, data: File) {
    const buf = await data.arrayBuffer();
    const uint8Array = new Uint8Array(buf);
    return this.fs?.writeFile(path, uint8Array);
  }

  public async readFile(path: string) {
    return this.fs?.readFile(path);
  }

  public getTotalSize() {
    return this.fs?.getTotalSize();
  }

  public async _get(path: string) {
    return this.wasm.get(path);
  }
}
