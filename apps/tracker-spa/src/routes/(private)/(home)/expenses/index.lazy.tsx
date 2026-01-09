import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(private)/(home)/expenses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/(home)/expenses/"!</div>
}
