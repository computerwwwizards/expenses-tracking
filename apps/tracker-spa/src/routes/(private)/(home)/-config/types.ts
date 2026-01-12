import type { BasicChildContainer } from "@computerwwwizards/dependency-injection";
import type { GlobalServices } from "@config/container/types";

export interface Budget{
  name: string;
  createdBy: string;
  icon: string;
  color: string;
  id: string;
}

export type BudgetCtx = BasicChildContainer<BudgetContainerServices, GlobalServices>


//TODO: we are suffering with pagination and streams, this should get it right
export interface BudgetWorkspaceQuery{
  getLatestModified(): Promise<Readonly<Budget[]>>;
  listWorkspaces(): Promise<Readonly<Budget>[]>
}

export type MutationBudgetDTO = Readonly<Omit<Budget, 'id' | 'createdBy'>>

export interface BudgetMutations{
  create(budget: MutationBudgetDTO): Promise<void>;
  update(id: string, budget: Partial<MutationBudgetDTO>): Promise<void>;
}

export interface BudgetContainerServices {
  budgetQuery: BudgetWorkspaceQuery;
  budgetMutate: BudgetMutations;
}
