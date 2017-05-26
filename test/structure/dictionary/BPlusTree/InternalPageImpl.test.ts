import * as assert from 'assert';

import Dictionary from '../../../../src/structure/dictionary/Dictionary';
import InternalPage from '../../../../src/structure/dictionary/BPlusTree/InternalPage';
import InternalPageImpl from '../../../../src/structure/dictionary/BPlusTree/InternalPageImpl';

declare global {
    interface Number {
        compareTo(target: number): number;
    }
}
Number.prototype.compareTo = function(target) {
    return this - target;
};

describe('InternalPageImpl', () => {

    let InternalPage: InternalPage<number>;

    beforeEach(() => {
        InternalPage = new InternalPageImpl<number>([1], null, null);
    });

});
