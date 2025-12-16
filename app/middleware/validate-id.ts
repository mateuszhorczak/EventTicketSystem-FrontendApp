export default defineNuxtRouteMiddleware((to) => {
  if (!('id' in to.params)) return abortNavigation()
  if (typeof to.params.id !== 'string') return abortNavigation()

  const id = to.params.id
  const isNumeric = /^\d+$/.test(id)
  const isMongoId = /^[0-9a-fA-F]{24}$/.test(id)

  if (!isNumeric && !isMongoId) {
    return abortNavigation('Invalid ID')
  }
})
