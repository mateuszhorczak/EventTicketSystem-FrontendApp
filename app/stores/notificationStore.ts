export const useNotificationStore = defineStore('notificationStore', () => {
  const { $authFetch } = useNuxtApp()
  const notifications = ref<NotificationType[]>()
  const singleNotifications = ref<NotificationType>()
  const selectedNotificationId = ref()

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const createNotification = async (newNotification: NewNotification, message_id: number) => {
    isLoading.create = true
    const { data } = await $authFetch<SuccessResponse>('/notifications/', {
      method: 'POST',
      body: { ...newNotification, message_id },
    })
      .then((data) => {
        createSuccessToast({
          title: 'Notification created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Notification creation failed'))
      .finally(() => {
        isLoading.create = false
      })
    return data !== null
  }

  const readNotification = async (id: number) => {
    isLoading.update = true
    const { data } = await $authFetch<SuccessResponse>(`/notifications/${id}/`, {
      method: 'PATCH',
    })
      .then((data) => {
        createSuccessToast({
          title: 'Notification set as read',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Error during set notification as read'))
      .finally(() => {
        isLoading.update = false
      })
    return data !== null
  }

  const deleteNotification = async (id: number) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/notifications/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Notification deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Notification deletion failed'))
      .finally(() => {
        isLoading.delete = false
        selectedNotificationId.value = null
      })
    return data !== null
  }

  const fetchNotifications = async () => {
    isLoading.fetch = true
    const { data } = await $authFetch<NotificationListResponse>('/notifications/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Notifications fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) notifications.value = data
    return data !== null
  }

  const fetchNotificationsById = async (id: number) => {
    isLoading.fetchById = true
    const { data } = await $authFetch<NotificationResponse>(`/notifications/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Notifications fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

    if (data !== null) singleNotifications.value = data
    return data !== null
  }

  return {
    isLoading,
    notifications,
    singleNotifications,
    selectedNotificationId,
    createNotification,
    deleteNotification,
    readNotification,
    fetchNotifications,
    fetchNotificationsById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot))
}
