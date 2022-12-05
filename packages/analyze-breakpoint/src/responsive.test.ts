import { arrayToObjectNotation, mapResponsive, objectToArrayNotation } from './responsive';

describe('mapResponsive', function () {
  const mapper = (val: number) => `grid-template-columns(${val}fr, 1fr)`;

  it('should be convert to mapper', function () {
    expect(mapResponsive(2, mapper)).toStrictEqual(`grid-template-columns(2fr, 1fr)`);
  });
  it('should be convert to mapper by array', function () {
    expect(mapResponsive([2, 3], mapper)).toStrictEqual([
      `grid-template-columns(2fr, 1fr)`,
      `grid-template-columns(3fr, 1fr)`,
    ]);
  });
  it('should be convert to mapper by object', function () {
    expect(mapResponsive({ sm: 2, md: 3 }, mapper)).toStrictEqual({
      sm: `grid-template-columns(2fr, 1fr)`,
      md: `grid-template-columns(3fr, 1fr)`,
    });
  });
});

describe('objectToArrayNotation', function () {
  it('should be convert object to array notation', function () {
    expect(objectToArrayNotation({})).toStrictEqual([]);
    expect(objectToArrayNotation({ base: 100 })).toStrictEqual([100]);
    expect(objectToArrayNotation({ base: 100, sm: 200 })).toStrictEqual([100, 200]);
    expect(objectToArrayNotation({ base: 100, md: 400 })).toStrictEqual([100, null, 400]);
    expect(objectToArrayNotation({ base: 100, md: 400, xl: 1700 })).toStrictEqual([100, null, 400, null, 1700]);
    expect(objectToArrayNotation({ sm: 100 })).toStrictEqual([null, 100]);
    expect(objectToArrayNotation({ md: 100 })).toStrictEqual([null, null, 100]);
  });
});

describe('arrayToObjectNotation', function () {
  it('should be convert array to object notation', function () {
    expect(arrayToObjectNotation([])).toStrictEqual({});
    expect(arrayToObjectNotation([100])).toStrictEqual({ base: 100 });
    expect(arrayToObjectNotation([100, 200])).toStrictEqual({ base: 100, sm: 200 });
    expect(arrayToObjectNotation([100, null, 400])).toStrictEqual({ base: 100, md: 400 });
    expect(arrayToObjectNotation([100, null, 400, null, 1700])).toStrictEqual({ base: 100, md: 400, xl: 1700 });
    expect(arrayToObjectNotation([null, 100])).toStrictEqual({ sm: 100 });
    expect(arrayToObjectNotation([null, null, 100])).toStrictEqual({ md: 100 });
  });
});
