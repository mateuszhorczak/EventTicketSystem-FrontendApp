<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const orderStore = useOrderStore()
const ticketTypeStore = useTicketTypeStore()
const discountStore = useDiscountStore()

const props = defineProps<{ eventId: number }>()

const params = useRoute().params as { id: string }
const routeId = parseInt(params.id, 10)

await ticketTypeStore.fetchTicketTypes()
await discountStore.fetchDiscounts()

const schema = z.object({
  quantity: z
    .int({ error: 'required' })
    .positive({ error: 'invalid value' }),
  ticket_type: z.union([
    z
      .number({ error: 'invalid value' })
      .positive({ error: 'invalid value' }),
    z
      .string({ error: 'invalid value' })
      .nonempty({ error: 'invalid value' }),
  ]),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  quantity: undefined,
  ticket_type: undefined,
})

const validate: (state: Partial<Schema>) => FormError[] = (state) => {
  const { error } = schema.safeParse({
    ...state,
  })
  return handleValidationError(error)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const eventData = {
    ...event.data,
    event: props.eventId,
  }
  orderStore.addTicket(eventData)
}

const confirmPurchase = async () => {
  await useRouter().push(`/events/${routeId}/order/confirm`)
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="space-y-4 mt-2"
    @submit="onSubmit"
  >
    <AtomsInputNumber
      v-model:val="state.quantity"
      label="Number of tickets"
      name="quantity"
      placeholder="Enter number of tickets"
      icon="i-mdi-text"
      variant="outline"
      :min="1"
    />

    <AtomsSelectMenu
      v-model="state.ticket_type"
      :items="transformArrayToSelectMenu(ticketTypeStore.ticketTypes)"
      placeholder="select ticket type"
      variant="outline"
      label="Select ticket type"
      name="selectTicketType"
    />

    <UFieldGroup>
      <UTooltip text="Buy selected tickets">
        <AtomsButton
          icon="i-mdi-cart"
          label="Purchase selected"
          size="lg"
          variant="solid"
          :loading="orderStore.isLoading.create"
          :disabled="orderStore.isLoading.create || orderStore.selectedTickets.length === 0"
          @click="confirmPurchase"
        />
      </UTooltip>
      <UTooltip text="Select ticket and add another one">
        <AtomsButton
          icon="i-mdi-plus-outline"
          label="Add ticket"
          variant="outline"
          size="lg"
          type="submit"
        />
      </UTooltip>
    </UFieldGroup>
  </UForm>
</template>
