export default defineNuxtRouteMiddleware((to) => {
  if (!('id' in to.params)) return abortNavigation()
  if (typeof to.params.id !== 'string') return abortNavigation()

  const id = to.params.id
  const isNumeric = /^\d+$/.test(id)
  const isMongoId = /^[0-9a-fA-F]{24}$/.test(id)
  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)

  if (!isNumeric && !isMongoId && !isUuid) {
    return abortNavigation('Invalid ID')
  }
})
