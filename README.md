<!--
SPDX-FileCopyrightText: 2026 Thomas Steiner
SPDX-License-Identifier: Apache-2.0
-->

# three.js starter

A minimal [Vite](https://vite.dev/) project for three.js.

```bash
npx tiged tomayac/three-starter three-starter
cd three-starter

npm install
npm run dev
```

Then edit [`src/main.js`](src/main.js), and rename the project in `package.json`.

| Command           | What it does                           |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Starts the dev server with hot reload. |
| `npm run build`   | Builds the site into `dist/`.          |
| `npm run preview` | Serves `dist/` locally.                |

`npm install` picks up the current three.js release. The output in `dist/` is static and uses relative URLs, so it runs on any host and from any path, including GitHub Pages.

## Shared dependencies

Production builds load three.js through [Cross-Origin Storage](https://github.com/WICG/cross-origin-storage) where the browser supports it. Every site built this way ships byte-identical, content-addressed three.js chunks, so a visitor who already has them from another site skips the download. Browsers without it fetch the chunks like any other script.

[`vite.config.js`](vite.config.js) sets this up with [`vite-plugin-cross-origin-storage`](https://www.npmjs.com/package/vite-plugin-cross-origin-storage). Its `COS_PACKAGES` list covers `three` with all its subpaths (`three/addons/*`, `three/webgpu`, and `three/tsl`) and popular libraries from the three.js ecosystem:

- Effects, controls, and helpers: `postprocessing`, `three-mesh-bvh`, `camera-controls`, and `troika-three-text`.
- Debug UI and stats: `lil-gui`, `tweakpane`, and `stats-gl`.
- Animation and physics: `@tweenjs/tween.js`, `cannon-es`, and `@dimforge/rapier3d-compat`.

Install any of them and they're shared as well, resolving their own `import 'three'` to the same chunk. To share another dependency, add its name to the list. Pick packages that are plain JavaScript and bundle without help from Vite plugins.

Shared packages ship whole, without tree-shaking, because identical chunks across sites depend on it. Your own code is tree-shaken as usual.

## License

[Apache 2.0](LICENSE)
