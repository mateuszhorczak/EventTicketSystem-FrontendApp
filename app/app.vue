<script setup lang="ts">
import { en } from '@nuxt/ui/locale'
</script>

<template>
  <UApp :locale="en">
    <OrganismsNavbar />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
    <OrganismsFooter />
  </UApp>
</template>
