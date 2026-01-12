import { BasicChildContainer } from '@computerwwwizards/dependency-injection'
import type { GlobalServices } from '@config/container/types'
import { createFileRoute } from '@tanstack/react-router'

interface ExpenseSummary{
  getTotal(workspaceId: string): Promise<number>;
  listAllGroups(workspaceId: string):Promise<Array<{
    groupName: string;
    color: string;
    amount: number;
  }>>
}

interface ExpensesSummaryServices{
  expenseSummary: ExpenseSummary
}

export const Route = createFileRoute('/(private)/$budgetId/')({
  beforeLoad({
    context
  }) {
    const summaryContainer = new BasicChildContainer<
      ExpensesSummaryServices,
      GlobalServices
    >(
      context.globalContainer
    )
    
    return {
      summaryContainer
    }
  },
  loader({
    context,
    params
  }) {
    return {
      expenses: context
        .summaryContainer
        .get('expenseSummary')
        .listAllGroups(params.budgetId)
    }
  },
})


