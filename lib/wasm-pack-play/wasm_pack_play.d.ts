/* tslint:disable */
/* eslint-disable */
export function randomPattern(width: number, height: number, delta: number): Uint8Array;
export function get(url: string): Promise<any>;
export function post(url: string, body: string): Promise<any>;
export function getCsrfToken(length: number): string;
export function validate(token: string): string;
export class Mfs {
  free(): void;
  constructor();
  writeFile(path: string, content: Uint8Array): void;
  readFile(path: string): Uint8Array | undefined;
  deleteFile(path: string): boolean;
  exists(path: string): boolean;
  listFiles(): (string)[];
  clear(): void;
  getTotalSize(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_mfs_free: (a: number, b: number) => void;
  readonly mfs_new: () => number;
  readonly mfs_writeFile: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly mfs_readFile: (a: number, b: number, c: number) => [number, number];
  readonly mfs_deleteFile: (a: number, b: number, c: number) => number;
  readonly mfs_exists: (a: number, b: number, c: number) => number;
  readonly mfs_listFiles: (a: number) => [number, number];
  readonly mfs_clear: (a: number) => void;
  readonly mfs_getTotalSize: (a: number) => number;
  readonly randomPattern: (a: number, b: number, c: number) => [number, number];
  readonly get: (a: number, b: number) => any;
  readonly post: (a: number, b: number, c: number, d: number) => any;
  readonly getCsrfToken: (a: number) => [number, number];
  readonly validate: (a: number, b: number) => [number, number];
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_4: WebAssembly.Table;
  readonly __wbindgen_export_5: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly closure81_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure112_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
