import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/$budgetId/')({
  beforeLoad(){
    throw redirect({
      from: '/$budgetId',
      to: '/$budgetId/expenses'
    })
  }
})


