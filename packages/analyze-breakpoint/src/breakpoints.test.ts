import { analyzeBreakpoints, toMediaQueryString } from './breakpoints';

describe('toMediaQueryString', function () {
  it('should be generate media query string', function () {
    expect(toMediaQueryString('360')).toBe('@media screen and (min-width: 360px)');
    expect(toMediaQueryString('360', '720')).toBe('@media screen and (min-width: 360px) and (max-width: 720px)');
  });
});

describe('analyzeBreakpoints', function () {
  it('should be work', function () {
    const breakpoints = analyzeBreakpoints({ sm: '320px', md: '640px', lg: '1000px', xl: '4000px' });

    expect(breakpoints?.isResponsive({ base: 0, sm: '123px' })).toBeTruthy();
    expect(breakpoints?.isResponsive({ base: 0, sm: '123px', '2xl': '8000px' })).toBeFalsy();

    expect(breakpoints?.toArrayValue({ base: 0, sm: '123px' })).toStrictEqual([0, '123px']);
    expect(breakpoints?.toObjectValue([0, '123px'])).toStrictEqual({ base: 0, sm: '123px' });

    expect(breakpoints?.details).toMatchInlineSnapshot(`
      [
        {
          "_minW": "-1px",
          "breakpoint": "base",
          "maxW": "319px",
          "maxWQuery": "@media screen and (max-width: 319px)",
          "minMaxQuery": "@media screen and (min-width: 0px) and (max-width: 319px)",
          "minW": "0px",
          "minWQuery": "@media screen and (min-width: 0px)",
        },
        {
          "_minW": "319px",
          "breakpoint": "sm",
          "maxW": "639px",
          "maxWQuery": "@media screen and (max-width: 639px)",
          "minMaxQuery": "@media screen and (min-width: 320px) and (max-width: 639px)",
          "minW": "320px",
          "minWQuery": "@media screen and (min-width: 320px)",
        },
        {
          "_minW": "639px",
          "breakpoint": "md",
          "maxW": "999px",
          "maxWQuery": "@media screen and (max-width: 999px)",
          "minMaxQuery": "@media screen and (min-width: 640px) and (max-width: 999px)",
          "minW": "640px",
          "minWQuery": "@media screen and (min-width: 640px)",
        },
        {
          "_minW": "999px",
          "breakpoint": "lg",
          "maxW": "3999px",
          "maxWQuery": "@media screen and (max-width: 3999px)",
          "minMaxQuery": "@media screen and (min-width: 1000px) and (max-width: 3999px)",
          "minW": "1000px",
          "minWQuery": "@media screen and (min-width: 1000px)",
        },
        {
          "_minW": "3999px",
          "breakpoint": "xl",
          "maxW": undefined,
          "maxWQuery": "@media screen",
          "minMaxQuery": "@media screen and (min-width: 4000px)",
          "minW": "4000px",
          "minWQuery": "@media screen and (min-width: 4000px)",
        },
      ]
    `);
  });
});
