export const useEventStore = defineStore('eventStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const events = ref<StandardEvent[]>()
  const singleEvent = ref<StandardEvent>()
  const selectedEventId = ref()

  const clearStore = () => {
    events.value = []
    singleEvent.value = null
    selectedEventId.value = null
  }

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const createEvent = async (newEvent: NewEvent) => {
    isLoading.create = true
    const { data } = await $authFetch<SuccessResponse>('/events/', {
      method: 'POST',
      body: newEvent,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Event created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Event creation failed'))
      .finally(() => {
        isLoading.create = false
      })
    return data !== null
  }

  const updateEvent = async (event: StandardEvent) => {
    isLoading.update = true
    const { data } = await $authFetch<SuccessResponse>(`/events/${event.id}/`, {
      method: 'PUT',
      body: event,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Event updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Event updated failed'))
      .finally(() => {
        isLoading.update = false
      })
    return data !== null
  }

  const deleteEvent = async (id: number | string) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/events/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Event deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Event deletion failed'))
      .finally(() => {
        isLoading.delete = false
        selectedEventId.value = null
      })
    return data !== null
  }

  const fetchEvents = async () => {
    isLoading.fetch = true
    const { data } = await $authFetch<EventListResponse>('/events/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Events fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) events.value = data
    return data !== null
  }

  const fetchEventById = async (id: number | string) => {
    isLoading.fetchById = true
    const { data } = await $authFetch<EventResponse>(`/events/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Event fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

    if (data !== null) {
      singleEvent.value = {
        ...data,
        date_start: fixMongoDate(data.date_start),
        date_end: fixMongoDate(data.date_end),
      }
    }
    return data !== null
  }

  return {
    isLoading,
    events,
    singleEvent,
    selectedEventId,
    createEvent,
    deleteEvent,
    updateEvent,
    fetchEvents,
    fetchEventById,
    clearStore,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventStore, import.meta.hot))
}
