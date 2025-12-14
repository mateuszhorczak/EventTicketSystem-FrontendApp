<script setup lang="ts">
const authToken = useAuthToken()
const notificationStore = useNotificationStore()
if (authToken.isLoggedIn) await notificationStore.fetchNotifications()

const handleClose = async (itemId: number) => {
  await notificationStore.readNotification(itemId)
  await notificationStore.fetchNotifications()
}
</script>

<template>
  <div
    v-if="useAuthToken().isLoggedIn"
    class="space-y-2"
  >
    <UAlert
      v-for="item in notificationStore.notifications"
      :key="item.id"
      color="warning"
      variant="outline"
      :title="`Admin: ${item.text}`"
      :close="{
        label: 'Close',
        icon: 'i-mdi-close',
        color: 'warning',
        onClick: () => handleClose(item.id),
      }"
    />
  </div>
</template>
