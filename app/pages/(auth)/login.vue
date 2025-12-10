<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <UContainer>
    <MoleculesFormLogin />
  </UContainer>
</template>
