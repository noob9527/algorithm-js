// import * as assert from 'assert';
import * as assert from 'assert';
import Utils from '../../src/share/utils';
import Comparable from '../../src/share/Comparable';

declare global {
    interface Number extends Comparable<number> {
        compareTo(target: number): number;
    }
}

Number.prototype.compareTo = function(target) {
    return this - target;
};

describe('Utils', () => {
    it('lessThan', () => {
        assert(Utils.lessThan(0, 1));
        assert(Utils.lessThan(0, 0) === false);
    });
    it('equals', () => {
        assert(Utils.equals(0, 0));
        assert(!Utils.equals(0, 1));
    });
    it('findPosition', () => {
        const arr = [1, 3];
        assert(Utils.findPosition(arr, 0) === -1);
        assert(Utils.findPosition(arr, 1) === 0);
        assert(Utils.findPosition(arr, 2) === 0);
        assert(Utils.findPosition(arr, 3) === 1);
        assert(Utils.findPosition(arr, 4) === 1);
    });
    it('defaultComparator', () => {
        assert(Utils.defaultComparator(1, 1) === 0);
        assert(Utils.defaultComparator(1, 2) < 0);
        assert(Utils.defaultComparator(2, 1) > 0);
    });

    describe('split', () => {
        it('split even array', () => {
            const src = [1, 2, 3, 4];
            const target = Utils.split(src);
            assert(src.length === 2);
            assert.deepEqual(src, [1, 2]);
            assert(target.length === 2);
            assert.deepEqual(target, [3, 4]);
        });
        it('split odd array', () => {
            const src = [1, 2, 3];
            const target = Utils.split(src);
            assert(src.length === 1);
            assert.deepEqual(src, [1]);
            assert(target.length === 2);
            assert.deepEqual(target, [2, 3]);
        });
    });

});
