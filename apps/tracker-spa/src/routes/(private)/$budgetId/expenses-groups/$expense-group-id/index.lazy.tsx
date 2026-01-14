import { createLazyFileRoute } from '@tanstack/react-router';
import { Suspense, use, useState, type MouseEvent } from 'react';
import type { BasicExpenseDTO } from '../-config/types';

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/expenses-groups/$expense-group-id/',
)({
  component: RouteComponent,
});

interface ExpensesListAwaitProps {
  promise: Promise<Array<BasicExpenseDTO>>;
  onEdit: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onDelete: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

function ExpensesListAwait({
  promise,
  onEdit,
  onDelete,
}: ExpensesListAwaitProps) {
  const expenses = use(promise);
  const [resolvedExpenses, setResolvedExpenses] = useState(expenses);

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;
    if (!id) return;

    await onDelete(event);
    setResolvedExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <ul className="flex-1 overflow-y-auto">
      {resolvedExpenses.map((expense) => (
        <li
          key={expense.id}
          className="p-4 border-b border-gray-700 flex justify-between items-center hover:bg-zinc-800"
          data-id={expense.id}
        >
          <div>
            <p className="font-semibold">{expense.name}</p>
            <p className="text-sm text-gray-400">S/. {expense.amount.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              data-id={expense.id}
              className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              data-id={expense.id}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function RouteComponent() {
  const { "expense-group-id": groupId } = Route.useParams();
  const { expenseGroupDetailContainer } = Route.useRouteContext();
  const navigate = Route.useNavigate();

  const expensesPromise = expenseGroupDetailContainer
    .get('expenseGroupDetailQueries')
    .listExpensesByGroupId(groupId);

  const handleEdit = async (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;
    if (!id) return;

    await navigate({
      to: 'update',
      search: { id },
    });
  };

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;
    if (!id) return;

    await expenseGroupDetailContainer
      .get('expenseGroupDetailMutations')
      .deleteExpense(groupId, id);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <Suspense fallback={<div>Loading expenses...</div>}>
        <ExpensesListAwait
          promise={expensesPromise}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Suspense>
      <button
        onClick={async () => {
          await navigate({
            to: 'create',
          });
        }}
        className="p-3 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
      >
        Create Expense
      </button>
    </div>
  );
}
