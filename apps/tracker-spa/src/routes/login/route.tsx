import { createFileRoute, Outlet } from '@tanstack/react-router'



export const Route = createFileRoute('/login')({
  component: RouteComponent,
  async beforeLoad({ context }) {
    const module = await import('./-route/beforeLoad');

    const container = await module.default(context.globalContainer)

    return { container };
  }
})

function RouteComponent() {
  return <Outlet />
}
