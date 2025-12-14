<script setup lang="ts">
const messageStore = useMessageStore()
const route = useRoute()
const isAdminPanel = computed(() => route.path.includes('admin'))
isAdminPanel.value ? await messageStore.fetchAllMessages() : await messageStore.fetchMessages()
const actions = ref([
  {
    label: 'Answer this message',
    icon: 'i-mdi-send',
    onClick: (e: MouseEvent, message: { id: string }) => useRouter().push(`/admin/messages/${message.id}`),
  },
])
const messageArray = computed(() => isAdminPanel.value ? transformMessageArray(messageStore.allMessages) : transformMessageArray(messageStore.messages))
</script>

<template>
  <UChatMessages>
    <UChatMessage
      v-for="(message, index) in messageArray"
      :key="index"
      v-bind="message"
      :actions="isAdminPanel ? actions : []"
    />
  </UChatMessages>
</template>
