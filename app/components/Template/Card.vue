<script setup lang="ts">
interface Props {
  header?: string
}

const props = defineProps<Props>()
</script>

<template>
  <UCard variant="subtle">
    <template
      v-if="props.header"
      #header
    >
      <AtomsSubHeading>{{ props.header }}</AtomsSubHeading>
    </template>
    <slot />
  </UCard>
</template>
