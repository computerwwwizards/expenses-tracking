import type { CreateExpenseDTO, Ctx, UpdateExpenseDTO } from "./types";

export interface ExpenseGroupDetailMutations {
  createExpense(groupId: string, data: CreateExpenseDTO): Promise<void>;
  updateExpense(
    groupId: string,
    expenseId: string,
    data: UpdateExpenseDTO
  ): Promise<void>;
  deleteExpense(groupId: string, expenseId: string): Promise<void>;
}

declare module './types.ts' {
  export interface ExpenseGroupDetailContainerServices {
    expenseGroupDetailMutations: ExpenseGroupDetailMutations;
  }
}

export default function plugin(ctx: Ctx) {
  ctx.bind('expenseGroupDetailMutations', {
    provider() {
      throw new Error('Not implemented');
    },
  });
}

if (import.meta.env.DEV)
  plugin.mock = function (ctx: Ctx) {
    ctx.bind('expenseGroupDetailMutations', {
      provider() {
        return {
          async createExpense() {},
          async updateExpense() {},
          async deleteExpense() {},
        };
      },
    });
  };
