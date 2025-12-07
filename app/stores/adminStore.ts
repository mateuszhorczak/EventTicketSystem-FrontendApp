export const useAdminStore = defineStore('adminStore', () => {
  const { $authFetch } = useNuxtApp()
  const isLoading = ref(false)

  const createDiscount = async (newDiscount: NewDiscount) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>('/discounts/', {
      method: 'POST',
      body: newDiscount,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Discount created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Discount creation failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const createEventType = async (newEventType: NewEventType) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>('/event-types/', {
      method: 'POST',
      body: newEventType,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Event type created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Event type creation failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const createSeatType = async (newSeatType: NewSeatType) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>('/seat-types/', {
      method: 'POST',
      body: newSeatType,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Seat type created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Seat type creation failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

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

  const createStatus = async (newStatus: NewStatus) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>('/statuses/', {
      method: 'POST',
      body: newStatus,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Status created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Status creation failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  return {
    isLoading,
    createDiscount,
    createEventType,
    createSeatType,
    createTicketType,
    createStatus,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
