import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react';

import { cx } from '@/_modules/common/utils/utilsClassNames';

import Box from './Box';

const VARIANT_CLASSES = {
  solid: 'bg-fg text-bg hover:opacity-85',
  outline: 'border border-border hover:border-accent hover:text-accent',
  bare: 'text-muted hover:bg-accent-soft hover:text-fg',
} as const;

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as `span` when the button sits inside a `Link` (never nest `<button>` in `<a>`). */
  as?: 'button' | 'span';
  variant?: keyof typeof VARIANT_CLASSES;
  children?: ReactNode;
}

/**
 * In-house button primitive. Every pressable surface gets an explicit pointer cursor (Tailwind
 * v4 Preflight resets `<button>` to `cursor: default`) and a disabled style, inherited from here.
 */
export default function BaseButton({
  as = 'button',
  variant = 'outline',
  className,
  type,
  children,
  ...rest
}: BaseButtonProps) {
  return (
    <Box
      as={as as ElementType}
      type={as === 'button' ? (type ?? 'button') : undefined}
      className={cx(
        'inline-flex min-h-hit cursor-pointer items-center gap-2 rounded-md px-4 text-sm font-medium transition-[opacity,color,border-color,transform,background-color] duration-150 ease-out active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Box>
  );
}
