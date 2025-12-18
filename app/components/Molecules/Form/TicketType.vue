<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

interface Props {
  id?: number | string
}

const props = defineProps<Props>()

const ticketTypeStore = useTicketTypeStore()
if (props.id) await ticketTypeStore.fetchTicketTypeById(props.id)

const schema = z.object({
  name: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short name' }),
  discount: z
    .number({ error: 'required' })
    .nonnegative({ error: 'invalid value' })
    .lte(1, { error: 'invalid value' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: props.id ? ticketTypeStore.singleTicketType.name : undefined,
  discount: props.id ? parseFloat(ticketTypeStore.singleTicketType.discount) : undefined,
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
      ? ticketTypeStore.updateTicketType({ ...event.data, id: props.id })
      : ticketTypeStore.createTicketType({ ...event.data })
  })()

  if (!promise) return
  if (props.id) {
    await useRouter().push('/admin/ticket-types')
    return
  }
  if (!(await ticketTypeStore.fetchTicketTypes())) return
}

const deleteTicketType = async () => {
  if (!props.id) return
  if (!(await ticketTypeStore.deleteTicketType(props.id))) return
  if (!(await ticketTypeStore.fetchTicketTypes())) return
  await useRouter().push('/admin/ticket-types')
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

    <AtomsInputPercentage
      v-model:val="state.discount"
      label="Discount value"
      name="discount"
      placeholder="Enter value"
      variant="outline"
      :min="0"
      :max="1"
    />

    <UFieldGroup>
      <AtomsButton
        icon="i-mdi-ticket"
        :label="props.id ? 'Edit ticket type' : 'Create ticket type'"
        variant="solid"
        size="lg"
        type="submit"
        :loading="props.id ? ticketTypeStore.isLoading.update : ticketTypeStore.isLoading.create"
        :disabled="props.id ? ticketTypeStore.isLoading.update : ticketTypeStore.isLoading.create"
      />

      <AtomsButtonDelete
        v-if="props.id"
        :loading="ticketTypeStore.isLoading.delete"
        :disabled="ticketTypeStore.isLoading.delete"
        @click="deleteTicketType"
      />
    </UFieldGroup>
  </UForm>
</template>
