import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { Ctx } from '../config/container/types';

export interface User {
  getFullName(): Promise<string>;
  getEmail(): Promise<string>;
  id: string;
  update(fullName?: string, email?: string): Promise<void>
}



export const Route = createRootRouteWithContext<{
  globalContainer: Ctx
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
