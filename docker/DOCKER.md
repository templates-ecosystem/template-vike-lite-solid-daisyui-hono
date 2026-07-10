## Setup
1. Create `serverEntryDocker.mjs` in `docker` folder:
```mjs
import startServer from '../scripts/startServerBase.mjs'
import vikeApp from '../src/server/index.mjs'

startServer(vikeApp, true)

export default {}
```

2. In your `vite.config` change:
```diff
import type { UserConfig } from 'vite'
import vikeLite from 'vike-lite/vite'

export default {
  plugins: [
-    vikeLite()
+    vikeLite({
+      ...(process.env.IS_DOCKER === 'true' && { serverEntry: '../docker/serverEntryDocker' })
+    })
  ]
} satisfies UserConfig
```

3. Install `@hono/node-server` as dev (?) dependency:

`yarn add -D @hono/node-server`

4. In the `package.json` add these scripts:
```diff
{
  "scripts: {
+    "build:docker": "yarn build:client && yarn build:server:docker",
+    "build:server:docker": "IS_DOCKER=true vite build --ssr",
  }
}
```

>💡 Tip: After the `build:docker` script you can preview the build with the `prod` script.

## Docker Build
### Build Docker Image

```sh
docker build -t=template-vike-lite-solid-daisyui-hono -f docker/Dockerfile .
```

## Docker Compose
### Start Docker Compose: template-vike-lite-solid-daisyui-hono
```sh
cd docker && docker compose up
OR
docker compose -f docker/docker-compose.yml up
```

## Settings
### Set the Port of template-vike-lite-solid-daisyui-hono App and EXPOSE in Dockerfile
At the build of Dockefile, change the **port** (default is _3000_):
```sh
docker build -t=template-vike-lite-solid-daisyui-hono -f docker/Dockerfile --build-arg PORT=8081 .
```
