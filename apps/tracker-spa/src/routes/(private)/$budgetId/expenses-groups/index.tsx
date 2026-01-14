import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/$budgetId/expenses-groups/')({
  async loader({ context, params: { budgetId } }) {
    const loader = await import('./-index/loader')
    return loader.default(
      { expensesGroupContainer: context.expensesGroupContainer },
      { budgetId }
    )
  }
})

