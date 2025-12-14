declare global {
  export interface NewNotification {
    text: string
  }

  export type NotificationType = NewNotification & { id: number }
  export type NotificationListResponse = ApiResponse<NotificationType[]>
  export type NotificationResponse = ApiResponse<NotificationType>
}
