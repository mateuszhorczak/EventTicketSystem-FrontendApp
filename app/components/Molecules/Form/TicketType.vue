<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

interface Props {
  id?: number
}

const props = defineProps<Props>()

const ticketTypeStore = useTicketTypeStore()
if (props.id) await ticketTypeStore.fetchTicketTypeById(props.id)

const schema = z.object({
  name: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short name' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: props.id ? ticketTypeStore.singleTicketType.name : undefined,
})

const validate: (state: Partial<Schema>) => FormError[] = (state) => {
  const { error } = schema.safeParse({
    ...state,
  })
  return handleValidationError(error)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const promise = await (async () => {
    return props.id
      ? seatTypeStore.updateSeatType({ ...event.data, id: props.id })
      : seatTypeStore.createSeatType({ ...event.data })
  })()

  if (!promise) return
  if (props.id) {
    await useRouter().push('/admin/ticket-types')
    return
  }
  if (!(await ticketTypeStore.fetchTicketTypes())) return
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="space-y-4 mt-2"
    @submit="onSubmit"
  >
    <AtomsInput
      v-model:val="state.name"
      label="Name"
      name="name"
      placeholder="Enter name"
      icon="i-mdi-text"
      variant="outline"
    />

    <AtomsButton
      icon="i-mdi-ticket"
      label="Create ticket type"
      variant="solid"
      size="lg"
      type="submit"
      :loading="ticketTypeStore.isLoading"
      :disabled="ticketTypeStore.isLoading"
    />
  </UForm>
</template>
