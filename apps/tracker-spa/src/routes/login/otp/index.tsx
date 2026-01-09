import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/otp/')({
  async beforeLoad({search, context}){
    // This could not lead to problems lie email injection?
    const { email, eta } = search as { email?: string; eta?: number };

    return {
      email: email ?? await context.globalContainer.get('user').getEmail(),
      eta
    }
  },
})
