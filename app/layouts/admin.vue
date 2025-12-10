<script setup lang="ts">

</script>

<template>
  <UPage>
    <template #left>
      <AtomsAdminNavigation />
    </template>

    <template #default>
      <UPageBody>
        <AtomsAdminBreadcrumb />
        <NuxtPage />
      </UPageBody>
    </template>

    <template #right />
  </UPage>
</template>
