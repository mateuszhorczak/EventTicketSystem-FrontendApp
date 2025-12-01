<script setup lang="ts">

</script>

<template>
  <UHeader
    mode="drawer"
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full'
    }"
  >
    <template #title>
      <AtomsSubHeading>Your events</AtomsSubHeading>
    </template>

    <AtomsMainNavigation />

    <template #right>
      <UColorModeSwitch />
    </template>

    <template #body>
      <AtomsMainNavigation orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
