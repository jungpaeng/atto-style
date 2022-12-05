import { getLastItem } from './getLastItem';

describe('getLastItem', () => {
  it('should be get last item', () => {
    expect(getLastItem([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(8);
  });
});
