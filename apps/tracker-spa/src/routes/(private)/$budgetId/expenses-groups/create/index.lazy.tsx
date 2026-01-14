import ExpenseGroupForm, { type ExpenseGroupFormValues } from '@components/expense-group-form/ExpenseGroupForm';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useCallback } from 'react';

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/expenses-groups/create/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { expensesGroupContainer } = Route.useRouteContext();
  
  const navigate = Route.useNavigate();

  const handleSubmit = useCallback(async (values: ExpenseGroupFormValues) => {
    const mutations = expensesGroupContainer.get('expensesGroupsMutations');

    const { id } = await mutations.create(values);
    
    await navigate({
      to: '/$budgetId/expenses-groups/$expense-group-id',
      params: {
        "expense-group-id": id
      },
      mask: {
        to: '/$budgetId/expenses-groups/$expense-group-id',
        params: {
          "expense-group-id": id
        }
      }
    });
  }, [expensesGroupContainer, navigate]);

  const handleCancel = useCallback(async () => {
    await navigate({
      to: '/$budgetId/expenses-groups',
    });
  }, [navigate]);

  return (
    <div className="p-3">
      <ExpenseGroupForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
