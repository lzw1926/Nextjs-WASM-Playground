# Next.js + WASM

## worker 相对主线程受限的地方

- 不能直接操作 DOM
- 不能使用 Image 对象


## WASM 碰到的问题
- 找不到 GLctx https://emscripten.org/docs/api_reference/html5.h.html?#c.EmscriptenWebGLContextAttributes.renderViaOffscreenBackBuffer
  https://github.com/emscripten-core/emscripten/issues/9217#issuecomment-524246061
- nextjs 编译时对 typeof window 的特殊处理导致 emscripten wasm 的胶水代码在 web worker 中报错
  https://github.com/vercel/next.js/discussions/39605
  https://github.com/vercel/next.js/issues/62256


## References
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
- https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/requestAnimationFrame
- https://rustwasm.github.io/wasm-bindgen/contributing/design/exporting-rust-struct.html
- https://github.com/seanmonstar/reqwest
- https://developer.chrome.com/blog/hotpath-with-wasm?hl=zh-cn
- [emscripten 编译配置](https://emscripten.org/docs/tools_reference/settings_reference.html#proxy-to-worker)
- [emscripten html API](https://emscripten.org/docs/api_reference/html5.h.html)
- [emscripten embind](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/embind.html#built-in-type-conversions)
- https://github.com/mpadge/wasm-next
- https://stackoverflow.com/questions/76775327/create-htmlimageelement-in-web-worker
- https://www.nalgebra.org/docs/user_guide/wasm_and_embedded_targets