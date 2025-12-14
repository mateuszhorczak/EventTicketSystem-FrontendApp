<script setup lang="ts">
</script>

<template>
  <UDashboardPanel>
    <template #body>
      <div class="space-y-2">
        <AtomsSubHeading>Send message to admin panel</AtomsSubHeading>
        <div class="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
          <MoleculesMessages />
        </div>
        <MoleculesFormMessage />
      </div>
    </template>
  </UDashboardPanel>
</template>
