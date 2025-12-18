<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

interface Props {
  id?: number | string
}

const props = defineProps<Props>()

const statusStore = useStatusStore()
if (props.id) await statusStore.fetchStatusById(props.id)

const schema = z.object({
  name: z
    .string({ error: 'required' })
    .trim()
    .min(3, { error: 'too short name' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: props.id ? statusStore.singleStatus.name : undefined,
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
      ? statusStore.updateStatus({ ...event.data, id: props.id })
      : statusStore.createStatus({ ...event.data })
  })()

  if (!promise) return
  if (props.id) {
    await useRouter().push('/admin/status')
    return
  }
  if (!(await statusStore.fetchStatuses())) return
}

const deleteStatus = async () => {
  if (!props.id) return
  if (!(await statusStore.deleteStatus(props.id))) return
  if (!(await statusStore.fetchStatuses())) return
  await useRouter().push('/admin/status')
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
        icon="i-mdi-list-status"
        :label="props.id ? 'Edit status' : 'Create status'"
        variant="solid"
        size="lg"
        type="submit"
        :loading="props.id ? statusStore.isLoading.update : statusStore.isLoading.create"
        :disabled="props.id ? statusStore.isLoading.update : statusStore.isLoading.create"
      />

      <AtomsButtonDelete
        v-if="props.id"
        :loading="statusStore.isLoading.delete"
        :disabled="statusStore.isLoading.delete"
        @click="deleteStatus"
      />
    </UFieldGroup>
  </UForm>
</template>
