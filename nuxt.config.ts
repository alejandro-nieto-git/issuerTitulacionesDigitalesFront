// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: 'light'
  },

  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-icon'],

  ui: {
    icons: ['fa6-regular', 'ph', 'pajamas']
  },

  compatibilityDate: '2024-09-14'
})