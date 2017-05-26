# BPlusTree

### Usage
```javascript
import { BPlusTree } from 'algorithms-ts';

//default brancingFactor = 2
const tree = new BPlusTree<number, number>();

Array.from({ length: 10 })
    .forEach((e, i) => {
        tree.put(i, i);
    });

console.log(tree.get(9));
// 9

console.log(tree.contains(10));
// false

console.log(tree.getHeight());
// 4

console.log(tree.toString());
// 4
// 2|6
// 1|3|5|7,8
// 0|1|2|3|4|5|6|7|8,9
```

### 已实现
- 查找
- 插入

### 懒得实现
- 删除
- 范围查找
- 在split节点前检查sibling node是否有多余空间
- 在节点内使用二分查找检索key值
