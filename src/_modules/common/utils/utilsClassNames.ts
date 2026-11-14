type ClassValue = string | false | null | undefined;

/** Joins class names, dropping falsy values. Tiny local stand-in for clsx. */
export function cx(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ');
}
