import { getIconsByName } from '@components/icon/Icon'
import type { ExpenseGroupCardOwnProps } from '@components/expense-group-card/ExpenseGroupCard'
import type { Ctx } from '../-config/types'

const nullFn = () => null

export default async function expensesGroupsLoader(
  { expensesGroupContainer }: { expensesGroupContainer: Ctx },
  { budgetId }: { budgetId: string }
): Promise<{ expensesGroups: Promise<Array<ExpenseGroupCardOwnProps>> }> {
  const service = expensesGroupContainer.get('expensesGroupsQueries')

  const expensesGroups =
    service.listByBudgetId(budgetId)
      .then((rawGroupExpenses) => {
        const icons = getIconsByName();
        return rawGroupExpenses.map(({ icon, id, ...data }) => ({
          ...data,
          expenseId: id,
          icon: (icons[icon] ?? nullFn)({}),
          iconName: icon
        }))
      })

  return {
    expensesGroups
  }
}
