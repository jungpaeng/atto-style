import { isObject } from './isObject';

test('is object', function () {
  expect(isObject([])).toBeFalsy();
  expect(isObject({})).toBeTruthy();
});
