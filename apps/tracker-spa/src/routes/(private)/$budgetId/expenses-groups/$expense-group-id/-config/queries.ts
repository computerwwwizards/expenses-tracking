import type { BasicExpenseDTO, Ctx } from "./types";

export interface ExpenseGroupDetailQueries {
  listExpensesByGroupId(groupId: string): Promise<Array<BasicExpenseDTO>>;
}

declare module './types.ts' {
  export interface ExpenseGroupDetailContainerServices {
    expenseGroupDetailQueries: ExpenseGroupDetailQueries;
  }
}

export default function plugin(ctx: Ctx) {
  ctx.bind('expenseGroupDetailQueries', {
    provider() {
      throw new Error('Not implemented');
    },
  });
}

if (import.meta.env.DEV)
  plugin.mock = function (ctx: Ctx) {
    ctx.bind('expenseGroupDetailQueries', {
      provider() {
        return {
          async listExpensesByGroupId() {
            return [
              {
                amount: 19.2,
                createdBy: 'user1',
                id: '01',
                name: 'Expense 1',
              },
              {
                amount: 25.5,
                createdBy: 'user1',
                id: '02',
                name: 'Expense 2',
              },
            ];
          },
        };
      },
    });
  };
