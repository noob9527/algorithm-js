import Comparable from '../../share/Comparable';

interface Dictionary<K extends Comparable<K>, V> {
    put(key: K, value: V): Dictionary<K, V>;
    get(key: K): V;
    contains(key: K): boolean;
    size(): number;
}

export default Dictionary;
