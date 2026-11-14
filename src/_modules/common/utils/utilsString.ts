type Part = string | number | null | undefined;

/** '' for null / undefined / 'null' / 'undefined'; everything else as a string. */
export function safeString(value: Part) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  return text === 'null' || text === 'undefined' ? '' : text;
}

/** Drops empty parts, joins with a space. */
export function joinText(...parts: Part[]) {
  return parts.map(safeString).filter(Boolean).join(' ');
}

/** Drops empty parts, joins with `sep` padded by spaces. */
export function joinWith(sep: string, ...parts: Part[]) {
  return parts.map(safeString).filter(Boolean).join(` ${sep} `);
}

/** Two-digit index, e.g. 3 → "03". */
export function padIndex(value: number) {
  return String(value).padStart(2, '0');
}
