// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: 'light'
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  }

  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-icon'],

  ui: {
    icons: ['fa6-regular', 'ph', 'pajamas']
  },

  compatibilityDate: '2024-09-14'
})