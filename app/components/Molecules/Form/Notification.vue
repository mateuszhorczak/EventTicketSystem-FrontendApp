<script setup lang="ts">
const messageStore = useMessageStore()
const notificationStore = useNotificationStore()
const params = useRoute().params as { id: number }
const routeId = params.id
await messageStore.fetchMessageById(routeId)

const message = ref('')

const sendNotification = async () => {
  if (!message.value.trim()) return
  await notificationStore.createNotification({ text: message.value?.trim() }, routeId)
  message.value = ''
  await useRouter().push('/admin/messages')
}
</script>

<template>
  <AtomsParagraph>{{ 'User answered: ' + messageStore.singleMessage?.text }}</AtomsParagraph>
  <UChatPrompt
    v-model="message"
    variant="soft"
  >
    <UChatPromptSubmit
      icon="i-mdi-send"
      @click="sendNotification"
    />
  </UChatPrompt>
</template>
