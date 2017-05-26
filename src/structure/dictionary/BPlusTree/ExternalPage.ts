import Page from './Page';
import Comparable from '../../../share/Comparable';

interface ExternalPage<K extends Comparable<K>, V> extends Page<K> {
    get(key: K): V;
    put(key: K, value: V): ExternalPage<K, V>;
    getNextPage(): ExternalPage<K, V>;
}

export default ExternalPage;
