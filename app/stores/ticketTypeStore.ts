export const useTicketTypeStore = defineStore('ticketTypeStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const isLoading = ref(false)
  const ticketTypes = ref<TicketType[]>()
  const singleTicketType = ref<TicketType>()
  const selectedTicketTypeId = ref()

  const createTicketType = async (newTicketType: NewTicketType) => {
    isLoading.value = true
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
        isLoading.value = false
      })
    return data !== null
  }

  const updateTicketType = async (ticketType: TicketType) => {
    isLoading.value = true
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
        isLoading.value = false
      })
    return data !== null
  }

  const deleteTicketType = async (id: number) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>(`/ticket-types/${id}/`, {
      method: 'DELETE',
    })
      .then((data) => {
        createSuccessToast({
          title: 'Ticket type deleted successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Ticket type deletion failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const fetchTicketTypes = async () => {
    isLoading.value = true
    const { data } = await $apiFetch<TicketTypeListResponse>('/ticket-types/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Ticket types fetching error')))
      .finally(() => {
        isLoading.value = false
      })

    if (data !== null) ticketTypes.value = data
    return data !== null
  }

  const fetchTicketTypeById = async (id: number) => {
    const { data } = await $apiFetch<TicketTypeResponse>(`/ticket-types/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Ticket type fetching error')))

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
