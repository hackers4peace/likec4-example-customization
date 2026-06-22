import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { LikeC4VitePlugin } from 'likec4/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Cast: likec4's plugin is typed against vite 8 while this project pins
    // vite 7. Runtime is compatible; this only reconciles the type signatures.
    LikeC4VitePlugin({
      workspace: './likec4'
    }) as unknown as PluginOption,
    react()
  ]
})
