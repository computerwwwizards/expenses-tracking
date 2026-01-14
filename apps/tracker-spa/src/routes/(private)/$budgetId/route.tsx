import { createFileRoute, Outlet } from '@tanstack/react-router'
import type { CSSProperties } from 'react';

export const Route = createFileRoute('/(private)/$budgetId')({
  component: RouteComponent,
  loaderDeps({ search }) {
    return search
  },
  async loader({ context, deps }) {
    const loader = await import('./-route/loader')
    return await loader.default(
      { globalContainer: context.globalContainer },
      deps as { color?: string; icon?: string; name?: string }
    )
  },
})

function RouteComponent() {
  const { 
    budgetName,
    color,
    icon
 } = Route.useLoaderData();

  return <main className='py-6 flex flex-col justify-between gap-6 h-full'>
    <div 
      style={{
        '--custom-color': color
      } as CSSProperties } 
      className='flex text-(--custom-color)' 
    >
      {icon}
      <p>{budgetName}</p>
    </div>
    <Outlet />
  </main>
}
