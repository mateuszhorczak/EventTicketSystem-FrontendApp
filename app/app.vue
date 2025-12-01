<script setup lang="ts">
import { pl } from '@nuxt/ui/locale'
</script>

<template>
  <UApp :locale="pl">
    <OrganismsNavbar />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <OrganismsFooter />
  </UApp>
</template>
