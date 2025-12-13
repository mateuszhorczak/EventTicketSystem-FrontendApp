<script setup lang="ts">
import type { FormFieldProps, InputNumberProps } from '@nuxt/ui'

interface Props {
  placeholder: InputNumberProps['placeholder']
  variant: InputNumberProps['variant']
  min?: InputNumberProps['min']
  max?: InputNumberProps['max']
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
    <UInputNumber
      v-model="model"
      :min="props.min"
      :max="props.max"
      :step="0.01"
      :placeholder="props.placeholder"
      :variant="props.variant"
      increment-icon="i-mdi-plus"
      decrement-icon="i-mdi-minus"
      :format-options="{
        style: 'percent',
      }"
    />
  </UFormField>
</template>
