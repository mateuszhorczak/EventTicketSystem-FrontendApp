<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const adminStore = useAdminStore()

const modelSelectedTime = defineModel<{ start: Date, end: Date }>('selected', {
  default: () => ({
    start: new Date(),
    end: new Date(Date.now() + 60 * 60 * 1000),
  }),
})

const startsAt = shallowReactive({
  date: getCalendarDateObject(modelSelectedTime.value.start ?? new Date()),
  time: getTimeObject(modelSelectedTime.value.start ?? new Date()),
})

const endsAt = shallowReactive({
  date: getCalendarDateObject(modelSelectedTime.value.end ?? new Date()),
  time: getTimeObject(modelSelectedTime.value.end ?? new Date()),
})

const schema = z.object({
  name: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short name' }),
  discount_percentage: z
    .number({ error: 'required' })
    .positive({ error: 'invalid value' })
    .lte(1, { error: 'invalid value' }),
  code: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short code' }),
  valid_from: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date(),
  ),
  valid_to: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date(),
  ) })

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  discount_percentage: 0.05,
  code: undefined,
  valid_from: undefined,
  valid_to: undefined,
})

const validate: (state: Partial<Schema>) => FormError[] = (state) => {
  const { error } = schema.safeParse({
    ...state,
    valid_from: combineCalendarDateAndTime(startsAt.date, startsAt.time),
    valid_to: combineCalendarDateAndTime(endsAt.date, endsAt.time),
  })
  return handleValidationError(error)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const creationPromise = adminStore.createDiscount({
    ...event.data,
    valid_from: combineCalendarDateAndTime(startsAt.date, startsAt.time),
    valid_to: combineCalendarDateAndTime(endsAt.date, endsAt.time),
  })
  if (!(await creationPromise)) return
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

    <AtomsInput
      v-model:val="state.code"
      label="Code"
      name="code"
      placeholder="Enter code"
      icon="i-mdi-code"
      variant="outline"
    />

    <AtomsPercentageInput
      v-model:val="state.discount_percentage"
      label="Discount percentage"
      name="discount-percentage"
      placeholder="Enter discount percentage"
      icon="i-mdi-email"
      variant="outline"
    />

    <AtomsDatetimePicker
      v-model:date="startsAt.date"
      v-model:time="startsAt.time"
      label="Valid from"
      name="valid-from"
      placeholder="Select start date"
      variant="outline"
    />

    <AtomsDatetimePicker
      v-model:date="endsAt.date"
      v-model:time="endsAt.time"
      label="Valid to"
      name="endsAt"
      placeholder="Select end date"
      variant="outline"
    />

    <AtomsButton
      icon="i-mdi-cash-plus"
      label="Create discount"
      variant="solid"
      size="lg"
      type="submit"
      :loading="adminStore.isLoading"
      :disabled="adminStore.isLoading"
    />
  </UForm>
</template>
