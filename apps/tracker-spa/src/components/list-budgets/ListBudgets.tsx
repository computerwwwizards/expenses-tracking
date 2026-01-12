'use client';

import { use, type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import type { Budget } from "../../routes/(private)/(home)/-config/types";
import BudgetItem from "@components/budget-item/BudgetItem";

interface LatestModifiedProps extends HTMLAttributes<HTMLButtonElement> {
  promise: Promise<Readonly<Array<Omit<Budget, 'icon'> & { icon: ReactNode }>>>
  onEdit?: MouseEventHandler
}


// TODO: create polymorphic types lib


export default function BudgetListItems({
  promise,
  ...props
}: LatestModifiedProps) {
  const data = use(promise);

  return data.map(({
    id,
    color,
    icon,
    name
  }) => <li key={id}>
      <BudgetItem
        budgetId={id}
        color={color}
        icon={icon}
        name={name}
        {...props}
      />
    </li>)
}
