import { isObject } from './utils/isObject';

export const breakpoints = Object.freeze(['base', 'sm', 'md', 'lg', 'xl', '2xl']);

export function mapResponsive<Value extends string | number>(
  prop: Value | Value[] | Record<string, Value>,
  mapper: (value: Value) => string
) {
  if (Array.isArray(prop)) {
    return prop.map((item) => (item === null ? null : mapper(item)));
  }

  if (isObject(prop)) {
    return Object.keys(prop).reduce((prev: Record<string, string>, curr) => {
      prev[curr] = mapper(prop[curr]);
      return prev;
    }, {});
  }

  return prop == null ? null : mapper(prop);
}

export function objectToArrayNotation(value: Record<string, string | number>, bps = breakpoints) {
  const result = bps.map((br) => value[br] ?? null);

  while (result[result.length - 1] === null) result.pop();
  return result;
}

export function arrayToObjectNotation(values: Array<string | number | null>, bps = breakpoints) {
  const result: Record<string, string | number> = {};
  values.forEach((value, idx) => {
    const key = bps[idx];
    if (value != null) result[key] = value;
  });

  return result;
}

export function isResponsiveObjectLike(value: Record<string, string | number>, bps = breakpoints) {
  const keys = Object.keys(value);
  return keys.length > 0 && keys.every((item) => bps.includes(item));
}
