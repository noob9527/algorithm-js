import * as assert from 'assert';
import { mergeSort } from '../../../src';

describe('sort', () => {
    it('mergeSort1', () => {
        assert.deepEqual(mergeSort([3, 1, 2]), [1, 2, 3]);
    });

    it('mergeSort2', () => {
        assert.deepEqual(mergeSort([3, 1, 4, 2]), [1, 2, 3, 4]);
    });
});
