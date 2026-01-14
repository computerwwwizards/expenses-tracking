import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(private)/$budgetId/expenses-groups/edit/',
)({
  loaderDeps({ search }: {search : {color?: string; amount?: string; name?: string; icon?: string}}){
    return {
      color: search.color,
      amount: search.amount ? Number(search.amount):  undefined,
      name: search.name,
      icon: search.icon
    }
  },
  async loader({
    deps,
    context,
    params
  }){

    if(Object.values(deps).every(Boolean)){
      const completeDefaultValues = {
        id: params.budgetId,
        ...deps
      } as { id: string; color: string; amount: number; name: string; icon:string }

      return {
        expenseGroup: Promise.resolve(completeDefaultValues)
      }
    }


    return {
      expenseGroup: context.expensesGroupContainer
      .get('expensesGroupsQueries')
      .getGroupExpenseById(params.budgetId)
    }
  }
})


