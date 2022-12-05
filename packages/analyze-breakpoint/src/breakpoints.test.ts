import { toMediaQueryString } from './breakpoints';

describe('toMediaQueryString', function () {
  it('should be generate media query string', function () {
    expect(toMediaQueryString('360')).toBe('@media screen and (min-width: 360px)');
    expect(toMediaQueryString('360', '720')).toBe('@media screen and (min-width: 360px) and (max-width: 720px)');
  });
});
