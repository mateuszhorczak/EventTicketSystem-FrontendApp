import type { FormError } from '@nuxt/ui'
import type { ZodError } from 'zod'

export default function (
  error: ZodError | undefined,
): FormError[] {
  if (!error) return []
  return error?.issues.map((e) => {
    const rawMessage = e.message ?? 'Error during validation'

    return {
      name: e.path[0] as string,
      message: rawMessage,
    }
  })
}
