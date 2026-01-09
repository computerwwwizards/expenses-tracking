import { BasicChildContainer } from '@computerwwwizards/dependency-injection';
import type { GlobalServices } from '@config/container/types';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import type { LoginContainerServices } from './-config/types';
import plugin from './-config/login-service';




export const Route = createFileRoute('/login')({
  component: RouteComponent,
  async beforeLoad({ context }) {
    const isAuth = await context.globalContainer.get('bearerAuthState').isAuthenticated()
    
    if(isAuth){
      throw redirect({
        to: '/'
      })
    }

    const container = new BasicChildContainer<
      LoginContainerServices,
      GlobalServices
    >(context.globalContainer);

    container
      .useMocks()
      .use(plugin)

    return { container };
  }
})

function RouteComponent() {
  return <Outlet />
}
