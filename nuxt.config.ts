// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      baseUrl: '',
    },
  },
  experimental: {
    cookieStore: true,
    typedPages: true,
  },
  compatibilityDate: '2025-07-15',
  telemetry: { enabled: false },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
