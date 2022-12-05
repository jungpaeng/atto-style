type Dict<T = unknown> = Record<string, T>;

export function isObject(value: unknown): value is Dict {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function') && !Array.isArray(value);
}
