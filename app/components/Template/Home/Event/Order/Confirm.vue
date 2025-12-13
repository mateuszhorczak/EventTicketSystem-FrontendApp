<script setup lang="ts">
</script>

<template>
  <div class="relative column-1 md:columns-2 gap-8 space-y-8 *:break-inside-avoid-column *:will-change-transform">
    <OrganismsClientEventDetail />
    <UCard>
      <OrganismsClientEventDiscountView />
    </UCard>
    <div>
      <AtomsSubHeading class="mb-0">
        Selected tickets:
      </AtomsSubHeading>
      <OrganismsClientEventSelectedTickets />
    </div>
  </div>
</template>
