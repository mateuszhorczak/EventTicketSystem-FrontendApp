export const useEventTypeStore = defineStore('eventTypeStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const isLoading = ref(false)
  const eventTypes = ref<EventType[]>()
  const singleEventType = ref<EventType>()
  const selectedEventTypeId = ref()

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

  const updateEventType = async (eventType: EventType) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>(`/event-types/${eventType.id}/`, {
      method: 'PUT',
      body: eventType,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Event type updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Event type updated failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const deleteEventType = async (id: number) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>(`/event-types/${id}/`, {
      method: 'DELETE',
    })
      .then((data) => {
        createSuccessToast({
          title: 'Event type deleted successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Event type deletion failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const fetchEventTypes = async () => {
    isLoading.value = true
    const { data } = await $apiFetch<EventTypeListResponse>('/event-types/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Event types fetching error')))
      .finally(() => {
        isLoading.value = false
      })

    if (data !== null) eventTypes.value = data
    return data !== null
  }

  const fetchEventTypeById = async (id: number) => {
    const { data } = await $apiFetch<EventTypeResponse>(`/event-types/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Discount fetching error')))

    if (data !== null) singleEventType.value = data
    return data !== null
  }

  return {
    isLoading,
    eventTypes,
    singleEventType,
    selectedEventTypeId,
    createEventType,
    deleteEventType,
    updateEventType,
    fetchEventTypes,
    fetchEventTypeById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventTypeStore, import.meta.hot))
}
