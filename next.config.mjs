// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  reactStrictMode: false,
  // assetPrefix: 'https://pages.int.pixocial.com/worker-render',
  basePath: '/worker-render',
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['page.tsx', 'page.ts'],
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)?',
  //       locale: false,
  //       headers: [
  //         {
  //           key: 'Cross-Origin-Embedder-Policy',
  //           value: 'require-corp',
  //         },
  //         {
  //           key: 'Cross-Origin-Opener-Policy',
  //           value: 'same-origin',
  //         },
  //       ],
  //     },
  //   ];
  // },
  webpack: (config, { isServer, dev }) => {
    // config.output.webassemblyModuleFilename =
    //   isServer && !dev
    //     ? "../static/wasm/[modulehash].wasm"
    //     : "static/wasm/[modulehash].wasm";
    // config.experiments = { ...config.experiments, asyncWebAssembly: true, syncWebAssembly: true, };
    // config.infrastructureLogging = { debug: /PackFileCache/ }
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   'wasm-pack-play': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'node_modules/wasm-pack-play'),
    // };
    return config;
  },
};

export default nextConfig;
