export const useSeatTypeStore = defineStore('seatTypeStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const seatTypes = ref<SeatType[]>()
  const singleSeatType = ref<SeatType>()
  const selectedSeatTypeId = ref()

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const createSeatType = async (newSeatType: NewSeatType) => {
    isLoading.create = true
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
        isLoading.create = false
      })
    return data !== null
  }

  const updateSeatType = async (seatType: SeatType) => {
    isLoading.update = true
    const { data } = await $authFetch<SuccessResponse>(`/seat-types/${seatType.id}/`, {
      method: 'PUT',
      body: seatType,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Seat type updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Seat type updated failed'))
      .finally(() => {
        isLoading.update = false
      })
    return data !== null
  }

  const deleteSeatType = async (id: number) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/seat-types/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Seat type deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Seat type deletion failed'))
      .finally(() => {
        isLoading.delete = false
        selectedSeatTypeId.value = null
      })
    return data !== null
  }

  const fetchSeatTypes = async () => {
    isLoading.fetch = true
    const { data } = await $apiFetch<SeatTypeListResponse>('/seat-types/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Seat types fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) seatTypes.value = data
    return data !== null
  }

  const fetchSeatTypeById = async (id: number) => {
    isLoading.fetchById = true
    const { data } = await $apiFetch<SeatTypeResponse>(`/seat-types/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Seat type fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

    if (data !== null) singleSeatType.value = data
    return data !== null
  }

  return {
    isLoading,
    seatTypes,
    singleSeatType,
    selectedSeatTypeId,
    createSeatType,
    deleteSeatType,
    updateSeatType,
    fetchSeatTypes,
    fetchSeatTypeById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSeatTypeStore, import.meta.hot))
}
