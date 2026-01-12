import { BasicChildContainer } from '@computerwwwizards/dependency-injection'
import type { GlobalServices } from '@config/container/types';
import { createFileRoute } from '@tanstack/react-router'
import type { BudgetContainerServices } from './-config/types';
import plugin from './-config/budget-query';


export const Route = createFileRoute('/(private)/(home)')({
  beforeLoad({
    context
  }) {
    //TODO: does this loads at start?
    //TODO: I mean the code , not only, run, but well I see it is imported
    //in the three so I need to split this as well, manually
    const budgetContainer = new BasicChildContainer<
      BudgetContainerServices, 
      GlobalServices
    >(
      context.globalContainer
    )

    budgetContainer
      .useMocks()
      .use(plugin)
    

    return {
      budgetContainer
    }
  },
})

