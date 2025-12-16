<script setup lang="ts">
const orderStore = useOrderStore()
const ticketTypeStore = useTicketTypeStore()
</script>

<template>
  <div
    v-for="(ticket, index) in orderStore.selectedTickets"
    :key="index"
    class="my-4"
  >
    <UCard>
      <div class="flex justify-between">
        <div>
          <AtomsParagraph>{{ 'Quantity: ' + ticket.quantity }}</AtomsParagraph>
          <AtomsParagraph v-if="ticketTypeStore.ticketTypes">
            {{ 'Ticket type: ' + ticketTypeStore.ticketTypes.filter(item => item.id === ticket.ticket_type)[0]?.name }}
          </AtomsParagraph>
        </div>
        <AtomsButtonDelete
          color="error"
          @click="orderStore.deleteTicket(ticket)"
        />
      </div>
    </UCard>
  </div>
</template>
