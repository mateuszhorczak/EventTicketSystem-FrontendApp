export const useStatusStore = defineStore('statusStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const isLoading = ref(false)
  const statuses = ref<Status[]>()
  const singleStatus = ref<Status>()
  const selectedStatusId = ref()

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

  const updateStatus = async (status: Status) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>(`/statuses/${status.id}/`, {
      method: 'PUT',
      body: status,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Status updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Status updated failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const deleteStatus = async (id: number) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>(`/statuses/${id}/`, {
      method: 'DELETE',
    })
      .then((data) => {
        createSuccessToast({
          title: 'Status deleted successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Status deletion failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const fetchStatuses = async () => {
    isLoading.value = true
    const { data } = await $apiFetch<StatusListResponse>('/statuses/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Statuses fetching error')))
      .finally(() => {
        isLoading.value = false
      })

    if (data !== null) statuses.value = data
    return data !== null
  }

  const fetchStatusById = async (id: number) => {
    const { data } = await $apiFetch<StatusResponse>(`/statuses/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Statuses fetching error')))

    if (data !== null) singleStatus.value = data
    return data !== null
  }

  return {
    isLoading,
    statuses,
    singleStatus,
    selectedStatusId,
    createStatus,
    deleteStatus,
    updateStatus,
    fetchStatuses,
    fetchStatusById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStatusStore, import.meta.hot))
}
