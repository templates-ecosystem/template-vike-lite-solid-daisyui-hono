### ▲ Adapt to Deploy on Vercel
- Create `/api/ssr.js`
  ```ts
  import app from '../dist/server/index.mjs'

  export const GET = app.fetch
  export const POST = app.fetch
  ```

- Create `/vercel.json`
  ```json
  {
    "outputDirectory": "dist/client",
    "installCommand": "yarn install --immutable",
    "rewrites": [
      {
        "source": "/((?!assets/).*)",
        "destination": "/api/ssr.js"
      }
    ]
  }
  ```

### ▲ Config Vercel Website
  - Go to create a [new project](https://vercel.com/new)
  - Search and import the repository
  - In the current **Settings**:
    - **Build and Deployment**
      - `Framework Preset` = `Vite`
      - `Root Directory` = `./`
      - `Build and Output Settings`
        → `Output Directory` = `dist/client`
        → `Install Command` = `yarn install --immutable`
    - **Environments**
      - Set evnironment variables
    - **Functions**
      - `Fluid Compute` = `Enabled`
