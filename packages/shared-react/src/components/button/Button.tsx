import { tv, type VariantProps } from 'tailwind-variants';
import type { ComponentProps } from 'react';

export const button = tv({
  base: [
    'inline-flex items-center justify-center',
    'px-4 py-2 rounded-lg',
    'font-medium text-sm',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'dark:focus:ring-offset-gray-900',
  ],
  variants: {
    variant: {
      primary: [
        'bg-blue-600 text-white',
        'hover:bg-blue-700 active:bg-blue-800',
        'focus:ring-blue-500',
        'shadow-sm hover:shadow-md',
      ],
      secondary: [
        'bg-gray-700 text-gray-100',
        'hover:bg-gray-600 active:bg-gray-800',
        'focus:ring-gray-500',
      ],
      tertiary: [
        'bg-transparent text-gray-700 border border-gray-300',
        'hover:bg-gray-50 active:bg-gray-100',
        'focus:ring-gray-400',
      ],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ButtonVariantProps = VariantProps<typeof button>;

export interface ButtonProps extends ComponentProps<'button'>, ButtonVariantProps {}

export default function Button({ 
  variant, 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button className={button({ variant, className })} {...props}>
      {children}
    </button>
  );
}
