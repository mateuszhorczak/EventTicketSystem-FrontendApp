<script setup lang="ts">
const eventStore = useEventStore()
const router = useRouter()

await eventStore.fetchEvents()

async function onSubmit() {
  if (!eventStore.selectedEventId) return
  await router.push(`/admin/events/${eventStore.selectedEventId}`)
}
</script>

<template>
  <div class="space-y-4 mt-2">
    <AtomsSelectMenu
      v-model="eventStore.selectedEventId"
      :items="transformArrayToSelectMenu(eventStore.events)"
      placeholder="select event"
      variant="outline"
      label="Select event"
      name="selectEvent"
    />

    <AtomsButton
      icon="i-mdi-pencil"
      label="Edit selected"
      variant="solid"
      size="lg"
      :loading="eventStore.isLoading.fetchById"
      :disabled="eventStore.isLoading.fetch || !eventStore.selectedEventId"
      @click="onSubmit"
    />
  </div>
</template>
