import { createLazyFileRoute } from '@tanstack/react-router'
import { Suspense, use, useState, type MouseEvent } from 'react'
import type { BasicIncomeDTO } from './-config/types'

export const Route = createLazyFileRoute('/(private)/$budgetId/incomes/')({
  component: RouteComponent,
})

interface IncomesListAwaitProps {
  promise: Promise<Array<BasicIncomeDTO>>
  onEdit: (event: MouseEvent<HTMLButtonElement>) => void
  onDelete: (event: MouseEvent<HTMLButtonElement>) => void
}

function IncomesListAwait({
  promise,
  onEdit,
  onDelete,
}: IncomesListAwaitProps) {
  const incomes = use(promise)
  const [resolvedIncomes, setResolvedIncomes] = useState(incomes)

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset
    if (!id) return

    await onDelete(event)
    setResolvedIncomes((prev) => prev.filter((inc) => inc.id !== id))
  }

  return (
    <ul className="flex-1 overflow-y-auto">
      {resolvedIncomes.map((income) => (
        <li
          key={income.id}
          className="p-4 border-b border-gray-700 flex justify-between items-center hover:bg-zinc-800"
          data-id={income.id}
        >
          <div>
            <p className="font-semibold">{income.name}</p>
            <p className="text-sm text-gray-400">S/. {income.amount.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              data-id={income.id}
              className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              data-id={income.id}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

function RouteComponent() {
  const { budgetId } = Route.useParams()
  const { incomesContainer } = Route.useRouteContext();
  const navigate = Route.useNavigate()

  const incomesPromise = incomesContainer
    .get('incomesQueries')
    .listIncomesByBudgetId(budgetId)

  const handleEdit = async (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset
    if (!id) return

    await navigate({
      to: 'update',
      search: { id },
    })
  }

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset
    if (!id) return

    await incomesContainer
      .get('incomesMutations')
      .deleteIncome(budgetId, id)
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <Suspense fallback={<div>Loading incomes...</div>}>
        <IncomesListAwait
          promise={incomesPromise}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Suspense>
      <button
        onClick={async () => {
          await navigate({
            to: 'create',
          })
        }}
        className="p-3 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
      >
        Create Income
      </button>
    </div>
  )
}
