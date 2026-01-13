import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(private)/$budgetId/incomes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/$budgetId/incomes/"!</div>
}
