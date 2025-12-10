<script setup lang="ts">
const seatTypeStore = useSeatTypeStore()
const router = useRouter()

await seatTypeStore.fetchSeatTypes()

async function onSubmit() {
  if (!seatTypeStore.selectedSeatTypeId) return
  await router.push(`/admin/seat-types/${seatTypeStore.selectedSeatTypeId}`)
}
</script>

<template>
  <div class="space-y-4 mt-2">
    <AtomsSelectMenu
      v-model="seatTypeStore.selectedSeatTypeId"
      :items="transformArrayToSelectMenu(seatTypeStore.seatTypes)"
      placeholder="select seat type"
      variant="outline"
      label="Select seat type"
      name="selectSeatType"
    />

    <AtomsButton
      icon="i-mdi-pencil"
      label="Edit selected"
      variant="solid"
      size="lg"
      :loading="seatTypeStore.isLoading"
      @click="onSubmit"
    />
  </div>
</template>
