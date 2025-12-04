<script setup lang="ts">
import type { FormFieldProps, InputProps } from '@nuxt/ui'

interface Props {
  icon: InputProps['icon']
  placeholder: InputProps['placeholder']
  variant: InputProps['variant']
  label: FormFieldProps['label']
  name: FormFieldProps['name']
  help?: FormFieldProps['help']
}

const props = defineProps<Props>()

const model = defineModel<string>('val', { default: '' })
</script>

<template>
  <UFormField
    :label="props.label"
    :help="props.help"
    :name="props.name"
  >
    <UInput
      v-model="model"
      :icon="props.icon"
      :placeholder="props.placeholder"
      :variant="props.variant"
      class="w-full"
    />
  </UFormField>
</template>
