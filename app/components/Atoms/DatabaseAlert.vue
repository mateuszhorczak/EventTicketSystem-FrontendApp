<script setup lang="ts">
const databaseStore = useDatabaseStore()
</script>

<template>
  <UBanner
    :title="'Using ' + databaseStore.database + ' database.'"
    icon="i-mdi-database"
    class="rounded-none"
  />
</template>
