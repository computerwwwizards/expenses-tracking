import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/(private)/(home)/budgets/edit/$budgetId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/(home)/budgets/edit/$budgetId"!</div>
}
