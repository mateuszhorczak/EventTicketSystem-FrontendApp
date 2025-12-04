<script setup lang="ts">
import type { FormFieldProps, SelectProps } from '@nuxt/ui'

interface Props {
  items: SelectProps['items']
  placeholder: SelectProps['placeholder']
  variant: SelectProps['variant']
  label: FormFieldProps['label']
  name: FormFieldProps['name']
  help?: FormFieldProps['help']
}

const props = defineProps<Props>()

const model = defineModel<number>('val')
</script>

<template>
  <UFormField
    :label="props.label"
    :help="props.help"
    :name="props.name"
  >
    <USelect
      v-model="model"
      value-key="id"
      :items="props.items"
      :placeholder="props.placeholder"
      :variant="props.variant"
      arrow
      :ui="{ content: 'min-w-fit' }"
    />
  </UFormField>
</template>
