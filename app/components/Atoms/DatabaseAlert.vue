<script setup lang="ts">
const databaseStore = useDatabaseStore()
</script>

<template>
  <UBanner
    id="database-info"
    :title="'Using ' + databaseStore.database + ' database.'"
    icon="i-mdi-database"
    class="rounded-none"
  />
</template>
