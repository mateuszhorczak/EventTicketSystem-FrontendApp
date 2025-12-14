<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const authToken = useAuthToken()

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
    icon: 'i-mdi-shield',
    to: '/admin',
  }

  const messagePage = {
    icon: 'i-mdi-chat',
    to: '/contact',
  }

  const isLoggedMenu = [
    homePage,
    setDatabasePage,
    adminPage,
    messagePage,
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
