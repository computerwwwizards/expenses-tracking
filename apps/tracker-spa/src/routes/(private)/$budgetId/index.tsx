import { BasicChildContainer } from '@computerwwwizards/dependency-injection'
import type { GlobalServices } from '@config/container/types'
import { createFileRoute } from '@tanstack/react-router'
import type { ExpensesSummaryServices } from './-config/expenses-summary'
import plugin from './-config/expenses-summary'




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
    
    summaryContainer
      .useMocks()
      .use(plugin)

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


