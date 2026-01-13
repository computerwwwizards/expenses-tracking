import { createFileRoute, Outlet } from '@tanstack/react-router'
import type { CSSProperties } from 'react';

export const Route = createFileRoute('/(private)/$budgetId')({
  component: RouteComponent,
  async loader({ context }) {
    const workspaceService = context.globalContainer.get('workspace')
    //TODO: we need a way to avoid triggering the requests using search params
    const [budgetName, color, icon] = await Promise.all([
      workspaceService.getName(),
      workspaceService.getColor(),
      workspaceService.getIcon()
    ]);

    const { getIconsByName } = await import('@components/icon/Icon')
    const iconsByName = getIconsByName();

    return {
      budgetName,
      color,
      icon: iconsByName[icon]({})
    }
  },
})

function RouteComponent() {
  const { 
    budgetName,
    color,
    icon
 } = Route.useLoaderData();

  return <main className='flex flex-col justify-between gap-6 h-screen'>
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
