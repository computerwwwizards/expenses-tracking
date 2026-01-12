import type { ComponentProps, ReactNode } from 'react';
import { PencilIcon } from '../icon/Icon';

export interface EditableCardProps extends ComponentProps<'button'> {
  onEdit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  itemId: string;
  color?: string;
}

export function EditableCard({ 
  children,
  onEdit,
  itemId,
  color,
  className = '',
  ...props 
}: EditableCardProps) {
  return (
    <button 
      className={`hover:bg-zinc-500 active:bg-zinc-400 w-full flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700 shadow-lg shadow-blue-500/10 ${color ?? ''} ${className}`}
      data-id={itemId}
      {...props}
    >
      {children}
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          data-id={itemId}
          className="hidden md:block shrink-0 p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
          aria-label="Edit"
        >
          <PencilIcon size={20} />
        </button>
      )}
    </button>
  );
}
