<script setup lang="ts">
const statusStore = useStatusStore()
const router = useRouter()

await statusStore.fetchStatuses()

async function onSubmit() {
  if (!statusStore.selectedStatusId) return
  await router.push(`/admin/statuses/${statusStore.selectedStatusId}`)
}
</script>

<template>
  <div class="space-y-4 mt-2">
    <AtomsSelectMenu
      v-model="statusStore.selectedStatusId"
      :items="transformArrayToSelectMenu(statusStore.statuses)"
      placeholder="select status"
      variant="outline"
      label="Select status"
      name="selectStatus"
    />

    <AtomsButton
      icon="i-mdi-pencil"
      label="Edit selected"
      variant="solid"
      size="lg"
      :loading="statusStore.isLoading"
      @click="onSubmit"
    />
  </div>
</template>
