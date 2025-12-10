<script setup lang="ts">
const ticketTypeStore = useTicketTypeStore()
const router = useRouter()

await ticketTypeStore.fetchTicketTypes()

async function onSubmit() {
  if (!ticketTypeStore.selectedTicketTypeId) return
  await router.push(`/admin/ticket-types/${ticketTypeStore.selectedTicketTypeId}`)
}
</script>

<template>
  <div class="space-y-4 mt-2">
    <AtomsSelectMenu
      v-model="ticketTypeStore.selectedTicketTypeId"
      :items="transformArrayToSelectMenu(ticketTypeStore.ticketTypes)"
      placeholder="select ticket type"
      variant="outline"
      label="Select ticket type"
      name="selectTicketType"
    />

    <AtomsButton
      icon="i-mdi-pencil"
      label="Edit selected"
      variant="solid"
      size="lg"
      :loading="ticketTypeStore.isLoading.fetchById"
      :disabled="ticketTypeStore.isLoading.fetch || !ticketTypeStore.selectedTicketTypeId"
      @click="onSubmit"
    />
  </div>
</template>
