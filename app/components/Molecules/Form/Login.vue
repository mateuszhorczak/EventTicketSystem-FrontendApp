<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const authStore = useAuth()
const router = useRouter()

const schema = z.object({
  email: z
    .email({ error: 'Invalid email' })
    .trim()
    .min(1, { error: 'required' }),
  password: z
    .string({ error: 'required' })
    .trim()
    .min(1, { error: 'required' }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!event.data.email || !event.data.password) {
    return
  }

  const loginPromise = authStore.login(event.data.email, event.data.password)
  if (!(await loginPromise)) return
  await router.push('/')
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <AtomsInput
      v-model:val="state.email"
      label="Email"
      name="email"
      icon="i-mdi-email"
      placeholder="Enter email"
      variant="outline"
      help=""
    />

    <AtomsInputPassword
      v-model:val="state.password"
      label="Password"
      name="password"
      icon="i-mdi-lock"
      placeholder="Enter password"
      variant="outline"
    />

    <AtomsButton
      icon="i-mdi-account-arrow-right"
      label="Login"
      variant="solid"
      size="lg"
      type="submit"
      :loading="authStore.isLoading"
      :disabled="authStore.isLoading"
    />
  </UForm>
</template>
