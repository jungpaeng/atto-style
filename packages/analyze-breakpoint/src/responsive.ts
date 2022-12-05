import { isObject } from './utils/isObject';

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
