import type { BasicIncomeDTO, Ctx } from "./types";

export interface IncomesQueries {
  listIncomesByBudgetId(budgetId: string): Promise<Array<BasicIncomeDTO>>;
}

declare module './types.ts' {
  export interface IncomesContainerServices {
    incomesQueries: IncomesQueries;
  }
}

export default function plugin(ctx: Ctx) {
  ctx.bind('incomesQueries', {
    provider() {
      throw new Error('Not implemented');
    },
  });
}

if (import.meta.env.DEV)
  plugin.mock = function (ctx: Ctx) {
    ctx.bind('incomesQueries', {
      provider() {
        return {
          async listIncomesByBudgetId() {
            return [
              {
                amount: 1500,
                createdBy: 'user1',
                id: '01',
                name: 'Salary',
              },
              {
                amount: 250,
                createdBy: 'user1',
                id: '02',
                name: 'Freelance',
              },
            ];
          },
        };
      },
    });
  };
