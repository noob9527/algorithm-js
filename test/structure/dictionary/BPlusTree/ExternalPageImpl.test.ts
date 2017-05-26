import * as assert from 'assert';

import Dictionary from '../../../../src/structure/dictionary/Dictionary';
import ExternalPage from '../../../../src/structure/dictionary/BPlusTree/ExternalPage';
import ExternalPageImpl from '../../../../src/structure/dictionary/BPlusTree/ExternalPageImpl';

declare global {
    interface Number {
        compareTo(target: number): number;
    }
}
Number.prototype.compareTo = function(target) {
    return this - target;
};

describe('ExternalPageImpl', () => {

    let externalPage: ExternalPage<number, number>;

    beforeEach(() => {
        externalPage = new ExternalPageImpl<number, number>();
    });

    it('put, get', () => {
        externalPage
            .put(0, 0)
            .put(1, 1)
            .put(1, 2);
        assert.equal(externalPage.get(0), 0);
        assert.equal(externalPage.get(1), 2);
    });

    it('get not exist element should throw Error', () => {
        assert.throws(() => externalPage.get(1), /no such element/);
    });

    it('getKeyList', () => {
        assert.equal(externalPage.getKeyList().length, 0);
        externalPage
            .put(0, 0)
            .put(1, 1)
            .put(1, 2);
        assert.deepEqual(externalPage.getKeyList(), [0, 1]);
    });

    it('split', () => {
        externalPage
            .put(1, 1)
            .put(2, 2)
            .put(3, 3);
        const internalEntry = externalPage.split();
        const { key, value: nextPage } = internalEntry;
        assert(key === nextPage.getMinimalKey());
        assert.equal(externalPage.getNextPage(), nextPage);
        assert.deepEqual(externalPage.getKeyList(), [1]);
        assert.deepEqual(nextPage.getKeyList(), [2, 3]);
    });

    it('size', () => {
        assert.equal(externalPage.size(), 0);
        assert.equal(externalPage.put(0, 0).size(), 1);
    });

    it('getMinimalKey', () => {
        assert(externalPage.getMinimalKey() === null);
        externalPage
            .put(0, 0)
            .put(1, 1);
        assert(externalPage.getMinimalKey() === 0);
    });

    it('isOverflow', () => {
        externalPage
            .put(0, 0)
            .put(1, 1);
        assert(!externalPage.isOverflow(2));
        externalPage.put(2, 2);
        assert(externalPage.isOverflow(2));
    });

    it('toString', () => {
        assert(externalPage.toString() === '');
        externalPage
            .put(0, 0)
            .put(1, 1)
            .put(1, 2);

        assert(externalPage.toString() === '0,1');
    });
});
