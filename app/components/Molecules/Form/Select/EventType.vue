<script setup lang="ts">
const eventTypeStore = useEventTypeStore()
const router = useRouter()

await eventTypeStore.fetchEventTypes()

async function onSubmit() {
  if (!eventTypeStore.selectedEventTypeId) return
  await router.push(`/admin/event-types/${eventTypeStore.selectedEventTypeId}`)
}
</script>

<template>
  <div class="space-y-4 mt-2">
    <AtomsSelectMenu
      v-model="eventTypeStore.selectedEventTypeId"
      :items="transformArrayToSelectMenu(eventTypeStore.eventTypes)"
      placeholder="select event type"
      variant="outline"
      label="Select event type"
      name="selectEventType"
    />

    <AtomsButton
      icon="i-mdi-pencil"
      label="Edit selected"
      variant="solid"
      size="lg"
      :loading="eventTypeStore.isLoading.fetchById"
      :disabled="eventTypeStore.isLoading.fetch || !eventTypeStore.selectedEventTypeId"
      @click="onSubmit"
    />
  </div>
</template>
