import BudgetListItems from '@components/list-budgets/ListBudgets';
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Suspense, useCallback, type MouseEvent } from 'react';
import { button } from 'shared-react/button'

export const Route = createLazyFileRoute('/(private)/(home)/budgets/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { budgets } = Route.useLoaderData();
  const navigate = useNavigate({
    from: '/budgets'
  })

  const handleEdit = useCallback((event: MouseEvent<HTMLButtonElement>)=>{
    const budgetId = event.currentTarget.dataset.id;

    if(!budgetId)
      return;

    navigate({
      to: 'edit/$budgetId',
      params: {
        budgetId
      }
    })
  }, []);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>)=>{
    const budgetId = event.currentTarget.dataset.id;

    if(!budgetId)
      return;
  
    navigate({
      to: '/$budgetId',
      params: {
        budgetId
      }
    })
  }, [])

  return <main className='h-screen flex flex-col gap-5 px-3 py-5'>
    <h2 className='font-extrabold text-2xl'>Your <span className='text-blue-500'>Budgets</span></h2>
    <ul className='flex-1 flex flex-col px-5 gap-4 overflow-auto pb-15'>
      <Suspense fallback={'loading'}>
      <BudgetListItems
        promise={budgets}
        onEdit={handleEdit}
        onClick={handleClick}
      />
      </Suspense>
     
    </ul>
    <Link to={'/budgets/create'} className={button({
      variant: 'secondary',
      className: 'sticky bottom-5'
    })}>
      Create new Budget +
    </Link>
  </main>
}
