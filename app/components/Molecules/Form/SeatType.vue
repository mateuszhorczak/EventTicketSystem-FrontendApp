<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

interface Props {
  id?: number
}

const props = defineProps<Props>()

const seatTypeStore = useSeatTypeStore()
if (props.id) await seatTypeStore.fetchSeatTypeById(props.id)

const schema = z.object({
  name: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short name' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: props.id ? seatTypeStore.singleSeatType.name : undefined,
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
    await useRouter().push('/admin/seat-types')
    return
  }
  if (!(await seatTypeStore.fetchSeatTypes())) return
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
      icon="i-mdi-seat"
      :label="props.id ? 'Edit seat type' : 'Create seat type'"
      variant="solid"
      size="lg"
      type="submit"
      :loading="seatTypeStore.isLoading"
      :disabled="seatTypeStore.isLoading"
    />
  </UForm>
</template>
