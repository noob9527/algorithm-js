import Comparable from './Comparable';

export default {
    equals,
    lessThan,
    findPosition,
    split,
    defaultComparator,
};

function lessThan<T>(left: Comparable<T>, right: T) {
    return left.compareTo(right) < 0;
}

function equals<T>(left: Comparable<T>, right: T) {
    return !left.compareTo(right);
}

function findPosition<T extends Comparable<T>>(list: T[], target: T) {
    const pos = list.findIndex(x => lessThan(target, x));
    return ~pos ? pos - 1 : list.length - 1;
}

function split<T>(src: T[]): T[] {
    return src.splice(src.length >> 1);
}

function defaultComparator<T>(a: T, b: T): number {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}

