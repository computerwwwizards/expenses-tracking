import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

//TODO: refactor, AI generated something very bad
//TODO; create a react pattern

const styles = tv({
  slots: {
    container: 'inline-grid select-none',
    input: 'peer col-start-1 row-start-1 opacity-0 cursor-pointer z-[1] w-full h-full',
    // Track renders the thumb via ::before so they never drift apart
    track:
      'col-start-1 row-start-1 relative rounded-full transition-colors duration-200 bg-gray-300 dark:bg-gray-700 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-blue-500 peer-focus-visible:outline-offset-2 before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white before:shadow before:transition-[left] before:duration-200',
  },
  variants: {
    size: {
      sm: {
        container: 'w-9 h-5',
        track: 'w-9 h-5 before:h-4 before:w-4 before:left-0.5 peer-checked:before:left-[18px]'
      },
      md: {
        container: 'w-11 h-6',
        track: 'w-11 h-6 before:h-5 before:w-5 before:left-0.5 peer-checked:before:left-[22px]'
      },
      lg: {
        container: 'w-14 h-7',
        track: 'w-14 h-7 before:h-6 before:w-6 before:left-1 peer-checked:before:left-[28px]'
      },
    },
    variant: {
      primary: { track: 'peer-checked:bg-blue-600 peer-checked:dark:bg-blue-500' },
      neutral: { track: 'peer-checked:bg-gray-900 peer-checked:dark:bg-gray-200' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

export type SwitchVariants = VariantProps<typeof styles>;

export interface SwitchProps extends Omit<ComponentProps<'input'>, 'type' | 'size'>, SwitchVariants {}

export default function Switch({
  className,
  size,
  variant,
  disabled,
  ...props
}: SwitchProps) {
  const s = styles({ size, variant });
  return (
    <div className={s.container({ className })}>
      <input type="checkbox" className={s.input()} disabled={disabled} {...props} />
      <div className={s.track()} aria-hidden />
    </div>
  );
}


