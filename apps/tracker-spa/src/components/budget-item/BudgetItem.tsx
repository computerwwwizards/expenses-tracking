import type { CSSProperties, ReactNode } from "react";
import { EditableCard, type EditableCardProps } from "../editable-card/EditableCard";

export interface BudgetItemProps extends Omit<EditableCardProps, 'itemId'> {
  name: string;
  icon: ReactNode;
  color?: string;
  budgetId: string;
}

export default function BudgetItem({
  budgetId,
  color,
  icon,
  name,
  style,
  ...props
}: BudgetItemProps) {
  return (
    <EditableCard
      style={{
        '--custom-color': color,
        ...style
      } as CSSProperties}
      itemId={budgetId}
      {...props}
    >
      <div className="text-(--custom-color) flex items-center gap-3">
        <div className="shrink-0 w-10 h-10 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm font-medium">
          {name}
        </span>
      </div>
    </EditableCard>
  );
}