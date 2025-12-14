<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()

const sectionLabels = {
  'discounts': 'Discounts',
  'event-types': 'Event types',
  'ticket-types': 'Ticket types',
  'status': 'Statuses',
  'events': 'Events',
  'messages': 'Messages',
}

const breadCrumbItems = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  if (pathSegments.length === 0) return []

  const items: BreadcrumbItem[] = []

  const currentPath = ref('')

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i]

    if (i === 0 && segment === 'admin') {
      items.push({
        label: 'Admin',
        icon: 'i-mdi-shield-outline',
        to: '/admin',
      })
      currentPath.value = '/admin'
    }
    else if (i === 1) {
      if (!segment) return items
      const sectionLabel = sectionLabels[segment as keyof typeof sectionLabels] || segment.charAt(0).toUpperCase() + segment.slice(1)
      items.push({
        label: sectionLabel,
        icon: 'i-mdi-format-list-bulleted',
        to: `/admin/${segment}`,
      })
      currentPath.value = `/admin/${segment}`
    }
    else if (i === 2) {
      items.push({
        label: `Edit`,
        icon: 'i-mdi-pencil-outline',
      })
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
