import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/$budgetId/incomes/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/$budgetId/incomes/create/"!</div>
}
