<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui'

const eventStore = useEventStore()
await eventStore.fetchEvents()

interface InputProps {
  name: string
  description: string
  id: number
  base_price: string
  quantity: string
  localization: string
  event_type: EventType
  status: Status
  date_start: string
  date_end: string
}

function transformEventArrayToPlanCards<T extends InputProps>(
  array: T[] | undefined | null,
): PricingPlanProps[] {
  if (!array) return []

  return array.map(item => ({
    title: item.name,
    description: item.description,
    price: `${item.base_price} PLN`,
    button: {
      label: 'See details',
      to: `/events/${item.id}`,
    },
    badge: item.quantity === '0' ? 'Sold Out' : `${item.quantity} tickets left`,
    variant: 'subtle',
    features: [
      {
        title: item.localization,
        icon: 'i-mdi-map-marker-outline',
      },
      {
        title: getTimeInterval(item.date_start, item.date_end),
        icon: 'i-mdi-calendar-outline',
      },
    ],
  }))
}
</script>

<template>
  <UPricingPlans
    orientation="vertical"
    :plans="transformEventArrayToPlanCards(eventStore.events)"
  />
</template>
