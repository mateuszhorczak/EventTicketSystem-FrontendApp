export const useOrderStore = defineStore('orderStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const orders = ref<Order[]>()
  const selectedTickets = ref<NewTicket[]>([])
  const singleOrder = ref<Order>()
  const selectedOrderId = ref()

  const addTicket = (ticket: NewTicket) => selectedTickets.value.push(ticket)
  const clearTicketList = () => selectedTickets.value = []
  const deleteTicket = (ticket: NewTicket) => {
    selectedTickets.value.splice(selectedTickets.value.indexOf(ticket), 1)
  }

  const clearStore = () => {
    orders.value = []
    selectedTickets.value = []
    singleOrder.value = null
    selectedOrderId.value = null
  }

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const createOrder = async (newOrder: NewOrder) => {
    isLoading.create = true
    const { data } = await $authFetch<SuccessResponse>('/orders/', {
      method: 'POST',
      body: newOrder,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Purchase successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Purchase failed'))
      .finally(() => {
        isLoading.create = false
      })
    return data !== null
  }

  const updateOrder = async (order: Order) => {
    isLoading.update = true
    const { data } = await $authFetch<SuccessResponse>(`/orders/${order.id}/`, {
      method: 'PUT',
      body: order,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Order updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Order updated failed'))
      .finally(() => {
        isLoading.update = false
      })
    return data !== null
  }

  const deleteOrder = async (id: number) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/orders/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Order deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Order deletion failed'))
      .finally(() => {
        isLoading.delete = false
        singleOrder.value = null
      })
    return data !== null
  }

  const fetchOrders = async () => {
    isLoading.fetch = true
    const { data } = await $authFetch<OrderListResponse>('/orders/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Order fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) orders.value = data
    return data !== null
  }

  const fetchOrderById = async (id: number | string) => {
    isLoading.fetchById = true
    const { data } = await $authFetch<OrderResponse>(`/order/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Order fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

    if (data !== null) singleOrder.value = data
    return data !== null
  }

  return {
    isLoading,
    orders,
    singleOrder,
    selectedOrderId,
    createOrder,
    deleteOrder,
    updateOrder,
    fetchOrders,
    fetchOrderById,
    selectedTickets,
    addTicket,
    clearTicketList,
    deleteTicket,
    clearStore,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
}
