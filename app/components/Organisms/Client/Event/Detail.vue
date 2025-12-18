<script setup lang="ts">
const eventStore = useEventStore()
const discountStore = useDiscountStore()
const orderStore = useOrderStore()
const ticketTypeStore = useTicketTypeStore()
const statusStore = useStatusStore()
const eventTypeStore = useEventTypeStore()

const route = useRoute()
const params = route.params as { id: string }
const routeId = params.id

const confirmPage = route.path.includes('confirm')

await eventStore.fetchEventById(routeId)
await ticketTypeStore.fetchTicketTypes()
await statusStore.fetchStatuses()
await eventTypeStore.fetchEventTypes()

const selectedTicketsWithDiscount = computed(() => {
  if (!ticketTypeStore.ticketTypes || !orderStore.selectedTickets) return []
  const typeMap = new Map()
  ticketTypeStore.ticketTypes.forEach((type) => {
    typeMap.set(type.id, parseFloat(type.discount))
  })

  return orderStore.selectedTickets.map((item: NewTicket) => ({
    quantity: item.quantity,
    discount: typeMap.get(item.ticket_type) || 0,
  }))
})

const totalPrice = computed(() => {
  const basePrice = parseFloat(eventStore.singleEvent.base_price)
  if (!confirmPage) return basePrice

  if (!discountStore.activeDiscount && !confirmPage) return basePrice.toFixed(2)

  const total = selectedTicketsWithDiscount.value.reduce((sum: number, item: { discount: number, quantity: number }) => {
    const priceAfterDiscount = basePrice * (1 - item.discount)
    return sum + (priceAfterDiscount * item.quantity)
  }, 0)

  return total.toFixed(2)
})

const totalPriceDiscount = computed(() => (parseFloat(totalPrice.value) * (1 - parseFloat(discountStore.activeDiscount?.discount_percentage))).toFixed(2))

const onSubmit = async () => {
  if (!confirmPage) return await useRouter().push(`/events/${routeId}/order`)
  const data = {
    tickets: orderStore.selectedTickets,
    discount: discountStore.activeDiscount ? discountStore.activeDiscount.id : null,
  }
  if (!(await orderStore.createOrder(data))) return
  orderStore.clearTicketList()
  discountStore.clearDiscount(false)
  await useRouter().push('/')
}

const item = computed(() => ({
  title: eventStore.singleEvent.name,
  description: eventStore.singleEvent.description,
  price: `${totalPrice.value} PLN`,
  discount: `${totalPriceDiscount.value} PLN`,
  badge: eventStore.singleEvent.quantity === '0' ? 'Sold Out' : `${eventStore.singleEvent.quantity} tickets left`,
  button: {
    label: confirmPage ? 'Confirm order' : 'Buy ticket',
    disabled: confirmPage && totalPrice.value === '0.00',
    onClick: onSubmit,
  },
  features: [
    {
      title: eventStore.singleEvent.localization,
      icon: 'i-mdi-map-marker-outline',
    },
    {
      title: eventTypeStore.eventTypes?.filter(item => item.id === eventStore.singleEvent.event_type)[0]?.name,
      icon: 'i-mdi-calendar-star-outline',
    },
    {
      title: statusStore.statuses?.filter(item => item.id === eventStore.singleEvent.status)[0]?.name,
      icon: 'i-mdi-list-status',
    },
    {
      title: getTimeInterval(eventStore.singleEvent.date_start, eventStore.singleEvent.date_end),
      icon: 'i-mdi-calendar-outline',
    },
  ],
}))
</script>

<template>
  <div class="flex justify-center">
    <UPricingPlan
      :title="item.title"
      :description="item.description"
      :price="item.price"
      :badge="item.badge"
      :discount="(!!discountStore.activeDiscount && confirmPage) ? item.discount : ''"
      :features="item.features"
      variant="subtle"
      :button="item.button"
      highlight
    />
  </div>
</template>
