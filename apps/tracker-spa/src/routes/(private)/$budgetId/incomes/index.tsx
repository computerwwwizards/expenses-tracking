import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/$budgetId/incomes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/$budgetId/incomes/"!</div>
}
