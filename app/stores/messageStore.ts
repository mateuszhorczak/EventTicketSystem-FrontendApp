export const useMessageStore = defineStore('messageStore', () => {
  const { $authFetch } = useNuxtApp()
  const messages = ref<Message[]>()
  const allMessages = ref<Message[]>()
  const singleMessage = ref<Message>()
  const selectedMessageId = ref()

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const clearStore = () => {
    messages.value = []
    allMessages.value = []
    singleMessage.value = null
    selectedMessageId.value = null
  }

  const createMessage = async (newMessage: NewMessage) => {
    isLoading.create = true
    const { data } = await $authFetch<SuccessResponse>('/messages/', {
      method: 'POST',
      body: newMessage,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Message created successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Message creation failed'))
      .finally(() => {
        isLoading.create = false
      })
    await fetchMessages()
    return data !== null
  }

  const updateMessage = async (message: Message) => {
    isLoading.update = true
    const { data } = await $authFetch<SuccessResponse>(`/messages/${message.id}/`, {
      method: 'PUT',
      body: message,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Message updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Message updated failed'))
      .finally(() => {
        isLoading.update = false
      })
    return data !== null
  }

  const deleteMessage = async (id: number) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/messages/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Message deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Message deletion failed'))
      .finally(() => {
        isLoading.delete = false
        selectedMessageId.value = null
      })
    return data !== null
  }

  const fetchMessages = async () => {
    isLoading.fetch = true
    const { data } = await $authFetch<MessageListResponse>('/messages/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Message fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) messages.value = data
    return data !== null
  }

  const fetchAllMessages = async () => {
    isLoading.fetch = true
    const { data } = await $authFetch<MessageListResponse>('/messages/all/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Message fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) allMessages.value = data
    return data !== null
  }

  const fetchMessageById = async (id: number) => {
    isLoading.fetchById = true
    const { data } = await $authFetch<MessageResponse>(`/messages/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Message fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

    if (data !== null) singleMessage.value = data
    return data !== null
  }

  return {
    isLoading,
    messages,
    singleMessage,
    selectedMessageId,
    createMessage,
    deleteMessage,
    updateMessage,
    fetchMessages,
    fetchMessageById,
    allMessages,
    fetchAllMessages,
    clearStore,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessageStore, import.meta.hot))
}
