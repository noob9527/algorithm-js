import utils from '../../share/utils';

function mergeSort<T>(array: T[], comparator: (a: T, b: T) => number = utils.defaultComparator) {
    if (array.length < 2) return array;

    const mid = array.length >> 1;

    // divide
    const left = mergeSort(array.slice(0, mid));
    const right = mergeSort(array.slice(mid));

    const result = Array.from({ length: array.length });

    // merge
    let leftPtr = 0;
    let rightPtr = 0;
    for (let i = 0; i < result.length; i++) {
        if (leftPtr >= left.length) result[i] = right[rightPtr++];
        else if (rightPtr >= right.length) result[i] = left[leftPtr++];
        else if (left[leftPtr] < right[rightPtr]) result[i] = left[leftPtr++];
        else result[i] = right[rightPtr++];
    }

    return result;
}

export default mergeSort;
