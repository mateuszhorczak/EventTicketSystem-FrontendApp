<script setup lang="ts">
const discountStore = useDiscountStore()
const router = useRouter()

await discountStore.fetchDiscounts()

async function onSubmit() {
  if (!discountStore.selectedDiscountId) return
  await router.push(`/admin/discounts/${discountStore.selectedDiscountId}`)
}
</script>

<template>
  <div class="space-y-4 mt-2">
    <AtomsSelectMenu
      v-model="discountStore.selectedDiscountId"
      :items="transformArrayToSelectMenu(discountStore.discounts)"
      placeholder="select discount"
      variant="outline"
      label="Select discount"
      name="selectDiscount"
    />

    <AtomsButton
      icon="i-mdi-pencil"
      label="Edit selected"
      variant="solid"
      size="lg"
      :loading="discountStore.isLoading"
      @click="onSubmit"
    />
  </div>
</template>
