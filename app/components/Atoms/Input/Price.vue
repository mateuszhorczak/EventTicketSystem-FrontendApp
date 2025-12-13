<script setup lang="ts">
import type { FormFieldProps, InputNumberProps } from '@nuxt/ui'

interface Props {
  placeholder: InputNumberProps['placeholder']
  variant: InputNumberProps['variant']
  label: FormFieldProps['label']
  name: FormFieldProps['name']
  help?: FormFieldProps['help']
  min?: InputNumberProps['min']
  max?: InputNumberProps['max']
}

const props = defineProps<Props>()
const model = defineModel<number>('val', { default: 0 })
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
      increment-icon="i-mdi-plus"
      decrement-icon="i-mdi-minus"
      :step="0.01"
      :format-options="{
        style: 'currency',
        currency: 'PLN',
        currencyDisplay: 'code',
        currencySign: 'accounting',
      }"
    />
  </UFormField>
</template>
