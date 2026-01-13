import type { Ctx, UpdateExpenseGroupDTO } from "./types";


export interface ExpensesGroupsMutations{
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  update(id: string,  data: UpdateExpenseGroupDTO ): Promise<void>
}

declare module './types.ts'{
  export interface ExpensesGroupsContainerServices{
    expensesGroupsMutations: ExpensesGroupsMutations
  }
}

export default function plugin(ctx: Ctx){
  ctx.bind('bearerAuthState', {
    provider() {
      throw new Error('NOt defined')
    },
  })
}


if(import.meta.env.DEV)
  plugin.mock = function(ctx: Ctx){
    ctx.bind('expensesGroupsMutations', {
      provider() {
        return {
          async delete(id) {
            
          },
          async update(id, data) {
            
          },
          async deleteMany(ids) {
            
          },
        }
      },
    })
  }