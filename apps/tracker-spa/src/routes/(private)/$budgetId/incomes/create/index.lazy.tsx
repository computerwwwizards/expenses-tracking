import { createLazyFileRoute } from '@tanstack/react-router';
import { useCallback } from 'react';
import TextField from 'shared-react/text-field';
import Button from 'shared-react/button';
import Spinner from 'shared-react/spinner';
import { useActionState } from 'react';
import type { CreateIncomeDTO } from '../-config/types';

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/incomes/create/',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { budgetId } = Route.useParams();
  const { incomesContainer } = Route.useRouteContext() as any;
  const navigate = Route.useNavigate();
  const [, action, isPending] = useActionState(
    async (_prev: any, formData: FormData) => {
      const name = formData.get('name')?.toString() ?? '';
      const amount = parseFloat(formData.get('amount')?.toString() ?? '0');

      const values: CreateIncomeDTO = { name, amount };

      try {
        await incomesContainer
          .get('incomesMutations')
          .createIncome(budgetId, values);
        await navigate({
          to: '/$budgetId/incomes',
          params: { budgetId },
        });
        return { values };
      } catch (error: any) {
        return {
          errors: [{ id: 'submit', message: error?.message ?? 'Failed to create' }],
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
          {isPending ? <Spinner size="sm" /> : 'Create Income'}
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
