// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Option A (recommended) — automatically infer repo name inside Actions
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
export default defineConfig({
  base: repo ? `/${repo}/` : '/', // on Actions this will become "/React-E-commerce-Dashboard/"
  plugins: [react()],
})
