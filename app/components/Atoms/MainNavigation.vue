<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

// const auth = useAuth()
const authToken = useAuthToken()
// const router = useRouter()

const items = computed<NavigationMenuItem[]>(() => {
  const homePage = {
    icon: 'i-mdi-home',
    to: '/',
  }

  const setDatabasePage = {
    icon: 'i-mdi-database-cog',
    to: '/set-database',
  }

  const adminPage = {
    icon: 'i-mdi-account-supervisor-circle',
    to: '/admin',
  }

  const isLoggedMenu = [
    homePage,
    setDatabasePage,
    adminPage,
    {
      label: 'Logout',
      icon: 'i-mdi-exit-to-app',
      to: '/logout',
    },
  ]

  const isNotLoggedMenu = [
    homePage,
    setDatabasePage,
    {
      label: 'Login',
      icon: 'i-mdi-user',
      to: '/login',
    },
    {
      label: 'Register',
      icon: 'i-mdi-user',
      to: '/register',
    },

  ]
  return authToken.isLoggedIn ? isLoggedMenu : isNotLoggedMenu
})
</script>

<template>
  <UNavigationMenu :items="items" />
</template>
