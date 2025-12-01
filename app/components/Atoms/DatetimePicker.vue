<script setup lang="ts">
import { type CalendarDate, Time } from '@internationalized/date'
import type { ButtonProps, FormFieldProps } from '@nuxt/ui'

interface Props {
  label: FormFieldProps['label']
  name: FormFieldProps['name']
  help?: FormFieldProps['help']
  icon?: ButtonProps['icon']
  variant: ButtonProps['variant']
}

const props = defineProps<Props>()
const modelDate = defineModel<CalendarDate>('date')
const modelTime = defineModel<Time>('time')

const defaultTimeValue = shallowRef(new Time(16, 30, 0))
const inputDateRef = useTemplateRef('inputDateRef')
</script>

<template>
  <UFormField :label="props.label" :help="props.help" :name="props.name">
    <UFieldGroup>
      <UInputDate ref="inputDateRef" v-model="modelDate">
        <template #leading>
          <UPopover :reference="inputDateRef?.inputsRef[3]?.$el">
            <UButton
              variant="link"
              size="md"
              icon="i-mdi-calendar"
              aria-label="Select date"
              class="px-0"
            />
            <template #content>
              <UCalendar v-model="modelDate" class="p-2" />
            </template>
          </UPopover>
        </template>
      </UInputDate>

      <UInputTime v-model="modelTime" :hour-cycle="24" :default-value="defaultTimeValue" />
    </UFieldGroup>
  </UFormField>
</template>
