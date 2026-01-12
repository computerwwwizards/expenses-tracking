import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)')({
  component: RouteComponent,
  async beforeLoad({context}) {
    const { globalContainer } = context

    //TODO: autheciation unviersal things should be segregated from this specific bearer thing
    //for example, the authetiated state is something indepden if its bearer
    const bearerAuthState = globalContainer.get('bearerAuthState');
    
    //DO we reallay need auth state as global? it seems is nice here except that
    //for this bearer thing we need to use in almost every request
  
    if(!await bearerAuthState.isAuthenticated()){
      throw redirect({
        to: '/login'
      })
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
