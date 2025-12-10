export const useTicketTypeStore = defineStore('ticketTypeStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const ticketTypes = ref<TicketType[]>()
  const singleTicketType = ref<TicketType>()
  const selectedTicketTypeId = ref()

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const createTicketType = async (newTicketType: NewTicketType) => {
    isLoading.create = true
    const { data } = await $authFetch<SuccessResponse>('/ticket-types/', {
      method: 'POST',
      body: newTicketType,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Ticket type created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Ticket type creation failed'))
      .finally(() => {
        isLoading.create = false
      })
    return data !== null
  }

  const updateTicketType = async (ticketType: TicketType) => {
    isLoading.update = true
    const { data } = await $authFetch<SuccessResponse>(`/ticket-types/${ticketType.id}/`, {
      method: 'PUT',
      body: ticketType,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Ticket type updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Ticket type updated failed'))
      .finally(() => {
        isLoading.update = false
      })
    return data !== null
  }

  const deleteTicketType = async (id: number) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/ticket-types/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Ticket type deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Ticket type deletion failed'))
      .finally(() => {
        isLoading.delete = false
        selectedTicketTypeId.value = null
      })
    return data !== null
  }

  const fetchTicketTypes = async () => {
    isLoading.fetch = true
    const { data } = await $apiFetch<TicketTypeListResponse>('/ticket-types/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Ticket types fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) ticketTypes.value = data
    return data !== null
  }

  const fetchTicketTypeById = async (id: number) => {
    isLoading.fetchById = true
    const { data } = await $apiFetch<TicketTypeResponse>(`/ticket-types/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Ticket type fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

    if (data !== null) singleTicketType.value = data
    return data !== null
  }

  return {
    isLoading,
    ticketTypes,
    singleTicketType,
    selectedTicketTypeId,
    createTicketType,
    deleteTicketType,
    updateTicketType,
    fetchTicketTypes,
    fetchTicketTypeById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTicketTypeStore, import.meta.hot))
}
