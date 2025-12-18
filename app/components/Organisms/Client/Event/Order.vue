<script setup lang="ts">
const params = useRoute().params as { id: string }
const routeId = params.id
</script>

<template>
  <MoleculesFormOrder :event-id="routeId" />
</template>
