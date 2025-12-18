<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

interface Props {
  id?: number | string
}

const props = defineProps<Props>()

const discountStore = useDiscountStore()
if (props.id) await discountStore.fetchDiscountById(props.id)

const startsAt = shallowReactive({
  date: getCalendarDateObject(props.id ? new Date(discountStore.singleDiscount.valid_from) : new Date()),
  time: getTimeObject(props.id ? new Date(discountStore.singleDiscount.valid_from) : new Date()),
})

const endsAt = shallowReactive({
  date: getCalendarDateObject(props.id ? new Date(discountStore.singleDiscount.valid_to) : new Date()),
  time: getTimeObject(props.id ? new Date(discountStore.singleDiscount.valid_to) : new Date()),
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
  ),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: props.id ? discountStore.singleDiscount.name : undefined,
  discount_percentage: props.id ? parseFloat(discountStore.singleDiscount.discount_percentage) : 0.05,
  code: props.id ? discountStore.singleDiscount.code : undefined,
  valid_from: props.id ? discountStore.singleDiscount.valid_from : undefined,
  valid_to: props.id ? discountStore.singleDiscount.valid_to : undefined,
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
  const eventData = {
    ...event.data,
    valid_from: combineCalendarDateAndTime(startsAt.date, startsAt.time),
    valid_to: combineCalendarDateAndTime(endsAt.date, endsAt.time),
  }

  const promise = await (async () => {
    return props.id
      ? discountStore.updateDiscount({ ...eventData, id: props.id })
      : discountStore.createDiscount(eventData)
  })()

  if (!promise) return
  if (props.id) {
    await useRouter().push('/admin/discounts')
    return
  }
  if (!(await discountStore.fetchDiscounts())) return
}

const deleteDiscount = async () => {
  if (!props.id) return
  if (!(await discountStore.deleteDiscount(props.id))) return
  if (!(await discountStore.fetchDiscounts())) return
  await useRouter().push('/admin/discounts')
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

    <AtomsInputPercentage
      v-model:val="state.discount_percentage"
      label="Discount percentage"
      name="discount-percentage"
      placeholder="Enter discount percentage"
      variant="outline"
    />

    <AtomsDateTimePicker
      v-model:date="startsAt.date"
      v-model:time="startsAt.time"
      label="Valid from"
      name="valid-from"
      placeholder="Select start date"
      variant="outline"
    />

    <AtomsDateTimePicker
      v-model:date="endsAt.date"
      v-model:time="endsAt.time"
      label="Valid to"
      name="endsAt"
      placeholder="Select end date"
      variant="outline"
    />

    <UFieldGroup>
      <AtomsButton
        icon="i-mdi-cash-plus"
        :label="props.id ? 'Edit discount' : 'Create discount'"
        variant="solid"
        size="lg"
        type="submit"
        :loading="props.id ? discountStore.isLoading.update : discountStore.isLoading.create"
        :disabled="props.id ? discountStore.isLoading.update : discountStore.isLoading.create"
      />

      <AtomsButtonDelete
        v-if="props.id"
        :loading="discountStore.isLoading.delete"
        :disabled="discountStore.isLoading.delete"
        @click="deleteDiscount"
      />
    </UFieldGroup>
  </UForm>
</template>
