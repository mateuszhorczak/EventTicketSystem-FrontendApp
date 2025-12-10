export const useAuthToken = defineStore('authToken', () => {
  const token = useCookie<string | null>('auth:token', {
    default: () => null,
    watch: true,
  })
  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const clearToken = () => {
    token.value = null
  }

  const isLoggedIn = computed(() => !!token.value)

  return {
    token: readonly(token),
    isLoggedIn,
    setToken,
    clearToken,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthToken, import.meta.hot))
}
