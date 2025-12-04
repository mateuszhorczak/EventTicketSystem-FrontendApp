<script setup lang="ts">
import type { FormFieldProps, SelectMenuProps } from '@nuxt/ui'

interface Props {
  items: SelectMenuProps['items']
  placeholder: SelectMenuProps['placeholder']
  variant: SelectMenuProps['variant']
  label: FormFieldProps['label']
  name: FormFieldProps['name']
  help?: FormFieldProps['help']
}

const props = defineProps<Props>()

const model = defineModel<number>()
</script>

<template>
  <UFormField
    :label="props.label"
    :help="props.help"
    :name="props.name"
  >
    <USelectMenu
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
