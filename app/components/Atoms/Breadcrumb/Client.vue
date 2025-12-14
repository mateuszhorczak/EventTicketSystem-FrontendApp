<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()

const breadCrumbItems = computed(() => {
  const items: BreadcrumbItem[] = []
  const pathSegments = route.path.split('/').filter(Boolean)

  if (['/login', '/register', '/logout'].includes(route.path)) {
    return items
  }

  items.push({
    label: 'Home',
    icon: 'i-mdi-home',
    to: '/',
  })

  let accumulatedPath = ''

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i]
    accumulatedPath += `/${segment}`

    if (segment === 'set-database') {
      items.push({
        label: 'Database',
        icon: 'i-mdi-database',
        to: accumulatedPath,
      })
    }

    if (segment === 'contact') {
      items.push({
        label: 'Contact',
        icon: 'i-mdi-message',
        to: accumulatedPath,
      })
    }
    else if (pathSegments[0] === 'events') {
      if (i === 1) {
        items.push({
          label: 'Detail',
          icon: 'i-mdi-calendar-cursor',
          to: accumulatedPath,
        })
      }
      else if (segment === 'order') {
        items.push({
          label: 'Order',
          icon: 'i-mdi-shopping',
          to: accumulatedPath,
        })
      }
      else if (segment === 'confirm') {
        items.push({
          label: 'Confirm',
          icon: 'i-mdi-checkbox-marked-circle',
          to: accumulatedPath,
        })
      }
    }
  }

  return items
})
</script>

<template>
  <UBreadcrumb
    :items="breadCrumbItems"
    separator-icon="i-mdi-chevron-right"
  />
</template>
