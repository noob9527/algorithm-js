import * as assert from 'assert';
import * as exception from '../../exception';
import Page from './Page';
import ExternalPage from './ExternalPage';
import InternalPage from './InternalPage';
import InternalEntry from './InternalEntry';
import ExternalPageImpl from './ExternalPageImpl';
import InternalPageImpl from './InternalPageImpl';
import Comparable from '../../../share/Comparable';
import Dictionary from '../Dictionary';

class BPlusTree<K extends Comparable<K>, V> implements Dictionary<K, V> {
    private root: Page<K>;
    private branchingFactor: number;
    private height: number = 1;

    constructor(branchingFactor: number = 2, externalPage?: ExternalPage<K, V>) {
        this.branchingFactor = branchingFactor;
        this.root = externalPage || new ExternalPageImpl<K, V>();
    }

    put(key: K, value: V): Dictionary<K, V> {
        if (key == null) throw new Error('invalid key');

        this.putElement(this.root, key, value);

        if (this.root.isOverflow(this.branchingFactor)) {
            this.height++;
            const entry = this.root.split();
            this.root = new InternalPageImpl(
                [entry.key],
                [entry.value],
                this.root,
            );
        }

        return this;
    }

    private putElement(page: Page<K>, key: K, value: V) {
        if (this.isExternalPage(page)) {
            page.put(key, value);
            return;
        }
        if (!this.isInternalPage(page)) throw new Error();
        const nextPage: Page<K> = page.search(key);
        this.putElement(nextPage, key, value);
        if (nextPage.isOverflow(this.branchingFactor)) {
            page.add(nextPage.split());
        }
    }

    get(key: K): V {
        let page: Page<K> = this.root;
        while (this.isInternalPage(page)) {
            page = page.search(key);
        }
        if (!this.isExternalPage(page)) throw new Error();
        return page.get(key);
    }

    contains(key: K): boolean {
        try {
            this.get(key);
        } catch (e) {
            return false;
        }
        return true;
    }

    size(): number {
        let page = this.getStartPage();
        let count = 0;
        while (page != null) {
            count += page.size();
            page = page.getNextPage();
        }
        return count;
    }

    getHeight(): number {
        return this.height;
    }

    toString(): string {

        let result = '';
        const queue: Array<Page<K>> = [this.root];

        let toBePrinted = 1;
        let nextLevel = 0;

        while (queue.length) {
            const page = queue.shift();

            toBePrinted--;
            result += page.toString();
            if (toBePrinted) result += '|';

            if (this.isInternalPage(page)) {
                page.getPageList()
                    .forEach(e => {
                        queue.push(e);
                        nextLevel++;
                    });
            }

            if (!toBePrinted) {
                result += '\n';
                toBePrinted = nextLevel;
                nextLevel = 0;
            }
        }

        return result.slice(0, -1);
    }

    private getStartPage(): ExternalPage<K, V> {
        if (this.isExternalPage(this.root)) {
            return this.root;
        }

        let page = this.root;
        while (this.isInternalPage(page)) {
            page = page.getMinimalPage();
        }

        if (!this.isExternalPage(page)) throw new Error();
        return page;
    }

    private isExternalPage(obj: any): obj is ExternalPage<K, V> {
        return 'getNextPage' in obj;
    }
    private isInternalPage(obj: any): obj is InternalPage<K> {
        return 'getPageList' in obj;
    }
}

export default BPlusTree;
