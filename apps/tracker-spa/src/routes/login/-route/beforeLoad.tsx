import { BasicChildContainer } from "@computerwwwizards/dependency-injection";
import type { Ctx, GlobalServices } from "@config/container/types";
import plugin from "../-config/login-service";
import type { LoginContainerServices } from "../-config/types";
import { redirect } from '@tanstack/react-router'

export default async function beforeLoad(globalContainer: Ctx) {
  const isAuth = await globalContainer.get('bearerAuthState').isAuthenticated()

  if (isAuth) {
    throw redirect({
      to: '/'
    })
  }

  const container = new BasicChildContainer<
    LoginContainerServices,
    GlobalServices
  >(globalContainer);

  return container
    .useMocks()
    .use(plugin)

}