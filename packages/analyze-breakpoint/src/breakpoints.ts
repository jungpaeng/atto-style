import { arrayToObjectNotation, objectToArrayNotation } from './responsive';

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

function sortByBreakpointValue(prev: string[], next: string[]) {
  return Number.parseInt(prev[1], 10) > Number.parseInt(next[1], 10) ? 1 : -1;
}

function sortBps(breakpoints: Record<string, string>) {
  return Object.fromEntries(Object.entries(breakpoints).sort(sortByBreakpointValue));
}

/**
 * @description breakpoints를 노멀라이징합니다.
 *
 * ```ts
 * normalize({ base: '360px', md: '720px' });
 * ```
 * ```json
 * [
 *   "0": "360px",
 *   "1": "720px",
 *   "base": "360px",
 *   "md": "720px"
 * ]
 * ```
 */
function normalize(breakpoints: Record<string, string>) {
  const sorted = sortBps(breakpoints);
  return Object.assign(Object.values(sorted), sorted);
}

/**
 * @description breakpoints의 key를 Set 형태로 반환합니다.
 *
 * ```ts
 * breakpointKeys({ base: '360px', md: '720px' });
 * ```
 * ```json
 * Set (2) {"base", "md"}
 * ```
 */
function breakpointKeys(breakpoints: Record<string, string>) {
  const value = Object.keys(sortBps(breakpoints));
  return new Set(value);
}

function subtract(value: string) {
  if (!value) return value;
  value = px(value) ?? value;

  const factor = value.endsWith('px') ? -1 : -(1 / 16);
  return value.replace(/(\d+\.?\d*)/u, (m) => `${parseFloat(m) + factor}`);
}

export function analyzeBreakpoints(breakpoints: Record<string, string>) {
  if (!breakpoints) return null;
  breakpoints.base = breakpoints.base ?? '0px';

  const keys = breakpointKeys(breakpoints);
  const keysArr = Array.from(keys.values());
  const normalized = normalize(breakpoints);

  const queries = Object.entries(breakpoints)
    .sort(sortByBreakpointValue)
    .map(([breakpoint, minW], index, entry) => {
      const [, _maxW] = entry[index + 1] ?? [];
      const maxW = parseFloat(_maxW) > 0 ? subtract(_maxW) : undefined;

      return {
        _minW: subtract(minW),
        breakpoint,
        minW,
        maxW,
        maxWQuery: toMediaQueryString(null, maxW),
        minWQuery: toMediaQueryString(minW),
        minMaxQuery: toMediaQueryString(minW, maxW),
      };
    });

  return {
    keys,
    normalized,
    asObject: sortBps(breakpoints),
    asArray: Array.from(normalized),
    details: queries,
    media: [null, ...normalized.map((minW) => toMediaQueryString(minW)).slice(1)],
    isResponsive(test: Record<string, string | number | null>) {
      const responsiveKeys = Object.keys(test);
      return responsiveKeys.length > 0 && responsiveKeys.every((item) => keys.has(item));
    },
    toArrayValue(test: Record<string, string | number>) {
      return objectToArrayNotation(test, keysArr);
    },
    toObjectValue(test: Array<string | number | null>) {
      return arrayToObjectNotation(test, keysArr);
    },
  };
}

export type AnalyzeBreakpointsReturn = ReturnType<typeof analyzeBreakpoints>;
