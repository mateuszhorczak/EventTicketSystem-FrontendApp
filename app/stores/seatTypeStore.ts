export const useSeatTypeStore = defineStore('seatTypeStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const isLoading = ref(false)
  const seatTypes = ref<SeatType[]>()
  const singleSeatType = ref<SeatType>()
  const selectedSeatTypeId = ref()

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

  const updateSeatType = async (seatType: SeatType) => {
    isLoading.value = true
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
        isLoading.value = false
      })
    return data !== null
  }

  const deleteSeatType = async (id: number) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>(`/seat-types/${id}/`, {
      method: 'DELETE',
    })
      .then((data) => {
        createSuccessToast({
          title: 'Seat type deleted successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Seat type deletion failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const fetchSeatTypes = async () => {
    isLoading.value = true
    const { data } = await $apiFetch<SeatTypeListResponse>('/seat-types/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Seat types fetching error')))
      .finally(() => {
        isLoading.value = false
      })

    if (data !== null) seatTypes.value = data
    return data !== null
  }

  const fetchSeatTypeById = async (id: number) => {
    const { data } = await $apiFetch<SeatTypeResponse>(`/seat-types/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Seat type fetching error')))

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
