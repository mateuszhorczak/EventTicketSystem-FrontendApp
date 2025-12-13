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

const deleteEventType = async () => {
  if (!props.id) return
  if (!(await eventTypeStore.deleteEventType(props.id))) return
  if (!(await eventTypeStore.fetchEventTypes())) return
  await useRouter().push('/admin/event-types')
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

    <UFieldGroup>
      <AtomsButton
        icon="i-mdi-calendar-plus"
        :label="props.id ? 'Edit event type' : 'Create event type'"
        variant="solid"
        size="lg"
        type="submit"
        :loading="props.id ? eventTypeStore.isLoading.update : eventTypeStore.isLoading.create"
        :disabled="props.id ? eventTypeStore.isLoading.update : eventTypeStore.isLoading.create"
      />

      <AtomsButtonDelete
        v-if="props.id"
        :loading="eventTypeStore.isLoading.delete"
        :disabled="eventTypeStore.isLoading.delete"
        @click="deleteEventType"
      />
    </UFieldGroup>
  </UForm>
</template>
