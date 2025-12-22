import { createPinia } from 'pinia'

export default defineNuxtRouteMiddleware((to) => {
  const pinia = createPinia()
  const auth = useAuth(pinia)

  const isAdmin = auth.user?.is_staff
  const toAdminPanel = to.path.startsWith('/admin')

  if (!isAdmin && toAdminPanel) return navigateTo('/')
})
