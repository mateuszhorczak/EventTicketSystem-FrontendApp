import { createPinia } from 'pinia'

export default defineNuxtRouteMiddleware((to) => {
  const pinia = createPinia()
  const authToken = useAuthToken(pinia)

  const isLoggedIn = authToken.isLoggedIn
  const toLoginPage = to.path === '/login'
  const toRegisterPage = to.path === '/register'
  const toLogoutPage = to.path === '/logout'

  if (
    !isLoggedIn
    && !toLoginPage
    && !toRegisterPage
  ) {
    return navigateTo('/login')
  }

  if (
    isLoggedIn
    && (toLoginPage || toRegisterPage)
  ) {
    return navigateTo('/')
  }

  if (!isLoggedIn && toLogoutPage) return abortNavigation()
})
