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
  promise: Promise<Omit<BasicExpenseGroupDTO, 'createdBy'>>;
  onSubmit: (values: ExpenseGroupFormValues) => Promise<void>;
  onCancel: () => void;
}

function EditFormAwait({ promise, onSubmit, onCancel }: EditFormAwaitProps) {
  //TODO: is possible to make a boolean check that if it is not a promise get the data directly?
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
  const { expensesGroupContainer } = Route.useRouteContext();
 
  const { budgetId } = Route.useParams();
  const navigate = Route.useNavigate();
  const { expenseGroup } = Route.useLoaderData();

  //TODO: get from a loader, what is wrong with u AI

  const handleSubmit = useCallback(async (values: ExpenseGroupFormValues) => {
    await expensesGroupContainer
    .get('expensesGroupsMutations')
    .update(budgetId, values);
  
    await navigate({
      to: '/$budgetId/expenses-groups',
      params: { budgetId },
    });
  }, [expensesGroupContainer,navigate, budgetId]);

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
          promise={expenseGroup}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Suspense>
    </div>
  );
}
