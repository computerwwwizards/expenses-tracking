import ExpensesSummary, { type ExpensesSummaryProps } from '@components/expenses-summary/ExpenseSummary'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Suspense, use } from 'react'
import { button } from 'shared-react/button'

export const Route = createLazyFileRoute('/(private)/$budgetId/')({
  component: RouteComponent,
})

interface ExpensesSummaryAwaitProps {
  promise: Promise<ExpensesSummaryProps['expenses']>
}

function ExpensesSummaryAwait({ promise }: ExpensesSummaryAwaitProps) {
  const expenses = use(promise);

  return <ExpensesSummary
    width={300}
    height={300}
    expenses={expenses}
  />
}

function RouteComponent() {
  const { expenses } = Route.useLoaderData();
  const deps = Route.useSearch();


  const linkStyles = button({
    variant: 'secondary'
  })

  return <>
    <Suspense>
      <ExpensesSummaryAwait
        promise={expenses}
      />
    </Suspense>

    <div className='flex flex-col gap-3'>
      <Link
        className={linkStyles}
        from={'/$budgetId/'}
        to={'expenses-groups'}
        search={deps}
        mask={{
          to: 'expenses-groups'
        }}
      >
        Expenses
      </Link>
      <Link
        className={linkStyles}
        from={'/$budgetId'}
        to={'incomes'}
        search={deps}
        mask={{
          to:'incomes'
        }}
      >
        Incomes
      </Link>
    </div>
  </>
}
