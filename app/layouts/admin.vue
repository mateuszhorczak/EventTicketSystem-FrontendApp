<script setup lang="ts">

</script>

<template>
  <UPage>
    <template #left>
      <AtomsAdminNavigation />
    </template>

    <template #default>
      <UPageBody>
        <AtomsBreadcrumbAdmin />
        <NuxtPage />
      </UPageBody>
    </template>

    <template #right>
      <div />
    </template>
  </UPage>
</template>
