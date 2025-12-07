export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const databaseStore = useDatabaseStore()
  const authToken = useAuthToken()

  const authFetch = $fetch.create({
    baseURL: `${config.public.baseUrl}/api/v1/${databaseStore.database}`,
    headers: {
      'Content-Type': 'application/json',
    },
    onRequest({ options }) {
      const token = authToken.token

      const headers = new Headers(options.headers || {})

      headers.set('Content-Type', 'application/json')

      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }

      options.headers = headers
    },
  })

  return {
    provide: {
      authFetch,
    },
  }
})
