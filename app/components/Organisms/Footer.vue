<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'

const columns: FooterColumn[] = [
  {
    label: 'Authors',
    children: [
      {
        label: 'Agnieszka Piruta',
        to: '',
        target: '_blank',
      },
      {
        label: 'Igor Ratasiewicz',
        to: '',
        target: '_blank',
      },
    ],
  },
  {
    label: 'Authors',
    children: [
      {
        label: 'Konrad Topczewski',
        to: '',
        target: '_blank',
      },
      {
        label: 'Mateusz Horczak',
        to: '',
        target: '_blank',
      },
    ],
  },
]
</script>

<template>
  <UFooter>
    <UFooterColumns :columns="columns">
      <template #right>
        <div class="flex flex-col gap-2">
          <AtomsButton
            label="Frontend app"
            icon="i-mdi-github"
            variant="link"
            size="xl"
            to="https://github.com/mateuszhorczak/EventTicketSystem-FrontendApp"
          />
          <AtomsButton
            label="Backend app"
            icon="i-mdi-github"
            variant="link"
            size="xl"
            to="https://github.com/Isia07/BazyDanych"
          />
        </div>
      </template>
    </UFooterColumns>
  </UFooter>
</template>
