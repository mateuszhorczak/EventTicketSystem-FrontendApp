<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <UContainer>
    <MoleculesFormRegister />
  </UContainer>
</template>
