import BudgetListItems from '@components/list-budgets/ListBudgets';
import { Link } from '@tanstack/react-router';
import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense, useCallback, type MouseEvent } from 'react';
import { button } from 'shared-react/button';



//TODO: ai generated bad catch, lets refactor
export const Route = createLazyFileRoute('/(private)/(home)/')({
  component: RouteComponent,
})



function RouteComponent() {
  const data = Route.useLoaderData();
  const { fullName, email, latestModified } = data ?? {};
  const navigate = Route.useNavigate()

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>)=>{
    const { dataset } = event.currentTarget
    const budgetId = dataset.id;
    if(!budgetId)
      return;
    
    const { color, icon, name } = dataset

    navigate({
      to: '/$budgetId',
      params: {
        budgetId
      },
      search: {
        color,
        icon,
        name
      },
      mask:{
        to: '/$budgetId',
        params:{
          budgetId
        }
      }
    })
  }, [navigate])

  return (
    <main className="flex flex-col justify-between gap-6 h-full px-2 py-5">
      <header className="grid gap-1">
        <h1 className="text-2xl font-semibold">Welcome <span className='text-blue-500'>
            {fullName}
          </span>
        </h1>
        {email && <p className="text-sm text-gray-400">{email}</p>}
      </header>
      <div className='flex flex-col gap-6'>
        <p>Your latest budgets are...</p>
        <ul className='flex flex-col gap-5'>
          <Suspense fallback={'loading'}>
            <BudgetListItems
              onClick={handleClick}
              promise={latestModified}
            />
          </Suspense>
          <li>
            <Link 
              className={'text-cyan-400'} 
              to={'/budgets'} 
            >
              See all...
            </Link>
          </li>
        </ul>
      </div>
      <Link
        to={'/budgets/create'}
        className={button({
          variant: 'primary',
          className: 'sticky'
        })}>
        Create new Budget +
      </Link>
    </main>
  );
}
