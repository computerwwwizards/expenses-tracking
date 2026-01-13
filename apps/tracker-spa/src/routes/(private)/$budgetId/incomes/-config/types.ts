import type { BasicChildContainer } from "@computerwwwizards/dependency-injection";
import type { GlobalServices } from "@config/container/types";

export interface IncomesContainerServices {

}

export type BasicIncomeDTO = Readonly<{
  id: string;
  name: string;
  amount: number;
  createdBy: string;
}>;

export type CreateIncomeDTO = Omit<BasicIncomeDTO, 'id' | 'createdBy'>;

export type UpdateIncomeDTO = Partial<Omit<BasicIncomeDTO, 'id' | 'createdBy'>>;

export type Ctx = BasicChildContainer<
  IncomesContainerServices,
  GlobalServices
>;
