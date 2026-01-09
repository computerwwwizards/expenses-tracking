import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/(home)/')({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({ to: '/expenses' })
  },
})

function RouteComponent() {
  return <div>Hello "/(private)/(home)/"!</div>
}
