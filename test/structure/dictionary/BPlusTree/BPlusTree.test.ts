import * as assert from 'assert';
import { BPlusTree } from '../../../../src';

declare global {
    interface Number {
        compareTo(target: number): number;
    }
}
Number.prototype.compareTo = function(target) {
    return this - target;
};

describe('BPlusTree', () => {
    let tree: BPlusTree<number, number>;

    beforeEach(() => {
        tree = new BPlusTree<number, number>();
    });

    describe('put,get', () => {
        it('put,get', () => {
            tree.put(0, 0)
                .put(1, 1)
                .put(1, 2);
            assert.equal(tree.get(0), 0);
            assert.equal(tree.get(1), 2);
        });

        it('put empty key should throw Error', () => {
            assert.throws(() => tree.put(null, 1), /invalid key/);
            assert.throws(() => tree.put(undefined, 1), /invalid key/);
        });

        it('put empty value should success', () => {
            tree.put(0, null);
            assert.equal(tree.get(0), null);
        });

        it('get not exist element should throw Error', () => {
            assert.throws(() => tree.get(0), /no such element/);
        });
    });

    it('size', () => {
        assert(tree.size() === 0);
        tree.put(0, 0)
            .put(1, 1)
            .put(2, 2);
        assert(tree.size() === 3);
    });

    it('contains', () => {
        assert(!tree.contains(0));
        tree.put(0, 0);
        assert(tree.contains(0));
    });

    it('toString', () => {
        assert(tree.toString() === '');

        [1, 2].forEach(e => tree.put(e, e));
        assert(tree.toString().split('\n').length === 1);

        tree = new BPlusTree<number, number>();
        [1, 2, 3].forEach(e => tree.put(e, e));
        const arr = tree.toString().split('\n');
        assert(arr.length === 2);
        assert(arr[0] === '2');
        assert(arr[1] === '1|2,3');
    });

    it.skip('log tree', () => {
        Array.from({ length: 10 })
            .forEach((e, i) => {
                tree.put(i, i);
            });

        [100, 1000, 5000].forEach(n => {
            [2, 4, 6].forEach(branchingFactor => {
                tree = new BPlusTree<number, number>(branchingFactor);
                // const x = (branchingFactor<<1) - 1;
                Array.from({ length: n })
                    .forEach((e, i) => tree.put(i, i));
            });
        });
    });

});
