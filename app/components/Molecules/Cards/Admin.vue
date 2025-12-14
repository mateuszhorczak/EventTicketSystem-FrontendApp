<script setup lang="ts">
const cards = [
  {
    title: 'Discounts',
    description: 'Manage discount codes, percentages, and promo rules.',
    icon: 'i-mdi-cash',
    to: '/admin/discounts',
  },
  {
    title: 'Event types',
    description: 'Create and organize different kinds of events.',
    icon: 'i-mdi-calendar',
    to: '/admin/event-types',
  },
  {
    title: 'Ticket types',
    description: 'Set up ticket variants: early bird, regular, group, etc.',
    icon: 'i-mdi-ticket',
    to: '/admin/ticket-types',
  },
  {
    title: 'Status',
    description: 'Manage order, ticket, and payment statuses.',
    icon: 'i-mdi-list-status',
    to: '/admin/status',
  },
  {
    title: 'Events',
    description: 'Create and organize events.',
    icon: 'i-mdi-calendar-plus',
    to: '/admin/events',
  },
  {
    title: 'Messages',
    description: 'Read customers messages from admin panel.',
    icon: 'i-mdi-message-outline',
    to: '/admin/messages',
  },
]
</script>

<template>
  <AtomsSubHeading>Manage your app</AtomsSubHeading>
  <UPageGrid>
    <UPageCard
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
    />
  </UPageGrid>
</template>
