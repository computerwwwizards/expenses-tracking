import type { BasicChildContainer } from "@computerwwwizards/dependency-injection";
import type { GlobalServices } from "@config/container/types";

export interface ExpensesGroupsContainerServices{

}


export type BasicExpenseGroupDTO = Readonly<{
  id: string;
  icon: string;
  name: string;
  createdBy: string;
  /**
   * This should be derived
   */
  amount: number;
}>

export type UpdateExpenseGroupDTO = Partial<Omit<BasicExpenseGroupDTO, 'id' | 'amount'>>


export type BasicExpenseDTO = Readonly<{
  id: string;
  name: string;
  amount: number;
  createdBy: string;
}>

export type Ctx = BasicChildContainer<
  ExpensesGroupsContainerServices, 
  GlobalServices
>