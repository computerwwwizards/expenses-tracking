import type { BasicChildContainer } from "@computerwwwizards/dependency-injection";
import type { GlobalServices } from "@config/container/types";

export interface ExpenseGroupDetailContainerServices {

}

export type BasicExpenseDTO = Readonly<{
  id: string;
  name: string;
  amount: number;
  createdBy: string;
}>;

export type CreateExpenseDTO = Omit<BasicExpenseDTO, 'id' | 'createdBy'>;

export type UpdateExpenseDTO = Partial<Omit<BasicExpenseDTO, 'id' | 'createdBy'>>;

export type Ctx = BasicChildContainer<
  ExpenseGroupDetailContainerServices,
  GlobalServices
>;
