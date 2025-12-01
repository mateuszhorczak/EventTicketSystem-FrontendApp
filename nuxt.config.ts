// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  telemetry: { enabled: false },

  runtimeConfig: {
    public: {
      baseUrl: '',
    },
  },

  css: ['~/assets/css/main.css'],
  experimental: {
    cookieStore: true,
    typedPages: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
  ]
})
