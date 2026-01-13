import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/$budgetId/expenses-groups/$expense-group-id/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/(private)/$budgetId/$expense-group-id/"!</div>
}
