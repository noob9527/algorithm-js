import * as assert from 'assert';
import { quickSort } from '../../../src';

describe('sort', () => {
    it('quickSort', () => {
        assert.deepEqual(quickSort([3, 1, 2]), [1, 2, 3]);
    });
});
