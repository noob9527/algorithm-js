import InternalPage from './InternalPage';
import InternalEntry from './InternalEntry';
import Page from './Page';
import Comparable from '../../../share/Comparable';
import Utils from '../../../share/utils';

class InternalPageImpl<K extends Comparable<K>> implements InternalPage<K> {
    private keyList: K[];
    private pageList: Array<Page<K>>;
    private minimalPage: Page<K>;

    constructor(keyList: K[], pageList: Array<Page<K>>, minimalPage: Page<K>) {
        this.keyList = keyList;
        this.pageList = pageList;
        this.minimalPage = minimalPage;
    }

    getPageList(): Array<Page<K>> {
        return [this.minimalPage, ...this.pageList];
    }

    add(entry: InternalEntry<K>) {
        let pos = Utils.findPosition(this.keyList, entry.key);
        this.keyList.splice(++pos, 0, entry.key);
        this.pageList.splice(pos, 0, entry.value);
    }

    search(key: K): Page<K> {
        const pos = Utils.findPosition(this.keyList, key);
        return ~pos ? this.pageList[pos] : this.minimalPage;
    }

    getMinimalKey(): K {
        if (!this.keyList.length) return null;
        return this.keyList[0];
    }

    size(): number {
        return this.keyList.length + 1; // add minimalPage
    }

    isOverflow(branchingFactor: number): boolean {
        return this.keyList.length >= (branchingFactor << 1) - 1;
    }

    split(): InternalEntry<K> {
        const keyList = Utils.split(this.keyList);
        const pageList = Utils.split(this.pageList);

        const [midKey, ...newKeyList] = keyList;
        const [midPage, ...newPageList] = pageList;

        return new InternalEntry(
            midKey,
            new InternalPageImpl(
                newKeyList,
                newPageList,
                midPage,
            ),
        );
    }

    getKeyList(): K[] {
        return this.keyList;
    }

    getMinimalPage(): Page<K> {
        return this.minimalPage;
    }

    toString(): string {
        return this.getKeyList()
            .map(e => e + '')
            .join();
    }

}

export default InternalPageImpl;
