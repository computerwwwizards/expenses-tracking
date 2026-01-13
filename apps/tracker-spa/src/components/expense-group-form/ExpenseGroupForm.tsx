"use client";

import { useActionState, useCallback, useState, type ChangeEvent, type MouseEvent, type ReactNode } from 'react';
import TextField from 'shared-react/text-field';
import Button from 'shared-react/button';
import Spinner from 'shared-react/spinner';
import Chip from 'shared-react/chip';
import {
  getIconsByName
} from '../icon/Icon';

const iconComponents = getIconsByName();

export type IconName = keyof typeof iconComponents;

export interface ExpenseGroupFormValues {
  name: string;
  icon: IconName;
  color: string;
  description?: string;
}

export interface ExpenseGroupFormProps {
  defaultValues?: Partial<ExpenseGroupFormValues>;
  onSubmit: (values: ExpenseGroupFormValues) => Promise<void>;
  onCancel?: () => void;
}

interface FormState {
  errors?: { id: string; message: ReactNode }[];
  values?: Partial<ExpenseGroupFormValues>;
}

export default function ExpenseGroupForm({
  defaultValues,
  onSubmit,
  onCancel,
}: ExpenseGroupFormProps) {
  const [selectedIcon, setSelectedIcon] = useState<IconName>(defaultValues?.icon ?? 'money');
  const [selectedColor, setSelectedColor] = useState(defaultValues?.color ?? '#dc2626');
  const [name, setName] = useState(defaultValues?.name ?? '');

  const [state, action, isPending] = useActionState(async (_prev: FormState | null, formData: FormData) => {
    const name = formData.get('name')?.toString() ?? '';
    const icon = formData.get('icon')?.toString() as IconName ?? 'money';
    const color = formData.get('color')?.toString() ?? '#dc2626';
    const description = formData.get('description')?.toString() ?? '';

    const values: ExpenseGroupFormValues = { name, icon, color, description };

    try {
      await onSubmit(values);
      return { values };
    } catch (error: any) {
      const msg = error?.message ?? 'Failed to save expense group';
      return {
        errors: [{ id: msg, message: msg }],
        values,
      };
    }
  }, null);

  const SelectedIconComponent = iconComponents[selectedIcon];

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    setName(event.currentTarget.value)
  }, [])

  const handleIconSelection = useCallback((event: MouseEvent<HTMLButtonElement>)=>{
    const { iconName } = event.currentTarget.dataset

    if(!iconName)
      return 
  
    setSelectedIcon(iconName)
  }, [])

  const handleColorSelection = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    const { value } = event.currentTarget;

    setSelectedColor(value);
  }, [])

  return (
    <form id="expense-group-form" className="grid gap-1" action={action}>
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b">
        <TextField
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name of expense group"
          disabled={isPending}
          maxLength={30}
          className="border-0 rounded-none p-0 bg-transparent"
        />
        <Chip color="danger">Expense</Chip>
      </div>

      <div className="grid gap-1 mt-4">
        <div className="grid gap-2">
          <label className="font-semibold">Icon</label>
          <input type="hidden" name="icon" value={selectedIcon} />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(Object.keys(iconComponents) as IconName[]).map((iconName) => {
              const IconComp = iconComponents[iconName];
              return (
                <button
                  key={iconName}
                  type="button"
                  data-icon-name={iconName}
                  onClick={handleIconSelection}
                  disabled={isPending}
                  className={`p-3 rounded-lg border-2 transition-colors shrink-0 ${
                    selectedIcon === iconName
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <IconComp size={24} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-2 mt-2">
          <label className="font-semibold">Color</label>
          <input 
            type="color" 
            name="color" 
            value={selectedColor}
            onChange={handleColorSelection}
            disabled={isPending}
            className="w-20 h-10 rounded cursor-pointer"
          />
        </div>

        <div className="grid gap-2 mt-2">
          <label className="font-semibold">Preview</label>
          {/* TODO: use css vars instead of style */}
          <div className="flex items-center gap-2" style={{ color: selectedColor }}>
            <SelectedIconComponent size={32} />
            <span className="text-lg font-medium">{name || 'Group name'}</span>
          </div>
        </div>

        <div className="mt-2">
          <TextField
            label="Description"
            name="description"
            defaultValue={state?.values?.description ?? defaultValues?.description ?? ''}
            placeholder="Optional description"
            disabled={isPending}
            className="w-full"
          />
        </div>
      </div>

      {!!state?.errors?.length && (
        <div className="grid gap-2 mt-2">
          <span className="font-semibold">Errors</span>
          <ul className="text-red-500">
            {state.errors.map(({ id, message }) => (
              <li key={id}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-3 mt-10">
        <Button variant="secondary" disabled={isPending}>
          {isPending ? <Spinner size="sm" /> : 'Save'}
        </Button>
        <Button 
          type="button" 
          variant="tertiary" 
          onClick={onCancel} 
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
