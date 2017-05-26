import Comparable from '../../../share/Comparable';
import Page from './Page';

class InternalEntry<K extends Comparable<K>> implements Comparable<InternalEntry<K>> {
    key: K;
    value: Page<K>;

    constructor(key: K, value: Page<K>) {
        this.key = key;
        this.value = value;
    }

    compareTo(dest: InternalEntry<K>): number {
        return this.key.compareTo(dest.key);
    }
}

export default InternalEntry;
