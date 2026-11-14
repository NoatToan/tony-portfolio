import { cx } from '@/_modules/common/utils/utilsClassNames';

export interface BaseIconProps {
  /** `viewBox` + single-path stroke/fill data, or pre-built children (e.g. multi-path icons). */
  path?: string;
  viewBox?: string;
  fill?: 'none' | 'currentColor';
  stroke?: 'currentColor' | 'none';
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Base primitive for every inline SVG icon (stroke glyphs, brand marks). The only layer allowed
 * to emit a raw `<svg>`/`<path>`.
 */
export default function BaseIcon({
  path,
  viewBox = '0 0 24 24',
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 1.75,
  className = 'size-4',
  style,
  children,
}: BaseIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className={cx(className)}
      style={style}
      fill={fill}
      stroke={fill === 'none' ? stroke : 'none'}
      strokeWidth={fill === 'none' ? strokeWidth : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path ? <path d={path} /> : children}
    </svg>
  );
}
