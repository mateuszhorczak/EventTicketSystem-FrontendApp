<script setup lang="ts">
definePageMeta({
  middleware: 'validate-id',
})

const params = useRoute().params as { id: string }
const routeId = parseInt(params.id, 10)
</script>

<template>
  <AtomsContainerCard header="Edit discount">
    <MoleculesFormDiscount
      :id="routeId"
    />
  </AtomsContainerCard>
</template>
