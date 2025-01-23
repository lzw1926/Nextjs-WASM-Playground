type Locale = 'en' | 'id' | 'ko' | 'ja'

declare function $t(id: string, values?: Record<any, any>): string;

declare class ImageRenderer {
  initGL(id: string, width: number, height: number): void;
  loadAndRender(imageData: Uint8ClampedArray, w: number, h: number): void;
}
