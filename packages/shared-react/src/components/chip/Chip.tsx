import { tv, type VariantProps } from 'tailwind-variants';
import type { ComponentProps, ReactNode } from 'react';

const chip = tv({
  base: 'text-xs inline-flex items-center justify-center px-2 py-1 font-medium border',
  variants: {
    color: {
      success: 'bg-green-600 text-white border-green-600 dark:bg-green-500 dark:border-green-500',
      warning: 'bg-yellow-500 text-gray-900 border-yellow-500 dark:bg-yellow-400 dark:text-gray-900',
      danger: 'bg-red-600 text-white border-red-600 dark:bg-red-500 dark:border-red-500',
      neutral: 'bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600',
    },
    tone: {
      solid: '',
      outline: 'bg-transparent',
    }
  },
  compoundVariants: [
    { color: 'success', tone: 'outline', class: 'text-green-700 border-green-600 dark:text-green-400' },
    { color: 'warning', tone: 'outline', class: 'text-yellow-700 border-yellow-500 dark:text-yellow-300' },
    { color: 'danger',  tone: 'outline', class: 'text-red-700 border-red-600 dark:text-red-400' },
    { color: 'neutral', tone: 'outline', class: 'text-gray-800 border-gray-400 dark:text-gray-200' },
  ],
  defaultVariants: {
    color: 'success',
    tone: 'solid',
  },
});

export type ChipVariants = VariantProps<typeof chip>;

export interface ChipProps extends Omit<ComponentProps<'span'>, 'color'>, ChipVariants {
  children?: ReactNode;
}

export default function Chip({ color, tone, className, children, ...props }: ChipProps) {
  return (
    <span className={chip({ color, tone, className })} {...props}>{children}</span>
  );
}


