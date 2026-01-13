import { BasicChildContainer } from '@computerwwwizards/dependency-injection';
import { createFileRoute } from '@tanstack/react-router';
import type { Ctx } from './-config/types';
import mutationsPlugin from './-config/mutations';
import queriesPlugin from './-config/queries';

export const Route = createFileRoute(
  '/(private)/$budgetId/expenses-groups/$expense-group-id'
)({
  async beforeLoad({ context }) {
    const expenseGroupDetailContainer: Ctx = new BasicChildContainer(
      context.expensesGroupContainer
    );

    expenseGroupDetailContainer
      .useMocks()
      .use(queriesPlugin)
      .use(mutationsPlugin);

    return {
      expenseGroupDetailContainer,
    };
  },
});
