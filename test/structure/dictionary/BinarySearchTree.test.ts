import * as assert from 'assert';

import Dictionary from '../../../src/structure/dictionary/Dictionary';
import BinarySearchTree from '../../../src/structure/dictionary/BinarySearchTree';

declare global {
    interface Number {
        compareTo(target: number): number;
    }
}

describe('BinarySearchTree', () => {
    let tree: BinarySearchTree<number, number>;

    before(() => {
        Number.prototype.compareTo = function(target) {
            return this - target;
        };
    });

    beforeEach(() => {
        tree = new BinarySearchTree<number, number>();
    });

    it('should put,get value', () => {
        tree.put(0, 0)
            .put(1, 1)
            .put(1, 2);
        assert.equal(tree.get(0), 0);
        assert.equal(tree.get(1), 2);
    });

    it('get not exist element should throw Error', () => {
        assert.throws(() => tree.get(0));
    });

    it('size', () => {
        assert(tree.size() === 0);
        tree.put(0, 0)
            .put(1, 1)
            .put(1, 2);
        assert(tree.size() === 2);
    });

    it('contains', () => {
        assert(!tree.contains(0));
        tree.put(0, 0);
        assert(tree.contains(0));
    });

    it('toString', () => {
        assert(tree.toString() === '');

        [1, 2, 3].forEach(e => tree.put(e, e));
        assert(tree.toString().split('\n').length === 3);
        tree.clear();

        [2, 1, 3].forEach(e => tree.put(e, e));
        assert(tree.toString().split('\n').length === 2);
    });
});
