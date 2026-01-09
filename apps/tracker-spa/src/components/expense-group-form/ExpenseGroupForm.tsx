"use client";

import { useActionState, useState, type ReactNode } from 'react';
import TextField from 'shared-react/text-field';
import Button from 'shared-react/button';
import Spinner from 'shared-react/spinner';
import Chip from 'shared-react/chip';
import {
  MoneyIcon,
  EducationIcon,
  PartyIcon,
  LoveIcon,
  HealthIcon,
  TechIcon,
  BookIcon,
  QuestionIcon,
  DangerIcon,
  ExclamationIcon,
  FoodIcon,
  HomeIcon,
  BulbIcon,
  CarIcon,
  HappyIcon,
  SadIcon,
  ChurchIcon,
  PlaneIcon,
} from '../icon/Icon';

const iconComponents = {
  money: MoneyIcon,
  education: EducationIcon,
  party: PartyIcon,
  love: LoveIcon,
  health: HealthIcon,
  tech: TechIcon,
  book: BookIcon,
  question: QuestionIcon,
  danger: DangerIcon,
  exclamation: ExclamationIcon,
  food: FoodIcon,
  home: HomeIcon,
  bulb: BulbIcon,
  car: CarIcon,
  happy: HappyIcon,
  sad: SadIcon,
  church: ChurchIcon,
  plane: PlaneIcon,
};

export type IconName = keyof typeof iconComponents;

const colors = [
  { name: 'red', class: 'bg-red-600', textClass: 'text-red-600' },
  { name: 'orange', class: 'bg-orange-600', textClass: 'text-orange-600' },
  { name: 'yellow', class: 'bg-yellow-500', textClass: 'text-yellow-500' },
  { name: 'green', class: 'bg-green-600', textClass: 'text-green-600' },
  { name: 'blue', class: 'bg-blue-600', textClass: 'text-blue-600' },
  { name: 'purple', class: 'bg-purple-600', textClass: 'text-purple-600' },
  { name: 'pink', class: 'bg-pink-600', textClass: 'text-pink-600' },
  { name: 'gray', class: 'bg-gray-600', textClass: 'text-gray-600' },
];

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
  const [selectedColor, setSelectedColor] = useState(defaultValues?.color ?? 'red');
  const [name, setName] = useState(defaultValues?.name ?? '');

  const [state, action, isPending] = useActionState(async (_prev: FormState | null, formData: FormData) => {
    const name = formData.get('name')?.toString() ?? '';
    const icon = formData.get('icon')?.toString() as IconName ?? 'money';
    const color = formData.get('color')?.toString() ?? 'red';
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
  const selectedColorObj = colors.find((c) => c.name === selectedColor) ?? colors[0];

  return (
    <form id="expense-group-form" className="grid gap-1" action={action}>
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b">
        <TextField
          name="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Name of expense group"
          disabled={isPending}
          maxLength={30}
          className="border-0 rounded-none p-0 bg-transparent"
        />
        <Chip color="danger">Expense</Chip>
      </div>

      <div className="grid gap-1 mt-4">
        {/* Icon selector */}
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
                  onClick={() => setSelectedIcon(iconName)}
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

        {/* Color selector */}
        <div className="grid gap-2 mt-2">
          <label className="font-semibold">Color</label>
          <input type="hidden" name="color" value={selectedColor} />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                disabled={isPending}
                className={`w-10 h-10 rounded-full border-2 transition-all shrink-0 ${color.class} ${
                  selectedColor === color.name
                    ? 'border-gray-900 dark:border-gray-100 scale-110'
                    : 'border-transparent'
                }`}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="grid gap-2 mt-2">
          <label className="font-semibold">Preview</label>
          <div className={`flex items-center gap-2 ${selectedColorObj.textClass}`}>
            <SelectedIconComponent size={32} />
            <span className="text-lg font-medium">{name || 'Group name'}</span>
          </div>
        </div>

        {/* Description */}
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
        <Button type="button" variant="tertiary" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
