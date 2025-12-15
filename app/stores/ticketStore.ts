export const useTicketStore = defineStore('ticketStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const tickets = ref<Ticket[]>()
  const singleTicket = ref<Ticket>()
  const selectedTicketId = ref()

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const createTicket = async (newTicket: NewTicket) => {
    isLoading.create = true
    const { data } = await $authFetch<SuccessResponse>('/tickets/', {
      method: 'POST',
      body: newTicket,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Ticket created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Ticket creation failed'))
      .finally(() => {
        isLoading.create = false
      })
    return data !== null
  }

  const updateTicket = async (ticket: Ticket) => {
    isLoading.update = true
    const { data } = await $authFetch<SuccessResponse>(`/tickets/${ticket.id}/`, {
      method: 'PUT',
      body: ticket,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Ticket updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Ticket updated failed'))
      .finally(() => {
        isLoading.update = false
      })
    return data !== null
  }

  const deleteTicket = async (id: number) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/tickets/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Ticket deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Ticket deletion failed'))
      .finally(() => {
        isLoading.delete = false
        singleTicket.value = null
      })
    return data !== null
  }

  const fetchTickets = async () => {
    isLoading.fetch = true
    const { data } = await $authFetch<TicketListResponse>('/tickets/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Ticket fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) tickets.value = data
    return data !== null
  }

  const fetchTicketById = async (id: number) => {
    isLoading.fetchById = true
    const { data } = await $authFetch<TicketResponse>(`/tickets/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Ticket fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

    if (data !== null) singleTicket.value = data
    return data !== null
  }

  return {
    isLoading,
    tickets,
    singleTicket,
    selectedTicketId,
    createTicket,
    deleteTicket,
    updateTicket,
    fetchTickets,
    fetchTicketById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTicketStore, import.meta.hot))
}
