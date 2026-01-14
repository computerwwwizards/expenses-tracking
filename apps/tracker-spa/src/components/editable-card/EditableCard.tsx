import type { ComponentProps, HTMLAttributes } from 'react';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '../icon/Icon';

export interface EditableCardProps extends ComponentProps<'article'> {
  onEdit?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  itemId: string;
  deleteButtonProps?:HTMLAttributes<HTMLButtonElement> & {[key: `data-${string}`]: string | undefined};
  editButtonProps?: HTMLAttributes<HTMLButtonElement> & {[key: `data-${string}`]: string | undefined};
}

export function EditableCard({ 
  children,
  onEdit,
  onDelete,
  itemId,
  className = '',
  deleteButtonProps,
  editButtonProps,
  ...props 
}: EditableCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await Promise.resolve(onDelete(event));
    } catch (error) {
      setIsDeleting(false);
      console.error('Delete failed:', error);
    }
  };

  return (
    <article 
      className={`cursor-pointer aria-disabled:cursor-not-allowed hover:bg-zinc-500 active:bg-zinc-400 w-full flex items-center justify-between p-4 bg-zinc-800 rounded-lg border border-zinc-700 shadow-lg shadow-blue-500/10 ${className} ${isDeleting ? 'opacity-50' : ''}`}
      data-id={itemId}
      aria-disabled={isDeleting}
      {...props}
    >
      <div className="flex-1 flex items-center gap-3">
        {children}
        {isDeleting && <span className="text-sm text-gray-400">Deleting...</span>}
      </div>
      {(onEdit || onDelete) && !isDeleting && (
        <div className="hidden md:flex flex-col gap-2 shrink-0">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              data-id={itemId}
              className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
              aria-label="Edit"
              {...editButtonProps}
            >
              <PencilIcon size={20} />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              data-id={itemId}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-zinc-800 rounded-md transition-colors"
              aria-label="Delete"
              {...deleteButtonProps}
            >
              <TrashIcon size={20} />
            </button>
          )}
        </div>
      )}
    </article>
  );
}
