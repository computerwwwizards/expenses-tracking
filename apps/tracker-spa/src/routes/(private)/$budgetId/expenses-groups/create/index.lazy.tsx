import ExpenseGroupForm, { type ExpenseGroupFormValues } from '@components/expense-group-form/ExpenseGroupForm';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useCallback } from 'react';

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/expenses-groups/create/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { expensesGroupContainer } = Route.useRouteContext() as any;
  const { budgetId } = Route.useParams();
  const navigate = Route.useNavigate();

  const handleSubmit = useCallback(async (values: ExpenseGroupFormValues) => {
    const mutations = expensesGroupContainer.get('expensesGroupsMutations') as any;
    if (mutations && typeof mutations.create === 'function') {
      await mutations.create(values);
    }
    await navigate({
      to: '/$budgetId/expenses-groups',
      params: { budgetId },
    });
  }, [expensesGroupContainer, navigate, budgetId]);

  const handleCancel = useCallback(async () => {
    await navigate({
      to: '/$budgetId/expenses-groups',
      params: { budgetId },
    });
  }, [navigate, budgetId]);

  return (
    <div className="p-3">
      <ExpenseGroupForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
