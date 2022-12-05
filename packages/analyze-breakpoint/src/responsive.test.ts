import { mapResponsive } from './responsive';

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
