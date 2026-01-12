import type { BudgetCtx } from "./types";

export default function plugin(ctx: BudgetCtx){
  ctx.bind('budgetQuery', {
    provider(){
      throw new Error();
    }
  })
  .bind('budgetMutate', {
    provider(){
      throw new Error();
    }
  })
}

if(import.meta.env.DEV)
  plugin.mock= function(ctx: BudgetCtx){
    ctx.bind('budgetQuery', {
      provider() {
        return {
          async getLatestModified(){
            return [
              {
                id: '01',
                color: 'red',
                createdBy: 'Shadow',
                icon: 'money',
                name: 'Test data'
              },
              {
                id: '02',
                color: 'cyan',
                createdBy: 'Shadow',
                icon: 'party',
                name: 'Test data 2'
              },
               {
                id: '03',
                color: 'red',
                createdBy: 'Shadow',
                icon: 'love',
                name: 'Test data32'
              }
              
            ]
          },
          async listWorkspaces() {
            return Array.from({ length:20 }).map((_, index)=>({
              id: `mock-${index}`,
              color: 'green',
              createdBy: 'Shadow',
              icon: 'party',
              name: `Workspace ${index}`
            }))
          },
        }
      },
    })
  }