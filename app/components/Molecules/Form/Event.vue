<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

interface Props {
  id?: number
}

const props = defineProps<Props>()

const eventStore = useEventStore()

const statusStore = useStatusStore()
await statusStore.fetchStatuses()

const eventTypeStore = useEventTypeStore()
await eventTypeStore.fetchEventTypes()

if (props.id) await eventStore.fetchEventById(props.id)

const startsAt = shallowReactive({
  date: getCalendarDateObject(props.id ? new Date(eventStore.singleEvent.date_start) : new Date()),
  time: getTimeObject(props.id ? new Date(eventStore.singleEvent.date_start) : new Date()),
})

const endsAt = shallowReactive({
  date: getCalendarDateObject(props.id ? new Date(eventStore.singleEvent.date_end) : new Date()),
  time: getTimeObject(props.id ? new Date(eventStore.singleEvent.date_end) : new Date()),
})

const schema = z.object({
  name: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short name' }),
  description: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short description' }),
  localization: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'invalid localization' }),
  date_start: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date(),
  ),
  date_end: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date(),
  ),
  event_type: z.union([
    z
      .number({ error: 'invalid value' })
      .positive({ error: 'invalid value' }),
    z
      .string({ error: 'invalid value' })
      .nonempty({ error: 'invalid value' }),
  ]),
  status: z.union([
    z
      .number({ error: 'invalid value' })
      .positive({ error: 'invalid value' }),
    z
      .string({ error: 'invalid value' })
      .nonempty({ error: 'invalid value' }),
  ]),
  base_price: z
    .number({ error: 'invalid value' })
    .positive({ error: 'invalid value' }),
  quantity: z
    .int({ error: 'invalid value' })
    .nonnegative({ error: 'invalid value' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: props.id ? eventStore.singleEvent.name : undefined,
  description: props.id ? eventStore.singleEvent.description : undefined,
  localization: props.id ? eventStore.singleEvent.localization : undefined,
  date_start: props.id ? eventStore.singleEvent.date_start : undefined,
  date_end: props.id ? eventStore.singleEvent.date_end : undefined,
  event_type: props.id ? eventStore.singleEvent.event_type : undefined,
  status: props.id ? eventStore.singleEvent.status : undefined,
  base_price: props.id ? parseFloat(eventStore.singleEvent.base_price) : undefined,
  quantity: props.id ? parseInt(eventStore.singleEvent.quantity) : undefined,
})

const validate: (state: Partial<Schema>) => FormError[] = (state) => {
  const { error } = schema.safeParse({
    ...state,
    date_start: combineCalendarDateAndTime(startsAt.date, startsAt.time),
    date_end: combineCalendarDateAndTime(endsAt.date, endsAt.time),
  })
  return handleValidationError(error)
}
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const eventData = {
    ...event.data,
    date_start: combineCalendarDateAndTime(startsAt.date, startsAt.time),
    date_end: combineCalendarDateAndTime(endsAt.date, endsAt.time),
  }

  const promise = await (async () => {
    return props.id
      ? eventStore.updateEvent({ ...eventData, id: props.id })
      : eventStore.createEvent(eventData)
  })()

  if (!promise) return
  if (props.id) {
    await useRouter().push('/admin/events')
    return
  }
  if (!(await eventStore.fetchEvents())) return
}

const deleteEvent = async () => {
  if (!props.id) return
  if (!(await eventStore.deleteEvent(props.id))) return
  if (!(await eventStore.fetchEvents())) return
  await useRouter().push('/admin/events')
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

    <AtomsTextArea
      v-model:val="state.description"
      label="Description"
      name="description"
      placeholder="Enter description"
      icon="i-mdi-text"
      variant="outline"
    />

    <AtomsInput
      v-model:val="state.localization"
      label="Localization"
      name="localization"
      placeholder="Enter localization"
      icon="i-mdi-map-marker"
      variant="outline"
    />

    <AtomsInputPrice
      v-model:val="state.base_price"
      label="Base price"
      name="base-price"
      placeholder="price"
      icon="i-mdi-text"
      variant="outline"
      :min="0"
    />

    <AtomsInputNumber
      v-model:val="state.quantity"
      label="Quantity"
      name="quantity"
      placeholder="quantity"
      icon="i-mdi-text"
      variant="outline"
      :min="0"
    />

    <AtomsDateTimePicker
      v-model:date="startsAt.date"
      v-model:time="startsAt.time"
      label="Starts at"
      name="starts-at"
      placeholder="Select start date"
      variant="outline"
    />

    <AtomsDateTimePicker
      v-model:date="endsAt.date"
      v-model:time="endsAt.time"
      label="Ends at"
      name="ends-at"
      placeholder="Select end date"
      variant="outline"
    />

    <AtomsSelectMenu
      v-model="state.event_type"
      :items="transformArrayToSelectMenu(eventTypeStore.eventTypes)"
      placeholder="select event type"
      variant="outline"
      label="Select event type"
      name="selectEventType"
    />

    <AtomsSelectMenu
      v-model="state.status"
      :items="transformArrayToSelectMenu(statusStore.statuses)"
      placeholder="select status"
      variant="outline"
      label="Select status"
      name="selectStatus"
    />

    <UFieldGroup>
      <AtomsButton
        icon="i-mdi-cash-plus"
        :label="props.id ? 'Edit event' : 'Create event'"
        variant="solid"
        size="lg"
        type="submit"
        :loading="props.id ? eventStore.isLoading.update : eventStore.isLoading.create"
        :disabled="props.id ? eventStore.isLoading.update : eventStore.isLoading.create"
      />

      <AtomsButtonDelete
        v-if="props.id"
        :loading="eventStore.isLoading.delete"
        :disabled="eventStore.isLoading.delete"
        @click="deleteEvent"
      />
    </UFieldGroup>
  </UForm>
</template>
