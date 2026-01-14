import type { BasicExpenseGroupDTO, CreateExpenseGroupDTO, Ctx, UpdateExpenseGroupDTO } from "./types";


export interface ExpensesGroupsMutations{
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  update(id: string,  data: UpdateExpenseGroupDTO ): Promise<void>
  create(data: CreateExpenseGroupDTO): Promise<BasicExpenseGroupDTO>
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
          async delete() {
            
          },
          async update() {
            
          },
          async deleteMany() {
            
          },
          async create(data){
            return {
              ...data,
              id: '01',
              createdBy: '',
              amount: 0
            }
          }
        }
      },
    })
  }