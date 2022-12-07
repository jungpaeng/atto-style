import { hash } from './hash';

describe('hash', function () {
  it('should be hashing', function () {
    expect(hash('something')).toBe('1why1xx');
  });
});
