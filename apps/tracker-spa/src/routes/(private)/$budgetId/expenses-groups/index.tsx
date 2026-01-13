import { type ExpenseGroupCardOwnProps } from '@components/expense-group-card/ExpenseGroupCard'
import { createFileRoute } from '@tanstack/react-router'

const nullFn = ()=>null;

export const Route = createFileRoute('/(private)/$budgetId/expenses-groups/')({
  async loader({ context, params: { budgetId } }){
    const service = context
      .expensesGroupContainer
      .get('expensesGroupsQueries');
    
    const expensesGroups: Promise<Array<ExpenseGroupCardOwnProps>> = Promise.all([
      service
      .listByBudgetId(budgetId),
      import('@components/icon/Icon')
    ]).then(([rawGroupExpenses, { getIconsByName }])=>{
      const icons = getIconsByName();

      return rawGroupExpenses.map(({icon , id, ...data})=>({
        ...data,
        expenseId: id,
        icon: (icons[icon] ?? nullFn)({})
      }))
    })

    return {
      expensesGroups
    }
  }
})

