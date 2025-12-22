export const useAuth = defineStore('auth', () => {
  const { $apiFetch } = useNuxtApp()
  const authToken = useAuthToken()
  const isLoading = ref(false)
  const user = useCookie<User | null>('auth:user', {
    default: () => null,
    watch: true,
  })

  const login = async (email: string, password: string) => {
    isLoading.value = true
    const { data } = await $apiFetch<{ token: string, user: User }>(`/auth/login/`, {
      method: 'POST',
      body: {
        email,
        password,
      },
    })
      .then((data) => {
        authToken.setToken(data.token)
        user.value = data.user
        createSuccessToast({
          title: 'Logged in successfully',
        })
        return { data }
      })
      .catch(error => handleApiError(error, 'Login failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const register = async (user: NewUser) => {
    isLoading.value = true
    const { data } = await $apiFetch<SuccessResponse>(`/auth/register/`, {
      method: 'POST',
      body: user,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Account created successfully',
          description: 'You can now log in',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Registration failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const clearAllStores = () => {
    useDiscountStore().clearStore()
    useEventStore().clearStore()
    useEventTypeStore().clearStore()
    useMessageStore().clearStore()
    useNotificationStore().clearStore()
    useOrderStore().clearStore()
    useStatusStore().clearStore()
    useTicketStore().clearStore()
    useTicketTypeStore().clearStore()
  }

  const logout = async () => {
    authToken.clearToken()
    user.value = null

    clearAllStores()

    createSuccessToast({
      title: 'Logged out successfully',
    })
    await useRouter().push('/login')
  }

  return {
    isLoading,
    user: computed(() => {
      if (!authToken.token) return null
      return user.value
    }),
    login,
    register,
    logout,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
