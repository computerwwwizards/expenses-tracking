import { getIconsByName } from '@components/icon/Icon'
import type { Ctx } from '@config/container/types'

export default async function budgetIdLoader(
  { globalContainer }: { globalContainer: Ctx },
  deps: { color?: string; icon?: string; name?: string }
) {
  const { color, icon, name } = deps
  const workspaceService = globalContainer.get('workspace')
  
  //TODO: we need a way to avoid triggering the requests using search params
  const [budgetName, budgetColor, budgetIcon] = await Promise.all([
    name ? Promise.resolve(name) : workspaceService.getName(),
    color ? Promise.resolve(color) : workspaceService.getColor(),
    icon ? Promise.resolve(icon) : workspaceService.getIcon()
  ])

  const iconsByName = getIconsByName()

  console.log({budgetIcon})

  return {
    budgetName,
    color: budgetColor,
    icon: iconsByName[budgetIcon]({})
  }
}
