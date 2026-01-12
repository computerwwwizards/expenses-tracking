import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/expenses/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/(with-tabs)/$budgetId/expenses/"!</div>
}
