import utils from '../../share/utils';

function quickSort<T>(array: T[], comparator: (a: T, b: T) => number = utils.defaultComparator) {
    if (!array.length) return [];
    const [pivot, ...rest] = array;
    return [
        ...quickSort(rest.filter(e => comparator(e, pivot) <= 0, comparator)),
        pivot,
        ...quickSort(rest.filter(e => comparator(e, pivot) > 0, comparator)),
    ];
}

export default quickSort;
