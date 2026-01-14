import { createLazyFileRoute } from '@tanstack/react-router';
import { useActionState, useCallback } from 'react';
import TextField from 'shared-react/text-field';
import Button from 'shared-react/button';
import Spinner from 'shared-react/spinner';
import type { UpdateExpenseDTO } from '../-config/types';


export const Route = createLazyFileRoute(
  '/(private)/$budgetId/expenses-groups/$expense-group-id/update/',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { "expense-group-id": groupId } = Route.useParams();
  const search = Route.useSearch() as { id: string };
  const { expenseGroupDetailContainer } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const [, action, isPending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const name = formData.get('name')?.toString() ?? '';
      const amount = parseFloat(formData.get('amount')?.toString() ?? '0');

      const values: UpdateExpenseDTO = { name, amount };

      try {
        await expenseGroupDetailContainer
          .get('expenseGroupDetailMutations')
          .updateExpense(groupId, search.id, values);
        await navigate({
          to: '/$budgetId/expenses-groups/$expense-group-id',
          params: { "expense-group-id": groupId },
        });
        return { values };
      } catch (error: unknown) {
        const internalError = error as Error | undefined
        return {
          errors: [{ id: 'submit', message: internalError?.message ?? 'Failed to update' }],
          values,
        };
      }
    },
    null
  );

  const handleCancel = useCallback(async () => {
    await navigate({
      to: '/$budgetId/expenses-groups/$expense-group-id',
      params: { "expense-group-id": groupId },
    });
  }, [navigate, groupId]);

  return (
    <div className="p-4">
      <form action={action} className="grid gap-4">
        <TextField
          name="name"
          label="Expense Name"
          placeholder="e.g., Lunch"
          disabled={isPending}
          required
        />
        <TextField
          name="amount"
          label="Amount"
          type="number"
          placeholder="0.00"
          disabled={isPending}
          step="0.01"
          required
        />
        <Button disabled={isPending}>
          {isPending ? <Spinner size="sm" /> : 'Update Expense'}
        </Button>
        <Button
          type="button"
          variant="tertiary"
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
