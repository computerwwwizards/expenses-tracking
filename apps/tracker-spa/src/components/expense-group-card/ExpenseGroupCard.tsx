import type { CSSProperties, ReactNode } from 'react';
import { EditableCard, type EditableCardProps } from '../editable-card/EditableCard';

export interface ExpenseGroupCardOwnProps{
  amount: number;
  name: string;
  icon: ReactNode;
  expenseId: string;
  color?: string;
  iconName: string
}

export type ExpenseGroupCardProps = ExpenseGroupCardOwnProps & Omit<EditableCardProps, 'itemId'>


export function ExpenseGroupCard({ 
  amount, 
  name, 
  icon,
  style, 
  color,
  expenseId,
  iconName,
  ...props 
}: ExpenseGroupCardProps) {
  const dataProps = {
    'data-name': name,
    'data-icon': iconName,
    'data-color': color,
    'data-amount': amount.toString()
  }
  
  return (
    <EditableCard 
      style={{
        '--custom-color': color,
        ...style
      } as CSSProperties}
      itemId={expenseId} 
      {...props}
      editButtonProps={dataProps}
    >
      <article className="flex items-center gap-3">
        <div 
          className="text-(--custom-color) shrink-0 w-10 h-10 flex items-center justify-center"
        >
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-(--custom-color) text-sm font-medium">
            {name}
          </span>
          <span className="text-lg font-semibold text-gray-300">
            S/. {amount.toFixed(2)}
          </span>
        </div>
      </article>
    </EditableCard>
  );
}
