import type { AllHTMLAttributes, ElementType, ReactNode, Ref } from 'react';

export interface BoxProps extends Omit<AllHTMLAttributes<HTMLElement>, 'color' | 'as'> {
  /** The semantic/structural tag to render. Defaults to `div`. */
  as?: ElementType;
  children?: ReactNode;
  /** React 19: ref is a normal prop — no `forwardRef`. */
  ref?: Ref<HTMLElement>;
}

/**
 * Basic structural primitive (fe-coding STEP 2 §2: "Basic → Col, Row, TextPrimary, Box, Stack").
 * This is the one place a semantic/structural HTML tag is chosen — `Col`, `Row`, `TextPrimary`
 * and every `Base*` component compose `Box` instead of writing a raw tag directly, so the whole
 * app never emits `<div>`/`<nav>`/`<ul>`/… outside this file.
 */
export default function Box({ as, children, ref, ...rest }: BoxProps) {
  const Tag = as ?? 'div';
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
