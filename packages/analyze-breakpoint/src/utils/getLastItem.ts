export function getLastItem<Value>(array: Value[]): Value | undefined {
  const length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}
