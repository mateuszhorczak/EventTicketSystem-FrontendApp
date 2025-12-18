<script setup lang="ts">
const params = useRoute().params as { id: string }
const routeId = params.id
</script>

<template>
  <AtomsContainerCard header="Edit event type">
    <MoleculesFormEventType
      :id="routeId"
    />
  </AtomsContainerCard>
</template>
