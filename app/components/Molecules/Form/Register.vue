<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
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
  password2: z
    .string({ error: 'required' })
    .trim()
    .min(1, { error: 'required' }),
})
  .refine(data => data.password === data.password2, {
    error: 'Passwords not match',
    path: ['password2'],
  })

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  password2: undefined,
})

const validate: (state: Partial<Schema>) => FormError[] = (state) => {
  const { error } = schema.safeParse(state)
  return handleValidationError(error)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const registerPromise = authStore.register({
    email: event.data.email,
    password: event.data.password,
  })
  if (!(await registerPromise)) return
  await router.push('/login')
}
</script>

<template>
  <UForm
    :state="state"
    :validate="validate"
    class="space-y-4 mt-2"
    @submit="onSubmit"
  >
    <AtomsInput
      v-model:val="state.email"
      label="Email"
      name="email"
      placeholder="Enter email"
      icon="i-mdi-email"
      variant="outline"
    />

    <AtomsPasswordInputValidation
      v-model:val="state.password"
      label="Password"
      name="password"
      icon="i-mdi-lock"
      variant="outline"
      placeholder="Enter password"
    />

    <AtomsPasswordInput
      v-model:val="state.password2"
      label="Repeat password"
      name="password2"
      icon="i-mdi-lock-check"
      placeholder="Enter password"
      variant="outline"
    />

    <AtomsButton
      icon="i-mdi-account-arrow-up"
      label="Register"
      variant="solid"
      size="lg"
      type="submit"
      :loading="authStore.isLoading"
      :disabled="authStore.isLoading"
    />
  </UForm>
</template>
