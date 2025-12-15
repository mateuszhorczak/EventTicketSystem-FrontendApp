export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const databaseStore = useDatabaseStore()
  const authToken = useAuthToken()

  const apiFetch = <T>(path: string, options?: any) => {
    const baseURL = `${config.public.baseUrl}/api/v1/${databaseStore.database}`
    return $fetch<T>(path, {
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })
  }

  const authFetch = <T>(path: string, options?: any) => {
    const baseURL = `${config.public.baseUrl}/api/v1/${databaseStore.database}`
    return $fetch<T>(path, {
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
      ...options,
    })
  }

  return {
    provide: {
      apiFetch,
      authFetch,
    },
  }
})
