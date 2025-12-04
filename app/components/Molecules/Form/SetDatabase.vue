<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const databaseStore = useDatabaseStore()

const validDatabases: DatabaseType[] = [
  'relational',
  'obj-rel',
  'objective',
  'nosql'
]

const schema = z.object({
  database: z
    .string({ error: 'required' })
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  database: undefined,
})

const validate: (state: Partial<Schema>) => FormError[] = (state) => {
  const { error } = schema.safeParse(state)
  return handleValidationError(error)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  databaseStore.setDatabase(event.data.database)
  createSuccessToast({
    title: 'Database change successful',
    description: `Current database is ${event.data.database}`
  })

}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="space-y-4 mt-2"
    @submit="onSubmit"
  >
    <UFormField label="Select database" name="database">
      <USelect
        v-model="state.database"
        value-key="id"
        :items="validDatabases"
        placeholder="Select database"
        variant="outline"
        arrow
        :ui="{ content: 'min-w-fit' }"
      />
    </UFormField>

    <AtomsButton
      icon="i-mdi-database-edit"
      label="Set database"
      variant="solid"
      size="lg"
      type="submit"
    />
  </UForm>
</template>
