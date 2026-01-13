import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/expenses-groups/$expense-group-id/update/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/$budgetId/$expense-group-id/update/"!</div>
}
