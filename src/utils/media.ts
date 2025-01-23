import mediaInfoFactory from 'mediainfo.js'
import type { ReadChunkFunc } from 'mediainfo.js'

const wasmPath = new URL('../../node_modules/mediainfo.js/dist/MediaInfoModule.wasm', import.meta.url).toString();

function makeReadChunk(file: File): ReadChunkFunc {
  return async (chunkSize: number, offset: number) =>
    new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer())
}
export async function readMedia(file: File) {
  const mi = await mediaInfoFactory({ format: 'object', locateFile: () => wasmPath });
  const mediaInfo = await mi.analyzeData(file.size, makeReadChunk(file));
  return mediaInfo;
}

export async function imgToRgba(imageUrl: string) {
  return new Promise<{ data: Uint8ClampedArray, w: number, h: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const { data } = ctx?.getImageData(0, 0, img.width, img.height) || {}; // RGBA
      if (!data) {
        return reject(new Error('Failed to get image data'));
      }
      resolve({ data, w: img.width, h: img.height });
    }
    img.src = imageUrl;
  })
}
