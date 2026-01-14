import { BasicChildContainer } from '@computerwwwizards/dependency-injection'
import { createFileRoute } from '@tanstack/react-router'
import type { Ctx } from './-config/types'
import mutationsPlugin from './-config/mutations';
import queriesPlugin from './-config/queries';

export const Route = createFileRoute('/(private)/$budgetId/expenses-groups')({
  async beforeLoad({ context }) {
    const expensesGroupContainer: Ctx = new BasicChildContainer(
      context.globalContainer
    );

    expensesGroupContainer
      .useMocks()
      .use(mutationsPlugin)
      .use(queriesPlugin)
    
    return {
      expensesGroupContainer
    }
  },
})

