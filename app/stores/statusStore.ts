export const useStatusStore = defineStore('statusStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const statuses = ref<Status[]>()
  const singleStatus = ref<Status>()
  const selectedStatusId = ref()

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const clearStore = () => {
    statuses.value = []
    singleStatus.value = null
    selectedStatusId.value = null
  }

  const createStatus = async (newStatus: NewStatus) => {
    isLoading.create = true
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
        isLoading.create = false
      })
    return data !== null
  }

  const updateStatus = async (status: Status) => {
    isLoading.update = true
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
        isLoading.update = false
      })
    return data !== null
  }

  const deleteStatus = async (id: number) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/statuses/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Status deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Status deletion failed'))
      .finally(() => {
        isLoading.delete = false
        selectedStatusId.value = null
      })
    return data !== null
  }

  const fetchStatuses = async () => {
    isLoading.fetch = true
    const { data } = await $authFetch<StatusListResponse>('/statuses/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Statuses fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) statuses.value = data
    return data !== null
  }

  const fetchStatusById = async (id: number) => {
    isLoading.fetchById = true
    const { data } = await $authFetch<StatusResponse>(`/statuses/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Statuses fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

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
    clearStore,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStatusStore, import.meta.hot))
}
