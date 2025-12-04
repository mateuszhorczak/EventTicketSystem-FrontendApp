import type { FetchError } from 'ofetch'

export default function (error: unknown, title: string) {
  console.error('Unexpected error:', error)
  const statusMessage
    = (error as FetchError)?.data?.error || `${error}`

  createErrorToast({
    title,
    description: statusMessage,
  })

  return { data: null }
}
