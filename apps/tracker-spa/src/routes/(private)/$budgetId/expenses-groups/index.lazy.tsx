import { ExpenseGroupCard, type ExpenseGroupCardOwnProps, type ExpenseGroupCardProps } from '@components/expense-group-card/ExpenseGroupCard';
import { createLazyFileRoute, Link, useSearch } from '@tanstack/react-router'
import { Suspense, use, useState, type MouseEvent } from 'react';
import { button } from 'shared-react/button';

export const Route = createLazyFileRoute(
  '/(private)/$budgetId/expenses-groups/',
)({
  component: RouteComponent,
})

interface ExpenseGroupCardsAwaitableProps extends Partial<ExpenseGroupCardProps> {
  promise: Promise<Array<ExpenseGroupCardOwnProps>>;
}



function RouteComponent() {
  const { expensesGroups } = Route.useLoaderData();
  const {  expensesGroupContainer } = Route.useRouteContext();
  const search = Route.useSearch()
  const navigate = Route.useNavigate();

  const handleEdit = async (event: MouseEvent<HTMLButtonElement>)=>{
    const { id } = event.currentTarget.dataset;

    if(!id)
      return;

    await navigate({
      to: 'edit',
      search: { id },
    })
  }

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>)=>{
    const { id } = event.currentTarget.dataset;

    if(!id)
      return;

    await expensesGroupContainer
      .get('expensesGroupsMutations')
      .delete(id)
    } 

  const handleClick = async (event: MouseEvent<HTMLElement>)=>{
    const { id } = event.currentTarget.dataset

    if(!id)
      return

    await navigate({
      to: '$expense-group-id',
      params: {
        "expense-group-id": id
      },
      search,
      mask: {
        to: '$expense-group-id',
        params: {
          "expense-group-id": id
        }
      }
    })
  }

  return <div className="flex flex-col h-full overflow-hidden">
    <ul className="flex-1 overflow-y-auto">
      <Suspense fallback="loading">
        <ExpenseGroupCardAwaitable 
          promise={expensesGroups}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onClick={handleClick}
        />
      </Suspense>
    </ul>
    <Link
      from='/$budgetId/expenses-groups'
      className={button({
        variant: 'secondary'
      })} 
      to="create"
      search={search}
      mask={{
        to:"create"
      }}
    >
      Create expense group
    </Link>
  </div>
}


function ExpenseGroupCardAwaitable({
  promise,
  onDelete,
  ...props
}: ExpenseGroupCardsAwaitableProps){
  const data = use(promise);
  const [resolvedExpenses, setResolvedExpenses] = useState(data);

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>)=>{
    const { id } = event.currentTarget.dataset

    if(!id)
      return;

    const newEvent = event;
    newEvent.currentTarget = event.currentTarget;

    await onDelete?.(newEvent);

    setResolvedExpenses(prev => prev.filter(expense => expense.expenseId !== id))
  }

  return resolvedExpenses.map((expenseProps)=><ExpenseGroupCard 
    {...expenseProps}
    {...props}
    onDelete={handleDelete}
  />)
}