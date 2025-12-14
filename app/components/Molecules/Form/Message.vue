<script setup lang="ts">
const messageStore = useMessageStore()
const message = ref('')

const sendMessage = async () => {
  if (!message.value.trim()) return
  await messageStore.createMessage({ text: message.value.trim() })
  message.value = ''
}
</script>

<template>
  <UChatPrompt
    v-model="message"
    variant="soft"
  >
    <UChatPromptSubmit
      icon="i-mdi-send"
      @click="sendMessage"
    />
  </UChatPrompt>
</template>
