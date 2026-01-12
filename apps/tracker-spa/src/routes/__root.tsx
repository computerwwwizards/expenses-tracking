import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { Ctx } from '../config/container/types';



export const Route = createRootRouteWithContext<{
  globalContainer: Ctx
}>()({
  component: RootComponent,
})

function RootComponent() {  
  return (
    <div className='h-screen'>
      <Outlet />
    </div>
  )
}
