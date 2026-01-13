import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(private)/$budgetId/expenses-groups/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/$budgetId/expenses-group/edit/"!</div>
}
