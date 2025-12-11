<script setup lang="ts">
const params = useRoute().params as { id: string }
const routeId = parseInt(params.id, 10)
</script>

<template>
  <AtomsContainerCard header="Edit event">
    <MoleculesFormEvent
      :id="routeId"
    />
  </AtomsContainerCard>
</template>
