export const useDiscountStore = defineStore('discountStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const discounts = ref<Discount[]>()
  const singleDiscount = ref<Discount>()
  const selectedDiscountId = ref()
  const enteredCode = ref('')
  const activeDiscount = ref()

  const isLoading = reactive({
    create: false,
    update: false,
    delete: false,
    fetch: false,
    fetchById: false,
  })

  const clearStore = () => {
    discounts.value = []
    singleDiscount.value = null
    selectedDiscountId.value = null
    enteredCode.value = ''
    activeDiscount.value = ''
  }

  const createDiscount = async (newDiscount: NewDiscount) => {
    isLoading.create = true
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
        isLoading.create = false
      })
    return data !== null
  }

  const updateDiscount = async (discount: Discount) => {
    isLoading.update = true
    const { data } = await $authFetch<SuccessResponse>(`/discounts/${discount.id}/`, {
      method: 'PUT',
      body: discount,
    })
      .then((data) => {
        createSuccessToast({
          title: 'Discount updated successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Discount updated failed'))
      .finally(() => {
        isLoading.update = false
      })
    return data !== null
  }

  const deleteDiscount = async (id: number) => {
    isLoading.delete = true
    const { data } = await $authFetch<SuccessResponse>(`/discounts/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        createSuccessToast({
          title: 'Discount deleted successfully',
        })
        return { data: true }
      })
      .catch(error => handleApiError(error, 'Discount deletion failed'))
      .finally(() => {
        isLoading.delete = false
        selectedDiscountId.value = null
      })
    return data !== null
  }

  const fetchDiscounts = async () => {
    isLoading.fetch = true
    const { data } = await $authFetch<DiscountListResponse>('/discounts/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Discounts fetching error')))
      .finally(() => {
        isLoading.fetch = false
      })

    if (data !== null) discounts.value = data
    return data !== null
  }

  const fetchDiscountById = async (id: number) => {
    isLoading.fetchById = true
    const { data } = await $authFetch<DiscountResponse>(`/discounts/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Discount fetching error')))
      .finally(() => {
        isLoading.fetchById = false
      })

    if (data !== null) singleDiscount.value = data
    return data !== null
  }

  const checkDiscountCode = () => {
    activeDiscount.value = discounts.value?.find(discount => discount.code === enteredCode.value)
    if (!activeDiscount.value) {
      createErrorToast({
        title: 'Invalid discount code',
      })
    }
    else {
      createSuccessToast({
        title: 'Activate entered discount code',
        description: `You got ${activeDiscount.value.discount_percentage}% discount!`,
      })
    }
  }

  const clearDiscount = (showToast: boolean) => {
    enteredCode.value = ''
    activeDiscount.value = undefined

    if (!showToast) return
    createSuccessToast({
      title: 'Discount unactivate',
    })
  }

  return {
    isLoading,
    discounts,
    singleDiscount,
    selectedDiscountId,
    createDiscount,
    deleteDiscount,
    updateDiscount,
    fetchDiscounts,
    fetchDiscountById,
    enteredCode,
    checkDiscountCode,
    activeDiscount,
    clearDiscount,
    clearStore,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDiscountStore, import.meta.hot))
}
