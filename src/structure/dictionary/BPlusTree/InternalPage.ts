import Page from './Page';
import InternalEntry from './InternalEntry';
import Comparable from '../../../share/Comparable';

interface InternalPage<K extends Comparable<K>> extends Page<K> {
    getPageList(): Array<Page<K>>;
    add(entry: InternalEntry<K>);
    search(key: K): Page<K>;
    getMinimalPage(): Page<K>;
}

export default InternalPage;
