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
    expenses={expenses}
  />
}

function RouteComponent() {
  const { expenses } = Route.useLoaderData();

  const linkStyles = button({
    variant: 'secondary'
  })

  return <div className='grow'>
    <Suspense>
      <ExpensesSummaryAwait
        promise={expenses}
      />
    </Suspense>
    <div className='flex flex-col gap-3'>
      <Link
        className={linkStyles}
        from={'/$budgetId'}
        to={'expenses-group'}
      >
        Expenses
      </Link>
      <Link
        className={linkStyles}
        from={'/$budgetId'}
        to={'incomes'}
      >
        Incomes
      </Link>
    </div>
  </div>
}
