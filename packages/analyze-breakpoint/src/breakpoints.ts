function analyzeCSSValue(value: number | string) {
  const num = Number.parseFloat(value.toString());
  const unit = value.toString().replace(num.toString(), '');

  return { value: num, unit };
}

export function px(value: number | string | null): string | null {
  if (value == null) return value;

  const { unit } = analyzeCSSValue(value);
  return !unit || typeof value === 'number' ? `${value}px` : value;
}

export function toMediaQueryString(min: string | null, max?: string) {
  const query = ['@media screen'];

  if (min) query.push('and', `(min-width: ${px(min)})`);
  if (max) query.push('and', `(max-width: ${px(max)})`);

  return query.join(' ');
}
