<script setup lang="ts">
const discountStore = useDiscountStore()
await discountStore.fetchDiscounts()
</script>

<template>
  <UForm class="space-y-4">
    <AtomsInput
      v-model:val="discountStore.enteredCode"
      label="Enter discount code"
      name="code"
      placeholder="Discount code"
      icon="i-mdi-code"
      variant="outline"
    />

    <UFieldGroup>
      <AtomsButton
        icon="i-mdi-ticket-user"
        label="Check discount code"
        variant="solid"
        size="lg"
        :disabled="!(discountStore.enteredCode.trim()) || !!discountStore.activeDiscount"
        @click="discountStore.checkDiscountCode"
      />

      <AtomsButtonDelete @click="discountStore.clearDiscount(true)" />
    </UFieldGroup>
  </UForm>
</template>
