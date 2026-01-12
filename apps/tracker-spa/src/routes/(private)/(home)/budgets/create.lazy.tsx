import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(private)/(home)/budgets/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/(home)/budgets/create"!</div>
}
