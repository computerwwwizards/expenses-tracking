import ExpenseGroupForm, { type ExpenseGroupFormValues } from '@components/expense-group-form/ExpenseGroupForm';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense, use, useCallback } from 'react';
import type { BasicExpenseGroupDTO } from '../-config/types';

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/expenses-groups/edit/',
)({
  component: RouteComponent,
})

interface EditFormAwaitProps {
  promise: Promise<BasicExpenseGroupDTO>;
  onSubmit: (values: ExpenseGroupFormValues) => Promise<void>;
  onCancel: () => void;
}

function EditFormAwait({ promise, onSubmit, onCancel }: EditFormAwaitProps) {
  const group = use(promise);

  return (
    <ExpenseGroupForm
      defaultValues={group}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

function RouteComponent() {
  const { expensesGroupContainer } = Route.useRouteContext() as any;
  const search = Route.useSearch() as { id: string };
  const { budgetId } = Route.useParams();
  const navigate = Route.useNavigate();

  const expenseGroupPromise = expensesGroupContainer.get('expensesGroupsQueries').getGroupExpenseById(search.id);

  const handleSubmit = useCallback(async (values: ExpenseGroupFormValues) => {
    await expensesGroupContainer.get('expensesGroupsMutations').update(search.id, values as any);
    await navigate({
      to: '/$budgetId/expenses-groups',
      params: { budgetId },
    });
  }, [expensesGroupContainer, search.id, navigate, budgetId]);

  const handleCancel = useCallback(async () => {
    await navigate({
      to: '/$budgetId/expenses-groups',
      params: { budgetId },
    });
  }, [navigate, budgetId]);

  return (
    <div className="p-3">
      <Suspense fallback={<div>Loading...</div>}>
        <EditFormAwait
          promise={expenseGroupPromise}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Suspense>
    </div>
  );
}
