<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

interface Props {
  id?: number
}

const props = defineProps<Props>()

const eventTypeStore = useEventTypeStore()
if (props.id) await eventTypeStore.fetchEventTypeById(props.id)

const schema = z.object({
  name: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short name' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: props.id ? eventTypeStore.singleEventType.name : undefined,
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
      ? eventTypeStore.updateEventType({ ...event.data, id: props.id })
      : eventTypeStore.createEventType({ ...event.data })
  })()

  if (!promise) return
  if (props.id) {
    await useRouter().push('/admin/event-types')
    return
  }
  if (!(await eventTypeStore.fetchEventTypes())) return
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
      icon="i-mdi-calendar-plus"
      label="Create event type"
      variant="solid"
      size="lg"
      type="submit"
      :loading="eventTypeStore.isLoading"
      :disabled="eventTypeStore.isLoading"
    />
  </UForm>
</template>
