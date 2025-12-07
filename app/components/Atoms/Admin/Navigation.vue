<script setup lang="ts">
import type { PageLink } from '@nuxt/ui'

const links = ref<PageLink[]>([
  {
    label: 'Discounts',
    icon: 'i-mdi-cash-edit',
    to: '/admin/discounts',
  },
  {
    label: 'Event types',
    icon: 'i-mdi-calendar-edit',
    to: '/admin/event-types',
  },
  {
    label: 'Seat types',
    icon: 'i-mdi-seat',
    to: '/admin/seat-types',
  },
  {
    label: 'ticket-types',
    icon: 'i-mdi-ticket',
    to: '/admin/ticket-types',
  },
  {
    label: 'Status',
    icon: 'i-mdi-list-status',
    to: '/admin/status',
  },
])
</script>

<template>
  <UPageAside>
    <UContainer>
      <UPageLinks
        title="Navigation"
        :links="links"
      />
    </UContainer>
  </UPageAside>
</template>
