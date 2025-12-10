<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
useAuth().logout()
</script>

<template>
  <AtomsParagraph />
</template>
