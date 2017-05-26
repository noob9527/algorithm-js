import ExternalPage from './ExternalPage';
import InternalEntry from './InternalEntry';
import Comparable from '../../../share/Comparable';
import Utils from '../../../share/utils';

class ExternalPageImpl<K extends Comparable<K>, V> implements ExternalPage<K, V> {
    private entryList: Array<Entry<K, V>>;
    private nextPage: ExternalPage<K, V>;

    constructor(entryList: Array<Entry<K, V>> = []) {
        this.entryList = entryList;
    }

    get(key: K): V {
        const entry = this.entryList
            .find(e => Utils.equals(e.key, key));
        if (!entry)
            throw new Error('no such element');
        return entry.value;
    }

    put(key: K, value: V) {
        const entry = new Entry(key, value);
        let pos = Utils.findPosition(this.entryList, entry);
        if (~pos && Utils.equals(this.entryList[pos], entry)) {
            this.entryList[pos] = entry;
            return this;
        }
        this.entryList.splice(++pos, 0, entry);
        return this;
    }

    split(): InternalEntry<K> {
        this.nextPage =
            new ExternalPageImpl(Utils.split(this.entryList));
        return new InternalEntry(this.nextPage.getMinimalKey(), this.nextPage);
    }

    getNextPage(): ExternalPage<K, V> {
        return this.nextPage;
    }

    getMinimalKey(): K {
        if (!this.entryList.length) return null;
        return this.entryList[0].key;
    }

    size(): number {
        return this.entryList.length;
    }

    isOverflow(branchingFactor: number): boolean {
        return this.size() >= (branchingFactor << 1) - 1;
    }

    getKeyList(): K[] {
        return this.entryList.map(e => e.key);
    }

    toString(): string {
        return this.getKeyList()
            .map(e => e.toString())
            .join();
    }

}

class Entry<K extends Comparable<K>, V> implements Comparable<Entry<K, V>> {
    key: K;
    value: V;
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    compareTo(dest: Entry<K, V>): number {
        return this.key.compareTo(dest.key);
    }
}

export default ExternalPageImpl;
