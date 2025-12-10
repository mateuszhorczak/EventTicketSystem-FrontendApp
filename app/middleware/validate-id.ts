export default defineNuxtRouteMiddleware((to) => {
  const isValidId
    = 'id' in to.params
      && typeof to.params.id === 'string'
      && /^\d+$/.test(to.params.id)

  if (!isValidId) {
    return abortNavigation()
  }
})
