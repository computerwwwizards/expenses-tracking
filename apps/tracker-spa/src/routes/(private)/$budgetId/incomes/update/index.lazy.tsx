import { createLazyFileRoute } from '@tanstack/react-router';
import { useActionState, useCallback } from 'react';
import TextField from 'shared-react/text-field';
import Button from 'shared-react/button';
import Spinner from 'shared-react/spinner';
import type { UpdateIncomeDTO } from '../-config/types';

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/incomes/update/',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { budgetId } = Route.useParams();
  const search = Route.useSearch() as { id: string };
  const { incomesContainer } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const [_, action, isPending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const name = formData.get('name')?.toString() ?? '';
      const amount = parseFloat(formData.get('amount')?.toString() ?? '0');

      const values: UpdateIncomeDTO = { name, amount };

      try {
        await incomesContainer
          .get('incomesMutations')
          .updateIncome(budgetId, search.id, values);
        await navigate({
          to: '/$budgetId/incomes',
          params: { budgetId },
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
      to: '/$budgetId/incomes',
      params: { budgetId },
    });
  }, [navigate, budgetId]);

  return (
    <div className="p-4">
      <form action={action} className="grid gap-4">
        <TextField
          name="name"
          label="Income Source"
          placeholder="e.g., Salary"
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
          {isPending ? <Spinner size="sm" /> : 'Update Income'}
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
