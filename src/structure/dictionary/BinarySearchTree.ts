import * as exception from '../exception';
import Dictionary from './Dictionary';
import Comparable from '../../share/Comparable';

class BinarySearchTree<K extends Comparable<K>, V> implements Dictionary<K, V> {

    private root: BSTNode<K, V>;

    put(key: K, value: V): Dictionary<K, V> {
        let node = this.root;
        let prevNode: BSTNode<K, V>;
        let result;

        while (node != null) {
            result = node.key.compareTo(key);
            // if (!result) return node.value; // 查找命中
            if (!result) {
                node.value = value;
                return this;
            }
            prevNode = node;
            node = result > 0
                ? node.left
                : node.right;
        }

        const newNode = new BSTNode<K, V>(key, value);

        if (!prevNode) {
            this.root = newNode;
            return this;
        }

        if (result > 0)
            prevNode.left = newNode;
        else
            prevNode.right = newNode;

        return this;
    }

    get(key: K): V {
        let node = this.root;
        while (node != null) {
            const result = node.key.compareTo(key);
            if (!result) return node.value; // 查找命中
            node = result > 0
                ? node.left
                : node.right;
        }
        throw new exception.NoSuchElement();
    }

    contains(key: K): boolean {
        try {
            this.get(key);
        } catch (e) {
            if (e instanceof exception.NoSuchElement) return false;
            throw e;
        }
        return true;
    }

    size(): number {
        if (!this.root) return 0;
        return this.root.size();
    }

    toString() {
        if (!this.root) return '';

        let result = '';
        const queue: Array<BSTNode<K, V>> = [this.root];

        let toBePrinted = 1;
        let nextLevel = 0;

        while (queue.length) {
            const node = queue.shift();

            result += node.key.toString();
            toBePrinted--;

            if (node.left) {
                queue.push(node.left);
                nextLevel++;
            }
            if (node.right) {
                queue.push(node.right);
                nextLevel++;
            }

            if (!toBePrinted) {
                result += '\n';
                toBePrinted = nextLevel;
                nextLevel = 0;
            }
        }

        return result.slice(0, -1);
    }

    clear() {
        this.root = null;
    }

}

class BSTNode<K extends Comparable<K>, V> {

    key: K;
    value: V;
    left: BSTNode<K, V>;
    right: BSTNode<K, V>;

    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    size(): number {
        let left: number;
        let right: number;
        left = this.left ? this.left.size() : 0;
        right = this.right ? this.right.size() : 0;
        return 1 + left + right;
    }

}

export default BinarySearchTree;
