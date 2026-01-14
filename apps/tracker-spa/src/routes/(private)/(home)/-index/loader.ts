import { getIconsByName } from '@components/icon/Icon'
import type { Ctx } from '@config/container/types'
import type { BudgetCtx } from '../-config/types'

export default async function homeLoader(
  { globalContainer, budgetContainer }: { globalContainer: Ctx; budgetContainer: BudgetCtx },
  deps: { userName?: string; email?: string }
) {
  const user = globalContainer.get('user');
  const budgetQuery = budgetContainer.get('budgetQuery');

  const iconsByName = getIconsByName()

  const latestModified =  budgetQuery
    .getLatestModified()
    .then(budgets=>budgets.map(({ icon, ...rest }) => ({
      ...rest,
      icon: iconsByName[icon]({}),
      iconName: icon
    })));


  const [fullName, email] = await Promise.all([
    deps.userName ? Promise.resolve(deps.userName) : user.getFullName(),
    deps.email ? Promise.resolve(deps.email) : user.getEmail(),
  ]);

  return { fullName, email, latestModified };
}
