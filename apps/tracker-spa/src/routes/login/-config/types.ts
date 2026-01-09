import type { BasicChildContainer } from "@computerwwwizards/dependency-injection";
import type { GlobalServices } from "@config/container/types";

export interface LoginContainerServices{

}

export type LoginCtx = BasicChildContainer<LoginContainerServices, GlobalServices>