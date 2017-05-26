import Comparable from '../../../share/Comparable';
import InternalEntry from './InternalEntry';

interface Page<K extends Comparable<K>> {
    getMinimalKey(): K;
    size(): number;
    isOverflow(branchingFactor: number): boolean;
    split(): InternalEntry<K>;
    getKeyList(): K[];
}

export default Page;
