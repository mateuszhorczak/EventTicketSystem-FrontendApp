<script setup lang="ts">
const authToken = useAuthToken()
</script>

<template>
  <UHeader
    mode="drawer"
    :toggle="{
      color: 'primary',
      variant: 'subtle',
      class: 'rounded-full',
    }"
  >
    <template #title>
      <AtomsSubHeading>Your events</AtomsSubHeading>
    </template>

    <AtomsMainNavigation />

    <template #right>
      <AtomsButton
        v-if="authToken.isLoggedIn"
        variant="link"
        icon="i-mdi-exit-to-app"
        to="/logout"
      />
      <UColorModeSwitch />
    </template>

    <template #body>
      <AtomsMainNavigation
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
