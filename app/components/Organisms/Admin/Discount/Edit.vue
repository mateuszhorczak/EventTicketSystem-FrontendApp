<script setup lang="ts">
const params = useRoute().params as { id: string }
const routeId = params.id
</script>

<template>
  <AtomsContainerCard header="Edit discount">
    <MoleculesFormDiscount
      :id="routeId"
    />
  </AtomsContainerCard>
</template>
