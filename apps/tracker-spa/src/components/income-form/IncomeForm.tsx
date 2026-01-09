"use client";

import { useActionState, type ReactNode } from 'react';
import TextField from 'shared-react/text-field';
import Switch from 'shared-react/switch';
import Button from 'shared-react/button';
import Spinner from 'shared-react/spinner';
import Chip from 'shared-react/chip';

export interface TransactionFormValues {
  name: string;
  amount: number;
  description?: string;
  monthly: boolean;
}

export interface TransactionFormProps {
  titleChip?: string;
  chipColor?: 'success' | 'warning' | 'danger' | 'neutral';
  namePlaceholder?: string;
  defaultValues?: Partial<TransactionFormValues>;
  onSubmit: (values: TransactionFormValues) => Promise<void>;
  onCancel?: () => void;
}

interface FormState {
  errors?: { id: string; message: ReactNode }[];
  values?: Partial<TransactionFormValues>;
}

export default function TransactionForm({
  titleChip = 'Income',
  chipColor = 'success',
  namePlaceholder = 'Name of income',
  defaultValues,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const [state, action, isPending] = useActionState(async (_prev: FormState | null, formData: FormData) => {
    const name = formData.get('name')?.toString() ?? '';
    const amountStr = formData.get('amount')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';
    const monthly = formData.get('monthly') === 'on';

    const amount = Number(amountStr);
    const values: TransactionFormValues = { name, amount, description, monthly };

    try {
      await onSubmit(values);
      return { values };
    } catch (error: any) {
      const msg = error?.message ?? 'Failed to save income';
      return {
        errors: [{ id: msg, message: msg }],
        values,
      };
    }
  }, null);

  return (
    <form id="income-form" className="grid gap-1" action={action}>

      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b">
        <TextField
          name="name"
          defaultValue={state?.values?.name ?? defaultValues?.name ?? ''}
          placeholder={namePlaceholder}
          disabled={isPending}
          maxLength={20}
          className="border-0 rounded-none p-0 bg-transparent"
        />
        <Chip color={chipColor}>{titleChip}</Chip>
      </div>

      <div className='grid gap-1'>
        <div className="flex items-center gap-4">
          <TextField
            label={"Amount"}
            type="number"
            name="amount"
            step="0.01"
            min="0"
            defaultValue={state?.values?.amount ?? defaultValues?.amount ?? ''}
            placeholder="0.00"
            disabled={isPending}
            className="w-full"
            errors={state?.errors}
          />
          <div className="flex items-end pb-1.5 gap-3">
            <Switch id="monthly" aria-label="monthly" name="monthly" defaultChecked={state?.values?.monthly ?? !!defaultValues?.monthly} disabled={isPending} />
            <label htmlFor="monthly" className="font-medium">Monthly</label>
          </div>
        </div>


        <div>
          <TextField
            label={"Description"}
            name="description"
            defaultValue={state?.values?.description ?? defaultValues?.description ?? ''}
            placeholder="Optional description"
            disabled={isPending}
            className="w-full"
          />
        </div>
      </div>


      {!!state?.errors?.length && (
        <div className="grid gap-2">
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
        <Button type="button" variant="tertiary" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

