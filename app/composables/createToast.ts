import type { ToastProps } from '@nuxt/ui'

export const createToast = (toastData: ToastProps) => {
  if (import.meta.client) {
    useToast().add(toastData)
  }
}

export const createSuccessToast = (toastData: ToastProps) =>
  createToast({
    color: 'success',
    icon: 'i-mdi-check-circle-outline',
    ...toastData,
  })

export const createErrorToast = (toastData: ToastProps) =>
  createToast({
    color: 'error',
    icon: 'i-mdi-exclamation-thick',
    ...toastData,
  })
