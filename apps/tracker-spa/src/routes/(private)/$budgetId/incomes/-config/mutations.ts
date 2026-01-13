import type { CreateIncomeDTO, Ctx, UpdateIncomeDTO } from "./types";

export interface IncomesMutations {
  createIncome(budgetId: string, data: CreateIncomeDTO): Promise<void>;
  updateIncome(
    budgetId: string,
    incomeId: string,
    data: UpdateIncomeDTO
  ): Promise<void>;
  deleteIncome(budgetId: string, incomeId: string): Promise<void>;
}

declare module './types.ts' {
  export interface IncomesContainerServices {
    incomesMutations: IncomesMutations;
  }
}

export default function plugin(ctx: Ctx) {
  ctx.bind('incomesMutations', {
    provider() {
      throw new Error('Not implemented');
    },
  });
}

if (import.meta.env.DEV)
  plugin.mock = function (ctx: Ctx) {
    ctx.bind('incomesMutations', {
      provider() {
        return {
          async createIncome() {},
          async updateIncome() {},
          async deleteIncome() {},
        };
      },
    });
  };
