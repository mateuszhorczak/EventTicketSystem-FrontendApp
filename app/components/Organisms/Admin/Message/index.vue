<script setup lang="ts">
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="space-y-2">
        <AtomsSubHeading>Admin panel messages</AtomsSubHeading>
        <div class="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
          <MoleculesMessages />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
