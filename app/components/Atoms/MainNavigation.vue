<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const authToken = useAuthToken()
const auth = useAuth()

const baseMenu = [
  { icon: 'i-mdi-home', to: '/' },
  { icon: 'i-mdi-database-cog', to: '/set-database' },
]

const messagePage = { icon: 'i-mdi-chat', to: '/contact' }

const items = computed<NavigationMenuItem[]>(() => {
  if (authToken.isLoggedIn && auth.user.is_staff) {
    return [
      ...baseMenu,
      { icon: 'i-mdi-shield', to: '/admin' },
      messagePage,
    ]
  }
  else if (authToken.isLoggedIn) {
    return [
      ...baseMenu,
      messagePage,
    ]
  }
  else {
    return [
      ...baseMenu,
      { label: 'Login', icon: 'i-mdi-user', to: '/login' },
      { label: 'Register', icon: 'i-mdi-user', to: '/register' },
    ]
  }
})
</script>

<template>
  <UNavigationMenu :items="items" />
</template>
