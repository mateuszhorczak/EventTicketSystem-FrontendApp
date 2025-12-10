export const useDiscountStore = defineStore('discountStore', () => {
  const { $authFetch, $apiFetch } = useNuxtApp()
  const isLoading = ref(false)
  const discounts = ref<Discount[]>()
  const singleDiscount = ref<Discount>()
  const selectedDiscountId = ref()

  const createDiscount = async (newDiscount: NewDiscount) => {
    isLoading.value = true
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
        isLoading.value = false
      })
    return data !== null
  }

  const updateDiscount = async (discount: Discount) => {
    isLoading.value = true
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
        isLoading.value = false
      })
    return data !== null
  }

  const deleteDiscount = async (id: number) => {
    isLoading.value = true
    const { data } = await $authFetch<SuccessResponse>(`/discounts/${id}/`, {
      method: 'DELETE',
    })
      .then((data) => {
        createSuccessToast({
          title: 'Discount deleted successfully',
        })
        return { data: data.success }
      })
      .catch(error => handleApiError(error, 'Discount deletion failed'))
      .finally(() => {
        isLoading.value = false
      })
    return data !== null
  }

  const fetchDiscounts = async () => {
    isLoading.value = true
    const { data } = await $apiFetch<DiscountListResponse>('/discounts/')
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Discounts fetching error')))
      .finally(() => {
        isLoading.value = false
      })

    if (data !== null) discounts.value = data
    return data !== null
  }

  const fetchDiscountById = async (id: number) => {
    const { data } = await $apiFetch<DiscountResponse>(`/discounts/${id}/`)
      .then(data => ({ data }))
      .catch(error => handleApiError(error, ('Discount fetching error')))

    if (data !== null) singleDiscount.value = data
    return data !== null
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
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDiscountStore, import.meta.hot))
}
