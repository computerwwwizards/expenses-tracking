import type { BasicChildContainer } from "@computerwwwizards/dependency-injection";
import type { GlobalServices } from "@config/container/types";

export interface ExpenseSummary{
  getTotal(workspaceId: string): Promise<number>;
  listAllGroups(workspaceId: string):Promise<Array<{
    groupName: string;
    color: string;
    amount: number;
  }>>
}


export interface ExpensesSummaryServices{
  expenseSummary: ExpenseSummary
}

export type Ctx = BasicChildContainer<
  ExpensesSummaryServices,
  GlobalServices
>

export default function plugin(ctx: Ctx){
  ctx
    .bind('expenseSummary', {
      provider(){
        throw new Error('Expense summary not defined');
      }
    })
}

if(import.meta.env.DEV)
  plugin.mock = function(ctx: Ctx){
    ctx
      .bind('expenseSummary', {
        provider(){
          return {
            async getTotal(){
              return 100
            },
            async listAllGroups(){
              return [
                {
                  amount: 100.0,
                  color: 'red',
                  groupName: 'Home'
                },
                {
                  amount: 220.5,
                  color: 'blue',
                  groupName: 'Education'
                },
                {
                  amount: 112.45,
                  color: 'green',
                  groupName: 'Work'
                }
              ]
            }
          }
        }
      })
  }


