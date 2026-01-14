import { createFileRoute } from '@tanstack/react-router'

const nullFn = ()=>null

export const Route = createFileRoute('/(private)/(home)/budgets/')({
  async loader({context}){

    const budgets = Promise.all([context
      .budgetContainer
      .get('budgetQuery')
      .listWorkspaces(),
      import('@components/icon/Icon')
    ]).then(([budgets, { getIconsByName }])=>{
      const iconsByName = getIconsByName();

      return budgets.map(({
        icon,
        ...rest
      })=>({
        ...rest,
        icon: (iconsByName[icon] ?? nullFn)({}),
        iconName: icon
      }))
    })

    return {
      budgets
    }
  }
})

