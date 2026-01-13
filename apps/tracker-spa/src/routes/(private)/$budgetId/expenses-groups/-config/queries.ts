import type { BasicExpenseDTO, BasicExpenseGroupDTO, Ctx } from "./types";

export interface ExpensesGroupsQueries{
  listByBudgetId(budgetId: string): Promise<Array<BasicExpenseGroupDTO>>;
  getGroupExpenseById(groupExpenseId: string): Promise<BasicExpenseGroupDTO>;
  listExpensesByGroupId(groupExpenseId: string): Promise<Array<BasicExpenseDTO>>;
}

declare module './types.ts'{
  export interface ExpensesGroupsContainerServices{
    expensesGroupsQueries:ExpensesGroupsQueries
  }
}

export default function plugin(ctx: Ctx){
  ctx
    .bind('expensesGroupsQueries', {
      provider() {
        throw new Error('Not implemented')
      },
    })
}


if(import.meta.env.DEV)
  plugin.mock = function(ctx: Ctx){
    ctx
      .bind('expensesGroupsQueries', {
        provider() {
          return {
            async getGroupExpenseById() {
              return {
                amount: 100.5,
                createdBy: '',
                icon: 'home',
                id: '01',
                name: 'Expense group 1'
              }
            },
            async listByBudgetId() {
              return [
                {
                  amount: 100.6,
                  createdBy: '',
                  icon: 'love',
                  id: '01',
                  name: 'Expense group 1'
                }
              ]              
            },
            async listExpensesByGroupId() {
              return [
                {
                  amount: 19.20,
                  createdBy: 'asd',
                  id: '01',
                  name: 'Expense 1'
                }
              ]
            },  
          }
        },
      })
  }

