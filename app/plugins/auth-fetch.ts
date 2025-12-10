export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const databaseStore = useDatabaseStore()
  const authToken = useAuthToken()

  const baseURL = `${config.public.baseUrl}/api/v1/${databaseStore.database}`

  const apiFetch = $fetch.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const authFetch = $fetch.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    onRequest({ options }) {
      const token = authToken.token
      if (!token) return

      const headers = new Headers(options.headers || {})
      headers.set('Authorization', `Token ${token}`)
      options.headers = headers
    },
  })

  return {
    provide: {
      apiFetch,
      authFetch,
    },
  }
})
